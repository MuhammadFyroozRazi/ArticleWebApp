'use client'
import {FaBold} from 'react-icons/fa'
import {FiCode} from 'react-icons/fi'
import {GrItalic} from 'react-icons/gr'
import {PiTextAlignLeftFill,PiTextAlignJustifyFill,PiTextAlignRightFill} from 'react-icons/pi'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'

import { useState,useRef } from "react"

const Markdown = ({edit,text,setText}) => {
  const textAreaRef = useRef(null)

  const [ fontSz,setFontSz] =useState('0')
  const [color,setColor] = useState('#ffffff')

  console.log('color',color);  
  const handleTextchange = (content)=>{
    setText(content)
  }


  const handleTagClick= (tagName) => {
    console.log(tagName);
    if (tagName === 'select') {
      return
    }
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
        handleTextchange(paras.join('\n'))
      }
      else{
        handleTextchange(document)
      }
    }
    else{
      const paras = text.split('\n')
      const indexOfSelectedPara = text.substring(0,selectionStart).split('\n').length-1
      paras[indexOfSelectedPara]=`<${tagName}>${paras[indexOfSelectedPara]}</${tagName}>`
      handleTextchange(paras.join('\n'))
    }

  }
 if(edit){
  return (
    <section className="markdown-section">
      <div className="markdown-section__keys">  
        <div className="markdown-section__keys-text-btn">
          <button  onClick={()=>handleTagClick('h1')}>h1</button>
          <select type='select' onChange={(e)=>handleTagClick(e.target.value)}>
            <option >select</option>
            <option  value="h2">h2</option>
            <option  value="h3">h3</option>
            <option  value="h4">h4</option>
          </select>
          <button  onClick={()=>handleTagClick('b')}><FaBold/></button>
          <button  onClick={()=>handleTagClick('c')}><FiCode/></button>
          <button  onClick={()=>handleTagClick('i')}><GrItalic/></button>
          
          <div className='color-picker' onClick={()=>handleTagClick(`${color}`)}>
            <span>A</span>
            <span className='color-picker__statusbar' style={{background:`${color}`}}></span>
          </div>
          <div  className='color-picker-window'>
            <input value={color} type="color" onChange={(e)=>setColor(e.target.value)} />
          </div>
          
        </div>

        <div className="markdown-section__keys-content-btn">
          <button  onClick={()=>handleTagClick('aj')}><PiTextAlignJustifyFill /></button>
          <button  onClick={()=>handleTagClick('ar')}><PiTextAlignLeftFill/></button>
          <button  onClick={()=>handleTagClick('al')}><PiTextAlignRightFill/></button>
        </div>

        <div className="markdown-section__keys-p">
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)-1).toString())}> <IoIosArrowBack/> </button>
          <input type="text" value={fontSz} className="markdown-section__keys-p-in" 
          onChange={(e)=> setFontSz(e.target.value.toString())} />
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)+1).toString())}><IoIosArrowForward/> </button>
        </div>
      </div>

      <textarea ref={textAreaRef} className="markdown-section__textarea" placeholder="text..." type="text" value={text} 
        onChange={(e)=>{
          handleTextchange(e.target.value)
        }}/>
    </section>
  )}
  }


export default Markdown