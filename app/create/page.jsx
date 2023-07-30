import ContentViewer from "@components/ContentViewer"
import Markdown from "@components/Markdown"

const create = () => {
  return (
    <div className="content-create-page"> 
        <ContentViewer/>
        <Markdown/>
    </div>
  )
}

export default create