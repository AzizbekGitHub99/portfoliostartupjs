
import { Link } from "react-router-dom"
import "./style.scss"

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav container">
        <Link className="header__logo" to="/" > Portfolio</Link> 
        <div className="header__btns">
          <Link className="header__login-btn" to="/login">Login</Link>
          <Link className="header__login-btn" to="/register">Register</Link>
          <Link className="header__login-btn" to="/clients">Clients</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header