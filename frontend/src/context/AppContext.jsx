import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);

  return (
    <AppContext.Provider
      value={{
        goals,
        setGoals,
        expenses,
        setExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
