import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
