import * as React from "react"

const Footer = () => {
  return (
    <footer>
      <div className={"friends"}>
        <span>friends: </span>
        <a href={"https://www.angeszhu.cn"}>AngesZhu</a>
      </div>
      <div>
        <span>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </span>
        {`    `}
        <span>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt="知识共享许可协议"
              style={{ borderWidth: 0 }}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
            />
          </a>
        </span>
      </div>
    </footer>
  )
}
export default Footer
