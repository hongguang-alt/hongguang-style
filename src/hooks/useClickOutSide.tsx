import { RefObject, useEffect } from 'react'

function useClickOutSide(ref:RefObject<HTMLElement>,callback:Function){
    useEffect(()=>{
        const myClick = (e:MouseEvent)=>{
            if(!ref.current || ref.current.contains(e.target as HTMLElement)){
                return
            }else{
                callback(e)
            }
        }

        document.addEventListener('click', myClick)
        return ()=>{
            document.removeEventListener('click',myClick)
        }
    },[ref,callback])
}

export default useClickOutSide