import * as React from "react"
import Layout from "../components/layout"

const Friend = location => {
  return (
    <Layout location={location}>
      <ul>
        <li>
          <a href={"https://www.angeszhu.cn"}>AngesZhu</a>
        </li>
      </ul>
    </Layout>
  )
}
export default Friend
