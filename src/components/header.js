import * as React from "react"
import { Link } from "gatsby"
import * as headerStyles from "./header.module.css"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {
  const link = [
    { href: "/", text: "Posts" },
    { href: "/friends", text: "Friends" },
    { href: "/about", text: "About" },
  ]

  return (
    <nav className={headerStyles.nav}>
      <Link to="/">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/萌探机.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
    </Link>
      <ul className={headerStyles.headerContainer}>
        {link.map((item, index) => (
          <li key={index}>
            <Link to={item.href}  className={headerStyles.li}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
