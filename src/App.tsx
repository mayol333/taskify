import Logo from "./assets/logo-icon.svg?react"
import MytasksIcon from "./assets/mytasks-icon.svg?react"
import NotebookIcon from "./assets/notebook-icon.svg?react"
import ReportsIcon from "./assets/reports-icon.svg?react"
import ActivityIcon from "./assets/activity-icon.svg?react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import { Activity } from "./components/activity/Activity"
import { Meetings } from "./components/meetings/Meetings"
import { Tasks } from "./components/tasks/Tasks"
import { Reports } from "./components/reports/Reports"
export const App = () =>  {
  return (
    <div className="master-wrapper">
      <header className="header">
      <div className="logo"><Logo/></div>
      <span className="taskify-logo">TASKIFY</span>
      </header>
      <div className="test">
        
    <BrowserRouter>
          <nav className="navigation">
            <ul>
              <li> <NavLink className="list-item" to="/"><div className="nav-icon"> <NotebookIcon/> </div>   My tasks </NavLink> </li>
              <li> <NavLink className="list-item" to="/meetings"> <div className="nav-icon"> <MytasksIcon/> </div>   Meetings </NavLink></li>
              <li> <NavLink className="list-item" to="/reports"> <div className="nav-icon"><ReportsIcon/></div>  Reports </NavLink></li>
              <li> <NavLink className="list-item" to="/activity"> <div className="nav-icon"><ActivityIcon/></div> Activity </NavLink></li>
            </ul>
          </nav>
    <Routes>
    <Route path="/" element={<Tasks/>} />
    <Route path="/meetings" element={<Meetings/>} />
    <Route path="/reports" element={<Reports/>} />
    <Route path="/activity" element={<Activity/>} />
    </Routes>
    </BrowserRouter>
        </div>
        <div></div>
      </div>
  )
}

