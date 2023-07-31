'use client'

import ContentViewer from "@components/ContentViewer"
import Markdown from "@components/Markdown"
import { useState } from "react"

const create = () => {
  const [edit,setEdit] = useState(true)
  const [ text,setText] =useState('')
  const handleEditButton = () =>{
    setEdit(pre=>!pre)
  }
  return (
    <div className="content-create-page"> 
      <nav className="markdown-section__nav">
        <button className="markdown-section__nav__btn"><span>{`<`}</span> previous page</button>
        <button className="markdown-section__nav__btn edit-btn" 
          onClick={handleEditButton}
        >{edit === false ? 'edit' : 'done'}</button>
        <button className="markdown-section__nav__btn"> next page<span>{`>`}</span></button>
      </nav>
      <ContentViewer edit={edit}/>
      <Markdown edit={edit} setText={setText} text={text}/>
    </div>
  )
}

export default create