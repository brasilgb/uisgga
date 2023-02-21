import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface DataContext {
    setLoading: any;
    loading: boolean;
}

interface ContextProps {
    children: JSX.Element;
}

export const AuthContext = createContext<DataContext>({} as DataContext);

export const AuthProvider = ({ children }: ContextProps) => {

    const [ loading, setLoading ] = useState(false);

    return (

        <AuthContext.Provider value={{
            setLoading,
            loading
        }}>
            {children}
        </AuthContext.Provider>

    )
}