import Logo from "./assets/logo-icon.svg?react"
export const App = () =>  {
  return (
    <div className="master-wrapper">
      <header className="header">
      <div className="logo"><Logo/></div>
      <span className="taskify-logo">TASKIFY</span>
      </header>
      <div className="test"></div>
    </div>
  )
}

