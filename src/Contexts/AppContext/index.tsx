import React, { createContext, useEffect, useState } from "react";
import api from "../../Services/api";

interface AppContext {
    setLoading: any;
    loading: boolean;
    existsCiclo: any;
    setExistsCiclo: any;
};

interface ContextProps {
    children: JSX.Element;
};

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppProvider = ({ children }: ContextProps) => {

    const [loading, setLoading] = useState(false);
    const [existsCiclo, setExistsCiclo] = useState([]);
    useEffect(() => {
        const getExistsCiclo = (async () => {
            await api.get('ciclos')
                .then((response) => {
                    const exists = response.data.data.length;
                    setExistsCiclo(exists);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        getExistsCiclo();
    }, [])



    return (
        <AppContext.Provider value={{
            setExistsCiclo,
            existsCiclo,
            setLoading,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}