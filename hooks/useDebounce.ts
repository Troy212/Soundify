import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {


    const [debouncedVaue, setDebouncedValue] = useState<T>(value);


    useEffect (() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)

        }, delay || 500);

        return () => {
            clearTimeout(timer);

        }
    }, [value, delay]);


    return debouncedVaue;
};


export default useDebounce;


