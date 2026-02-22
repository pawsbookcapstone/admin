import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AppContextType = {
  userId: string | null;
  setUserId: (value: string | null) => void;

  userName: string | null;
  setUserName: (value: string | null) => void;

  userEmail: string | null;
  setUserEmail: (value: string | null) => void;

  gcashNumber: string | null;
  setGcashNumber: (value: string | null) => void;

  gcashNumberQR: string | null;
  setGcashNumberQR: (value: string | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppsProvider");
  return context;
};

export const AppsProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [gcashNumber, setGcashNumber] = useState<string | null>(null);
  const [gcashNumberQR, setGcashNumberQR] = useState<string | null>(null);

  useEffect(()=>{
    const usersData = localStorage.getItem("logged_user")
    if (!usersData) return

    const user = JSON.parse(usersData)
    
    setUserId(user.id)
    setUserName(user.name)
    setUserEmail(user.email)
    setGcashNumber(user.gcash_number)
    setGcashNumberQR(user.gcash_qr)
  }, [])

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        userEmail,
        setUserEmail,gcashNumber, setGcashNumber,
        gcashNumberQR, setGcashNumberQR
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
