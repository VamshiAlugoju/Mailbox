import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, deley: number) {
    const [dvalue, setDvalue] = useState<T>(value)
    useEffect(() => {
        const id = setTimeout(() => {
            setDvalue(value)

        }, deley);
        return () => {
            clearTimeout(id)
        }
    }, [value])

    return dvalue;
}