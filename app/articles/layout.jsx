'use client'

import ArticleNavPage from "@components/articlePageNav"
import { usePathname } from "next/navigation"
const layout = ({children}) => {
 const router = usePathname()
 const navShowsInRoutes = ['/articles', '/articles/inbox', '/articles/personal'];
 console.log(router)
  return (
    <div className="article">
        {navShowsInRoutes.includes(router) && <ArticleNavPage/>}
        {children}
    </div>
  )
}

export default layout