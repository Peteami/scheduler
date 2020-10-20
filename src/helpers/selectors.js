export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appArr = [];
  let results = [];
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