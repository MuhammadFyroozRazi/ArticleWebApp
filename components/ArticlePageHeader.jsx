import { TfiSettings } from "react-icons/tfi"

const ArticlePageHeader = (prop) =>{
return(
   <div className="article-content-header">
    <div className="uprightelement">
        <TfiSettings className="article-content__setting" size={'1.5rem'}/>
        <button className="article-content__btn btn">Logout</button>
    </div>
    <h1 className="article-content__header">{prop.header}</h1>
   </div>
)
}

export default ArticlePageHeader