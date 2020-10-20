import React from "react";
import classname from "classnames"
import "components/DayListItem.scss" 

export default function DayListItem(props) {

  const dayClass = classname(
    "day-list__item", 
    {"day-list__item--selected" : props.selected},
    { "day-list__item--full": props.spots === 0 }
  )

  const formatSpots = function(spot) {
    if (spot === 0) {
      // spotsLeft = "day-list__item--full"
      return "no spots remaining"
    }

    if (spot === 1) {
      return "1 spot remaining"
    }
  
    if (spot > 1) {
      // spotsLeft =  "day-list__item--selected"  
      return `${spot} spots remaining`
    }
  }

  let result = formatSpots(props.spots)

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{result}</h3>
    </li>
  );
}