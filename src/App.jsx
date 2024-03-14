import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { HomeHeader } from "./components/header";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import AddEvent from "./components/Event/AddEvent";
import GlobalContext from "./contexts/GlobalContext";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from './components/firebase/Firebase'

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showAddEvent } = useContext(GlobalContext);

  const [user] = useAuthState(auth);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {user ? (
        <>
          <HomeHeader />
          <React.Fragment>
            {showAddEvent && <AddEvent />}
            <div className="h-screen flex flex-col calendarH">
              <h1 className="text-2xl font-bold hover:underline"></h1>
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currentMonth} />
              </div>
            </div>
          </React.Fragment>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default App;
