import { useContext } from 'react'
import { AppContextType, AppContext } from '../context/AppContext'

export const useAppContext = () : AppContextType => {
    const context = useContext(AppContext)

    if(!context){
        throw new Error('useAppContext should be used inside a provider')
    }
    return context;
}