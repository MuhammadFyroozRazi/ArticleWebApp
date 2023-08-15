'use client'

import ContentViewer from "@components/ContentViewer"
import Markdown from "@components/Markdown"
import { addArticle } from "@redux/freatures/articleSlice"
import {  useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import {BsArrowLeftSquare,BsArrowRightSquare} from 'react-icons/bs'


const create = () => {
  const [edit,setEdit] = useState(false)
  const [text,setText]=useState('')
  const [fontSz,setFontSz] = useState('12')
  const [title,setTitle] = useState('Article\'s Name')
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  const [showContentViewer,setShowContentViewer] = useState(true)
  
  const handleResize = () =>{
    setWindowWidth(window.innerWidth)
    if (window.innerWidth > 
      1024) {
      setShowContentViewer(true)
    }
  }
  // console.log(showContentViewer);

  useEffect(()=>{
    window.addEventListener('resize',handleResize)
    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  },[])
  

  const dispatch = useDispatch()
  const handleEditButton =  () =>{
  // const handleEditButton =  (text,title ) =>{
    setEdit(pre=>!pre)
    if(edit==false){
      dispatch(
        addArticle({
          auther:'fyrooz',
          article:{
            header:title,
            content:text,
          }
      }))
    }
  }
  const NavigationSection = () =>{
    return (
      <nav className="content-create-page__nav">
        <button className="content-create-page__nav__btn edit-btn" 
          onClick={handleEditButton}
        >{edit === false ? 'edit' : 'done'}</button>
            {window.innerWidth<1024 && !edit && <div className={`content-create-page__nav__toggler ${showContentViewer ? 'toggler-on' : 'toggler-off'}`}>
              {showContentViewer === true  ?  
                <button className="content-create-page__nav__toggler-btn " onClick={()=>{setShowContentViewer(pre=>!pre)}}><BsArrowLeftSquare size={'1.5rem'} /></button> 
                :
                <button className=" content-create-page__nav__toggler-btn" onClick={()=>{setShowContentViewer(pre=>!pre)}}><BsArrowRightSquare size={'1.5rem'} /></button>
              }
            </div>}
      </nav>
    )
  }

  return (
    <div className="content-create-page"> 
      <NavigationSection 
      />
      <ContentViewer 
        edit={edit}  
        text={text} 
        fontSz={fontSz} 
        title={title} 
        windowWidth={windowWidth} 
        showContentViewer={showContentViewer}
      />
      <Markdown 
        edit={edit} 
        text={text} 
        setText={setText} 
        fontSz={fontSz} 
        setFontSz={setFontSz} 
        title={title} 
        setTitle={setTitle}
       />
    </div>
  )
}

export default create