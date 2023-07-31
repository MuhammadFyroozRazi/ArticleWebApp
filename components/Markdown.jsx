'use client'
import {FaBold} from 'react-icons/fa'
import {FiCode} from 'react-icons/fi'
import {GrItalic} from 'react-icons/gr'
import {PiTextAlignLeftFill,PiTextAlignJustifyFill,PiTextAlignRightFill} from 'react-icons/pi'
import {BiFontColor} from 'react-icons/bi'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'

import { useState,useRef } from "react"

const Markdown = (prop) => {
  const textAreaRef = useRef(null)

  const [ text,setText] =useState('')
  const [ fontSz,setFontSz] =useState('0')


  const handleTagClick= (tagName) => {
    const selectionStart =textAreaRef.current.selectionStart 
    const selectionEnd =textAreaRef.current.selectionEnd 


    if (selectionStart != selectionEnd) {
      const indexOfSelectedStart = text.substring(0,selectionStart).split('\n').length-1
      const indexOfSelectedEnd = text.substring(0,selectionEnd).split('\n').length-1

      const firstTextPortion = text.substring(0,selectionStart)
      const lastTextPortion = text.substring(selectionEnd)
      const textToReplace = `<${tagName}>${text.substring(selectionStart,selectionEnd)}</${tagName}>`
      const document = firstTextPortion+textToReplace+lastTextPortion
      const paras = document.split('\n')
      console.log(document);

      let index = indexOfSelectedStart
      if (indexOfSelectedStart!=indexOfSelectedEnd) {
        while (index!=indexOfSelectedEnd+1) {
          if (index == indexOfSelectedStart) {
            paras[index] = `${paras[index]}</${tagName}>`
          }
          else if (index != indexOfSelectedEnd) {
            paras[index] = `<${tagName}>${paras[index]}</${tagName}>`
          }
          else{
            paras[index] = `<${tagName}>${paras[index]}`
          }    
          index=index+1
        }
        setText(paras.join('\n'))
      }
      else{
        setText(document)
      }
    }
    else{
      const paras = text.split('\n')
      const indexOfSelectedPara = text.substring(0,selectionStart).split('\n').length-1
      paras[indexOfSelectedPara]=`<${tagName}>${paras[indexOfSelectedPara]}</${tagName}>`
      setText(paras.join('\n'))
    }

  }
 if(prop.edit){
  return (
    <section className="markdown-section">
      {/* <nav className="markdown-section__nav">
        <button className="markdown-section__nav__btn"><span>{`<`}</span> previous page</button>
        <button className="markdown-section__nav__btn edit-btn" 
          onClick={handleEditButton}
        >{edit === false ? 'edit' : 'done'}</button>
        <button className="markdown-section__nav__btn"> next page<span>{`>`}</span></button>
      </nav> */}
        
      <div className="markdown-section__keys">  
        <div className="markdown-section__keys-text-btn">
          <button  onClick={()=>handleTagClick('h1')}>h1</button>
          <button  onClick={()=>handleTagClick('b')}><FaBold/></button>
          <button  onClick={()=>handleTagClick('c')}><FiCode/></button>
          <button  onClick={()=>handleTagClick('i')}><GrItalic/></button>
          <button  onClick={()=>handleTagClick('clr')}><BiFontColor/></button>
        </div>

        <div className="markdown-section__keys-content-btn">
          <button  onClick={()=>handleTagClick('aj')}><PiTextAlignJustifyFill /></button>
          <button  onClick={()=>handleTagClick('ar')}><PiTextAlignLeftFill/></button>
          <button  onClick={()=>handleTagClick('al')}><PiTextAlignRightFill/></button>
        </div>

        <div className="markdown-section__keys-p">
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)-1).toString())}> <IoIosArrowBack/> </button>
          <input type="text" value={fontSz} className="markdown-section__keys-p-in" 
          onChange={(e)=> setFontSz(e.target.value.toString())}/>
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)+1).toString())}><IoIosArrowForward/> </button>
        </div>
      </div>

      <textarea ref={textAreaRef} className="markdown-section__textarea" placeholder="text..." type="text" value={text} 
        onChange={(e)=>{
          setText(e.target.value)
        }}/>
    </section>
  )}
  }


export default Markdown