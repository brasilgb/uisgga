import React, { createContext, useEffect, useState } from "react";
import api from "../../Services/api";

interface AppContext {
    setLoading: any;
    loading: boolean;
    cicloActive: boolean;
};

interface ContextProps {
    children: JSX.Element;
};

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppProvider = ({ children }: ContextProps) => {

    const [loading, setLoading] = useState(false);
    const [cicloActive, setCicloActive] = useState<boolean>(false);

    useEffect(() => {
        const getCicloActive = (async () => {
          await api.get('ciclos')
            .then((response) => {
              const exists = response.data.data.filter((ex: any) => (ex.ativo === true));
              if (exists.length > 0) {
                setCicloActive(true);
              } else {
                setCicloActive(false);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
        getCicloActive();
      }, [])
    

    return (
        <AppContext.Provider value={{
            cicloActive,
            setLoading,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}