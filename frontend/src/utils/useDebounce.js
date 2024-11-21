import { useEffect, useState } from "react";

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
