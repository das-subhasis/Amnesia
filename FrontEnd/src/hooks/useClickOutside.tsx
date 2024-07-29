import { useEffect} from 'react'
import { useAuthContext } from '../context/authContext'


const useClickOutside = (handler: () => void) => {
    const { ref } = useAuthContext();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, handler])
    return ref
}

export default useClickOutside