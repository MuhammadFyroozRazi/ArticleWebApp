'use client'


import {FaBold} from 'react-icons/fa'
import {FiCode} from 'react-icons/fi'
import {GrItalic} from 'react-icons/gr'
// import {PiTextAlignLeftFill,PiTextAlignJustifyFill,PiTextAlignRightFill} from 'react-icons/pi'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'

import { useState,useRef } from "react"

const Markdown = ({edit,text,setText,fontSz,setFontSz,title,setTitle}) => {
  const textAreaRef = useRef(null)

  // const [ fontSz,setFontSz] =useState('12')
  const [color,setColor] = useState('#ffffff')
  const [titleToggler,setTitleToggler] = useState(false)

  const handleTitleToggler = () =>{
    setTitleToggler(prev=>!prev)
  }

  const baseFontdecrementor = () =>{
    if (fontSz > 1) {
      setFontSz(pre=>(parseInt(pre)-1).toString())
    }
  }
  const baseFontSizeChanger = (e) => {
    if(e.target.value > 0){
      setFontSz(e.target.value.toString())
    }
  }

  const handleTextchange = (content)=>{
    setText(content)
  }

// handling when an tag is clicked 
  const handleTagClick= (tagName) => {
    // on select option do nothing for selecting select option 
    if (tagName === 'select') {
      return
    }
    const selectionStart =textAreaRef.current.selectionStart 
    const selectionEnd =textAreaRef.current.selectionEnd 
    
    // apply the sentence/text tagging (can tag simple sentence or even an letter). exclude h1-h4 and allign tags from it. 
    if (selectionStart != selectionEnd && !['h1','h2','h3','h4','ar','al','aj'].includes(tagName) ) {
      const indexOfSelectedStart = text.substring(0,selectionStart).split('\n').length-1
      const indexOfSelectedEnd = text.substring(0,selectionEnd).split('\n').length-1

      const firstTextPortion = text.substring(0,selectionStart)
      const lastTextPortion = text.substring(selectionEnd)
      const textToReplace = `<${tagName}>${text.substring(selectionStart,selectionEnd)}</${tagName}>`
      const document = firstTextPortion+textToReplace+lastTextPortion
      const paras = document.split('\n')

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
    // apply taging on the paragrapgh if cursor do not select anything only clicked in an para. its is main for before excluded tags 
    else{
      const paras = text.split('\n')
      const indexOfSelectedPara = text.substring(0,selectionStart).split('\n').length-1
      // console.log(paras[indexOfSelectedPara].includes('<h1>') && paras[indexOfSelectedPara].includes('<h2>') || paras[indexOfSelectedPara].includes('<h3>')  || paras[indexOfSelectedPara].includes('<h4>') );
      if(paras[indexOfSelectedPara].includes('<h1>')==false && paras[indexOfSelectedPara].includes('<h2>')==false && paras[indexOfSelectedPara].includes('<h3>') ==false  && paras[indexOfSelectedPara].includes('<h4>')== false){
        // console.log('can add tags');
        paras[indexOfSelectedPara]=`<${tagName}>${paras[indexOfSelectedPara]}</${tagName}>`
      }
      handleTextchange(paras.join('\n'))
    }
  }

 if(edit){
  return (
    <section className="markdown-section">
      <div className="markdown-section__keys">  

        <button className='markdown-section__keys-title' onClick={handleTitleToggler}>T</button>

        {!titleToggler && <div className="markdown-section__keys-text-btn">
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
        </div>}

        {/* <div className="markdown-section__keys-content-btn">
          <button  onClick={()=>handleTagClick('aj')}><PiTextAlignJustifyFill /></button>
          <button  onClick={()=>handleTagClick('al')}><PiTextAlignLeftFill/></button>
          <button  onClick={()=>handleTagClick('ar')}><PiTextAlignRightFill/></button>
        </div> */}

        {!titleToggler && <div className="markdown-section__keys-p">
          <button onClick={baseFontdecrementor}> <IoIosArrowBack/> </button>
          
          <input type="text" value={fontSz} className="markdown-section__keys-p-in" 
          onChange={(e)=> baseFontSizeChanger(e)} />
          
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)+1).toString())}><IoIosArrowForward/> </button>
        </div>}

        {titleToggler && <input className='markdown-section__title' type="text"  placeholder='titile...' value={title} 
        onChange={(e)=>{
          setTitle(e.target.value)
          }} />}

      </div>
      <textarea ref={textAreaRef} className="markdown-section__textarea" placeholder="text..." type="text" value={text} 
        onChange={(e)=>{
          handleTextchange(e.target.value)
        }}/>
    </section>
  )}
  }


export default Markdown