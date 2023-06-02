import React, { createContext, useEffect, useState } from "react";
import api from "../../Services/api";

interface AppContext {
  setLoading: any;
  loading: boolean;
  cicloActive: boolean;
  setCicloActive?: any;
  handleKeyPress?: any;
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

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      var form = e.target.form;
      var index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  return (
    <AppContext.Provider value={{
      cicloActive,
      setCicloActive,
      setLoading,
      loading,
      handleKeyPress
    }}>
      {children}
    </AppContext.Provider>
  )
}