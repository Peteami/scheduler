function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appArr = [];
  let results = [];
  // console.log(state.days);
  for (let matchingDay of state.days) {
    if (matchingDay.name === day){
      appArr = matchingDay.appointments;
    }
  }
  for (let apparr of appArr) {
    state.appointments[apparr] && results.push(state.appointments[apparr])
  }
  return results;
}

function getInterview(state, interview) {
  let interviewData = {}
  if (interview) {
    interviewData.student = interview.student;
    for (let inview in state.interviewers) {
      if (state.appointments[inview].id === interview.interviewer) {
        interviewData.interviewer = state.interviewers[inview]
      }
    }
  } else {
    return null;
  }

  return interviewData;
}

function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  let appArr = [];
  let results = [];
  // console.log(state.days);
  for (let matchingDay of state.days) {
    if (matchingDay.name === day){
      appArr = matchingDay.interviewers;
    }
  }
  for (let apparr of appArr) {
    state.interviewers[apparr] && results.push(state.interviewers[apparr])
  }
  return results;
}


export {getAppointmentsForDay, getInterview, getInterviewersForDay}
