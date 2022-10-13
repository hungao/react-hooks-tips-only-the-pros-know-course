import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { sleep } from '../utils';

import type { Person } from '../types/person';
import { useIsMounted } from '../hooks/useIsMounted';

function savePerson(person:Person|null):void{
    console.log('Saving',person);
    localforage.setItem('person',person);
}

export function usePerson(initialPerson: Person){
    const [person, setPerson] = useState<Person | null>(null);
    const isMounted = useIsMounted();

    useEffect(()=>{
      const getPerson = async () => {
        const person = await localforage.getItem<Person>("person");
        // console.log('sleeping');
        // await sleep(3000);
        // console.log('after sleeping');
        if(isMounted.current){
            setPerson(person ?? initialPerson);
        }else{
            console.log('not mounted');
        }
      };
      getPerson();
    },[initialPerson]);
  
    useEffect(()=>{
      savePerson(person);
    },[person]);
    
    return [person, setPerson] as const;
}