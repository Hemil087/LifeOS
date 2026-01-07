import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../api/goals";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenses";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { token } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);

  useEffect(() => {
    if (!token) {
      setExpenses([]);
      return;
    }

    setLoadingExpenses(true);
    fetchExpenses(token)
      .then(setExpenses)
      .catch(console.error)
      .finally(() => setLoadingExpenses(false));
  }, [token]);

  const addExpense = async (data) => {
    const newExpense = await createExpense(token, data);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const editExpense = async (id, data) => {
    const updated = await updateExpense(token, id, data);
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? updated : e))
    );
  };

  const removeExpense = async (id) => {
    await deleteExpense(token, id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // 🔁 Load goals from backend
  useEffect(() => {
    if (!token) {
      setGoals([]);
      return;
    }

    setLoadingGoals(true);
    fetchGoals(token)
      .then(setGoals)
      .catch(console.error)
      .finally(() => setLoadingGoals(false));
  }, [token]);

  // ➕ Create goal
  const addGoal = async (goalData) => {
    const newGoal = await createGoal(token, goalData);
    setGoals((prev) => [...prev, newGoal]);
  };

  // ✏️ Update goal
  const editGoal = async (id, updates) => {
    const updated = await updateGoal(token, id, updates);
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? updated : g))
    );
  };

  // ❌ Delete goal
  const removeGoal = async (id) => {
    await deleteGoal(token, id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        goals,
        expenses,
        loadingGoals,
        loadingExpenses,
        addGoal,
        editGoal,
        removeGoal,
        addExpense,
        editExpense,
        removeExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
