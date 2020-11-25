import React, {useState, useEffect } from "react";
import axios from "axios"


export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
      // console.log(all)
    ]).then((all) => {
      // set your states here with the correct values...
      // console.log("all data", all[0].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      // console.log("interviewers", all[2].data)
    })
  }, []);



  // ------------------------ Update the spots that are remaining for the day ---------------------
  function spotsLeft(state) {
    const actual = {...state}
    const days = actual.days.map((day) => {
    const spots = day.appointments.reduce((spots, id) => {
     if (actual.appointments[id].interview === null) {
       spots = spots + 1
       }  
       return spots
      }, 0)
       return {...day, spots}
    }) 
    return days
  }




// ----------------------- Add an interview to the schedule -------------------------------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
      const put = axios.put(`/api/appointments/${id}`, appointment)
    return put
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments: {
            ...prev.appointments,
            [id]: appointment,
          },
        }))
        setState((prev) => ({
          ...prev,
          days: spotsLeft(prev),
        }))
      })
    
  }

// -------------------------- Remove an interview from the schedule --------------------------------
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const del = axios.delete(`/api/appointments/${id}`)
    return del
      // .then(() => {transition(SHOW)})
      .then(() => {setState((prev) => ({
        ...prev,
        appointments,
      }))

      setState((prev) => ({
        ...prev,
        days: spotsLeft(prev),
      }))
  })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}