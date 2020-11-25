import React from "react";
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  //---------------------- Saving Interview data ------------------------ 
  function save(name, interviewer) {
    // console.log("name", name)
    // console.log("interviewer",interviewer)
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true)
      })
  }

  //--------------------------- Deleting Interview data ----------------------- 
  function destroy() {
    transition(DELETING, true)
    const interview = null;
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) =>  { 
        transition(ERROR_DELETE, true)
  })
}


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} 
        />
        }
      
  {/* -----------------  Show saved interviews --------------------------- */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          // interviewer={props.interview.interviewer.name}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}

        />
      )}
{/* --------------- Create new interview ----------------------- */}
      {mode === CREATE && (
        <Form 
            interviewers = {props.interviewers}
            onCancel = {back}
            onSave={save}
            // name={name}
        />
      )}
   {/* ------------------ Saving component status --------------------------- */}
      {mode === SAVING && (
        <Status
          message = "SAVING"
        />
      )}
    {/* -------------------- Deleting component status ----------------------------- */}
      {mode === DELETING && (
        <Status
          message = "DELETING"
        />
      )}

        {/* --------------- Confirmation message and deleting and cancel action -------------- */}
      {mode === CONFIRM && (
        <Confirm 
          message = "Are you sure you would like to delete?"
          onConfirm = {destroy}
          onCancel = {back}
        />
      )}

    {/* ---------------------------- Edit interview and cancel action ---------------------------- */}
      {mode === EDIT && (
        <Form
          name = {props.interview.student}
          interviewers = {props.interviewers}
          // student = {props.interview.student}
          interviewer = {props.interview.interviewer.id}
          onCancel = {back}
          onSave={save}
        />
      )}

        {/* ------------------ Error message while attempting to save interview ---------------------------- */}
      {mode === ERROR_SAVE && (
        <Error
          message = "Error Could not save appointment!"
          onCancel = {back}
        />
      )}

    {/* -------------------- Error message while attempting to delete interview --------------------------------- */}
      {mode === ERROR_DELETE && (
        <Error 
          message = "Error Could not cancel appointment!"
          onCancel = {back}
        />
      )}

    </article>
      )
     
}