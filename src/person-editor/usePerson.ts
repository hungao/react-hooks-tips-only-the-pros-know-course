import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { sleep } from '../utils';

import type { Person } from '../types/person';
import { useIsMounted } from '../hooks/useIsMounted';
import { useDebounce } from '../hooks/useDebounce';
import { useWillUnmount } from '../hooks/useWillUnmount';

function savePerson(person: Person | null): void {
  console.log(`Saving person: ${JSON.stringify(person)}`);
  localforage.setItem('person', person);
}

export function usePerson(initialPerson: Person) {
  console.log(`exec usePerson()`);
  const [person, setPerson] = useState<Person | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person");
      // console.log('sleeping');
      // await sleep(3000);
      // console.log('after sleeping');
      if (isMounted.current) {
        setPerson(person ?? initialPerson);
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

  useDebounce(saveFn, 1000);
  useWillUnmount(saveFn);

  return [person, setPerson] as const;
}