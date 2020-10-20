import React, {useState, useEffect } from "react";
import DayList from "components/DayList"
import "components/Application.scss";
import Appointment from "components/Appointment"
import axios from "axios"

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {id: 3,
  time: "2pm",
  interview: {
    student: "Pierre Dinelle",
    interviewer: {
      id: 2,
      name: "Tory Malcom",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    }
  }
  },
  {id: 4,
    time: "3pm",
    interview: {
      student: "Me Again",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {id: 5,
    time: "4pm",
    interview: {
      student: "Another Me",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days})

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // })

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);

  // useEffect(() => {
  //   const url = `http://localhost:8001/api/days`;
  //   console.log("requesting days")
  //   axios.get(url)
  //     .then(response => {
  //       setDays([...response.data])
  //   });
  // }, [])

  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then(response => setDays(response.data));
  }, []);


const appoint = appointments.map(appointment => {
  return (
    <Appointment
      key={appointment.id}
      {...appointments}
      time={appointment.time}
      id={appointment.id}
      interview={appointment.interview}
    />
  );
});


// console.log(days);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="/images/logo.png"
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="/images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        
        {/* {appointments.map(appointment => (

                                             


                                                <Appointment 
                                                  key={appointment.id}
                                                  {...appointments}
                                                  time={appointment.time}
                                                  id={appointment.id}
                                                  interviewers= {appointment.interviewers}
                                                  
                                                />
                                          ))} */}

                                                
                                                  {appoint}
                                                

                                                <Appointment
                                                  key="last"
                                                  time="5pm"
                                                />
      </section>
    </main>
  );
}
