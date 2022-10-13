import React, { ReactElement, useState, useEffect, useRef } from "react"

import { LabeledInput, Loading } from "../components"
import { initialPerson } from "../utils"
import { usePerson } from "./usePerson";

export function PersonEditor(): ReactElement {
  const [person, setPerson] = usePerson(initialPerson);
  const input = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    setTimeout(() => {
      input.current?.focus();
    }, 1000);
  },[]);

  if(!person){
    return <Loading />;
  }
  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`)
      }}
    >
      <h2>Person Editor</h2>
      <LabeledInput
        ref={input}
        label="Firstname:"
        value={person.firstname}
        onChange={(e) => {
          setPerson(state => ({...state!, firstname: e.target.value}));
        }}
      />
      <LabeledInput
        label="Surname:"
        value={person.surname}
        onChange={(e) => {
          setPerson(state => ({...state!, surname: e.target.value}));
        }}
      />
      <LabeledInput
        label="Email:"
        value={person.email}
        onChange={(e) => {
          setPerson(state => ({...state!, email: e.target.value}));
        }}
      />
      <LabeledInput
        label="Address:"
        value={person.address}
        onChange={(e) => {
          setPerson(state => ({...state!, address: e.target.value}));
        }}
      />
      <LabeledInput
        label="Phone:"
        value={person.phone}
        onChange={(e) => {
          setPerson(state => ({...state!, phone: e.target.value}));
        }}
      />
      <hr />
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <hr />
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </form>
  )
}
