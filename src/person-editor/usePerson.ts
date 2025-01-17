import { useState, useEffect, useCallback, useDebugValue, SetStateAction, useReducer } from 'react';
import localforage from 'localforage';
import { sleep } from '../utils';

import type { Person } from '../types/person';
import { useIsMounted } from '../hooks/useIsMounted';
import { useDebounce } from '../hooks/useDebounce';
import { useWillUnmount } from '../hooks/useWillUnmount';
import { useThrottle } from '../hooks/useThrottle';
import { personEditorReducer } from './personEditorReducer';


function savePerson(person: Person | null): void {
  console.log(`Saving person: ${JSON.stringify(person)}`);
  localforage.setItem('person', person);
}

interface Metadata { isDirty: boolean, isValid: boolean }

export function usePerson(initialPerson: Person) {
  console.log(`exec usePerson()`);
  // const [person, setPerson] = useState<Person | null>(null);
  // const [metadata, setMetadata] = useState<Metadata>({ isDirty: false, isValid: true });
  const [{ person, metadata }, dispatch] = useReducer(personEditorReducer, {
    person: null,
    metadata: { isDirty: false, isValid: true }
  });
  const isMounted = useIsMounted();

  useDebugValue(person, p => `${p?.firstname} - ${p?.surname}`);

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person");
      // console.log('sleeping');
      // await sleep(3000);
      // console.log('after sleeping');
      if (isMounted.current) {
        //setPerson(person ?? initialPerson);
        dispatch({
          type: 'set-intitial-person',
          payload: person ?? initialPerson
        });
      } else {
        console.log('not mounted');
      }
    };
    getPerson();
  }, [initialPerson, isMounted]);

  const [, setNow] = useState(new Date());
  useEffect(() => {
    const handle = setInterval(() => {
      const t = new Date();
      console.log(`=> usePerson state changed!`)
      setNow(t);
    }, 5000);

    return () => clearInterval(handle);
  }, []);

  const saveFn = useCallback(() => {
    console.log(`useCallback`);
    savePerson(person);
  }, [person]);

  useThrottle(saveFn, 1000);
  useWillUnmount(saveFn);

  function setPersonAndMeta(value: SetStateAction<Person | null>) {
    // setPerson(value);
    // setMetadata({ ...metadata, isDirty: true });
  }

  function setProperty(name: keyof Person, value: unknown) {
    dispatch({ type: 'set-property', payload: { name, value } })
  }

  function setProperties(payload: Partial<Person>) {
    dispatch({ type: 'set-properties', payload });
  }
  return [person, setProperty, setProperties, metadata] as const;
}