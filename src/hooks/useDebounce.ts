import { useEffect } from 'react';

export function useDebounce(fn: ()=>void, timeout: number):void {
    console.log(`exec useDebounce()`);
    useEffect(() => {
        const handle = setTimeout(fn, timeout);
        console.log(`useDebounce setTimeout ${timeout}, handle: ${handle}`)

        return () => {
            console.log(`useDebounce cleanup clearTimeout(handle)`, handle);
            clearTimeout(handle);
        }
    },[fn, timeout])
}