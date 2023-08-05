'use client'

import ContentViewer from "@components/ContentViewer"
import Markdown from "@components/Markdown"
import { addArticle } from "@redux/freatures/articleSlice"
import {  useState } from "react"
import { useDispatch } from "react-redux"


const create = () => {
  const [edit,setEdit] = useState(false)
  const [text,setText]=useState('')
  
  console.log(text);
  const dispatch = useDispatch()
  const handleEditButton =  () =>{
    setEdit(pre=>!pre)
    if(edit==false){
      dispatch(
        addArticle({
          auther:'fyrooz',
          article:{
            header:'Title',
            content:text,
          }
      }))
    }
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
      <ContentViewer edit={edit}  text={text}/>
      <Markdown edit={edit} 
      // handleTextchange={handleTextchange} 
      text={text} setText={setText}

       />
    </div>
  )
}

export default create