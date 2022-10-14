import { MutableRefObject, useRef, useLayoutEffect } from 'react';

export function useIsMounted():Readonly<MutableRefObject<boolean>>{
    console.log(`exec useIsMounted()`);
    const isMounted = useRef(false);

    useLayoutEffect(()=>{
        isMounted.current = true;

        return () => {
            console.log('==> to be unmount');
            isMounted.current = false;
        }
    },[]);

    return isMounted;
}