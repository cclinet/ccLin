import * as React from "react"
import { Link } from "gatsby"
import * as headerStyles from "./header.module.css"

const Header = () => {
  return (
    <nav>
      <ul className={headerStyles.headerContainer}>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/friend">Friend</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
