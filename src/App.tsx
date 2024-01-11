import { Icon } from "./components/ui/Icon/Icon";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Activity } from "./components/activity/Activity";
import { Meetings } from "./components/meetings/Meetings";
import { Tasks } from "./components/tasks/Tasks";
import { Reports } from "./components/reports/Reports";
export const App = () => {
    return (
        <div className="master-wrapper">
            <header className="header">
                <Icon type="logo" className="logo" />
                <span className="taskify-logo">TASKIFY</span>
            </header>
            <div className="test">
                <BrowserRouter>
                    <nav className="navigation">
                        <ul className="navigation-list">
                            <li>
                                <NavLink className="list-item" to="/">
                                    <Icon
                                        type="notebook"
                                        className="nav-icon"
                                    />
                                    My tasks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="list-item" to="/meetings">
                                    <div className="nav-icon">
                                        <Icon
                                            type="mytasks"
                                            className="nav-icon"
                                        />
                                    </div>
                                    Meetings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="list-item" to="/reports">
                                    <div className="nav-icon">
                                        <Icon
                                            type="reports"
                                            className="nav-icon"
                                        />
                                    </div>
                                    Reports
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="list-item" to="/activity">
                                    <div className="nav-icon">
                                        <Icon
                                            type="activity"
                                            className="nav-icon"
                                        />
                                    </div>
                                    Activity
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Tasks />} />
                        <Route path="/meetings" element={<Meetings />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/activity" element={<Activity />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <div></div>
        </div>
    );
};
