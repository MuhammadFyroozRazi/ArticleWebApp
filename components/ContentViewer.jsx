'use client'

import { useState } from "react"
import { useSelector } from "react-redux"

const ContentViewer = ({text,edit}) => {
  
  const parser = new DOMParser()
  const auther = useSelector(state=>state.articleSlice.auther)
  const article = useSelector(state=>state.articleSlice.article)

  const [showContentViewer,setShowContentViewer] = useState(false)
  

  let textDoc =  text.replace(/<(b)>/g,`<span id='bold'>`)
                        .replace(/<(c)>/g,`<span id='code'>`)
                        .replace(/<(i)>/g,`<span id='italic'>`)
                        .replace(/<(clr)>/g,`<span id='color'>`)
                        .replace(/<(h1)>/g,function(){
                          const rand = Math.floor(Math.random()*90000)+10000
                          return `<span id='h1' class='h1${rand}' style="font-size:2rem;">`
                         }) //here we calling random fuction each time even if h1 appears again previosly it only call once
                        .replace(/<(h2)>/g,function(){
                          const rand = Math.floor(Math.random()*90000)+10000
                          return `<span id='h1' class='h2${rand}' style="font-size:2rem;">`
                        })
                        .replace(/<(h3)>/g,function(){
                          const rand = Math.floor(Math.random()*90000)+10000
                          return `<span id='h1' class='h3${rand}' style="font-size:2rem;">`
                        })
                        .replace(/<(h4)>/g,function(){
                          const rand = Math.floor(Math.random()*90000)+10000
                          return `<span id='h1' class='h4${rand}' style="font-size:2rem;">`
                        })
                        .replace(/<(aj)>/g,`<span id='aj' style="text-align:justify;">`)
                        .replace(/<(ar)>/g,`<span id='ar' style="text-align:right;">`)
                        .replace(/<(al)>/g,`<span id='al' style="text-align:left;">`)
                        .replace(/<#([0-9A-Fa-f]{6})>/g,(_,color)=>`<span id='color' style="color:#${color};">`)
                        .replace(/<\/(b|c|i|clr|h1|h2|h3|h4|aj|ar|al|#([0-9A-Fa-f]))>/g,`</span>`)
  
   
   
   const paras = textDoc.split('\n')
   paras.forEach((element,index) => {
      paras[index]=`<p>`+element+`</p>`
   });
   textDoc = paras.join('\n')

   const contentXML = parser.parseFromString(textDoc,'text/html')
   const contentElements = contentXML.querySelectorAll('p')
   const contentElementsArray = [...contentElements]

   const contentComponent = contentElementsArray.map((event,index)=>(
    <p key={index}style={{fontSize:'0.9rem'}} >
      <div dangerouslySetInnerHTML={{ __html: event.innerHTML }} />
    </p>
   ))

   


   const headers = paras.filter(para=>/<span id='h[1-4]'.*>/.test(para))
   headers.forEach((header,index)=>{
    const removeP = header.split(/<p>/)[1].split('</p>')[0].split('</span>') 
    // console.log(removeP[0].split(/\s+/)[2].split('class=')[1].split('\'')[1]);
    const ankerId = removeP[0].split(/\s+/)[2].split('class=')[1].split('\'')[1]
    // console.log(removeP[0].split(/<.*>/)[1]);
    const removeSpan = removeP[0].split(/<.*>/)[1]
    headers[index]=`<a href=#${ankerId} >${removeSpan}</a>`
   })
   const headersView = headers.join('\n')
   
   const headerXml = parser.parseFromString(headersView,'text/html')
   const ankerElement = headerXml.querySelectorAll('a');
   const ankerElementArray = [...ankerElement]
  
  
   const handleHeaderLinkClick = (e,targetid) =>{
    // on clicking the ankers this will happens
    // console.log(targetid.split('#')[1]);
    e.preventDefault()
    const target= targetid.split('#')[1]
    const targetSelection = document.querySelector(`.${target}`)
    console.log(targetSelection);
    if(targetSelection){
      targetSelection.scrollIntoView({behavior:'smooth'})
    }
   }
  
   const anchorComponet = ankerElementArray.map((event,index)=>(
    <a key={index} onClick={(e)=>handleHeaderLinkClick(e,event.getAttribute('href'))} href={event.getAttribute('href')}>
      {event.innerText}
    </a>
   ))
  
  return (
    <div className={`content-container ${showContentViewer ? `translate-to-view` : 'translate-to-hide' } `}>
     {!edit && <section className='content-viewer content-font'>
          <button className="content-viewer__toggle" onClick={()=>{setShowContentViewer(pre=>!pre)}}></button>
          <h1 className="content-viewer__h1 black-clr">Article's Name</h1>
          <p className="content-viewer__p p-small p-small-fade black-clr">creted date : dd/mm/yyy</p>
          <p className="content-viewer__p p-small p-small-fade black-clr">last updated date : dd/mm/yyy</p>
          <div  className="content-viewer__br ">
          </div>
          {/* <div> */}
            {anchorComponet}
          {/* </div> */}
      </section>}
      <section className={`article-viewer ${edit ? `half-size` : `full-size`}`}>
        {/* <div dangerouslySetInnerHTML={{ __html: contentComponent }} /> */}
        {contentComponent}
      </section>
    </div>
  )
}

export default ContentViewer