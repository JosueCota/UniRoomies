import { useEffect, useState } from "react";

//Adds a delay for an input to create a debounced effect (avoids making an api call every time a state is updated)
//Returns the debounced state (use this state as the useEffect dependency state)
const useDebounce = (value, delay = 1000, setLoad) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        setLoad(true);
        const timeout = setTimeout(()=>{
            setDebouncedValue(value);
            setLoad(false);
        }, delay)
        
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedValue
};

export default useDebounce
