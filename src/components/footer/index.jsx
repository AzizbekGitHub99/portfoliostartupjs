
import { Link } from "react-router-dom"

import telegram from "../../assets/images/telegram.png"
import instagram from "../../assets/images/instagram.png"
import linkedin from "../../assets/images/linkedin.png"

import "./style.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer__nav container">
      <Link className="footer__logo" to="/">Portfolio</Link>
      <div className="footer__links">
        <a target="_blank" href="https://t.me/ilhamovich_010">
          <img width={18} src={telegram} alt="telegram" />
          Telegram
        </a>
        <a target="_blank" href="https://instagram.com/ilhamovich_010">
          <img width={18} src={instagram} alt="telegram" />
          Instagram
        </a>
        <a target="_blank" href="https://linkedin.com/">
          <img width={18} src={linkedin} alt="linkedin" />
          Linkedin
        </a>
      </div>
      </nav>
      <div className="container">
        <p style={{color: "#7593af", paddingTop: "12px"}}>© 2024  |  All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer