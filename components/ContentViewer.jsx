'use client'

import { useState } from "react"
import { useSelector } from "react-redux"

const ContentViewer = ({text,edit}) => {

  const auther = useSelector(state=>state.articleSlice.auther)
  const article = useSelector(state=>state.articleSlice.article)

  const [showContentViewer,setShowContentViewer] = useState(false)
  // console.log(showContentViewer);
  
  let document =  text.replace(/<(b)>/g,`<span id='bold' `)
                        .replace(/<(c)>/g,`<span id='code'>`)
                        .replace(/<(i)>/g,`<span id='italic'>`)
                        .replace(/<(clr)>/g,`<span id='color'>`)
                        .replace(/<(h1)>/g,`<span id='h1 h1${Math.floor(Math.random()*90000)+10000}' style="font-size:2rem;">`)
                        .replace(/<(h2)>/g,`<span id='h2 h2${Math.floor(Math.random()*90000)+10000}' style="font-size:1.5rem;">`)
                        .replace(/<(h3)>/g,`<span id='h3 h3${Math.floor(Math.random()*90000)+10000}' style="font-size:1.2rem;">`)
                        .replace(/<(h4)>/g,`<span id='h4 h4${Math.floor(Math.random()*90000)+10000}' style="font-size:1rem;">`)
                        .replace(/<(aj)>/g,`<span id='aj' style="text-align:justify;">`)
                        .replace(/<(ar)>/g,`<span id='ar' style="text-align:right;">`)
                        .replace(/<(al)>/g,`<span id='al' style="text-align:left;">`)
                        .replace(/<#([0-9A-Fa-f]{6})>/g,(_,color)=>`<span id='color' style="color:#${color};">`)
                        .replace(/<\/(b|c|i|clr|h1|h2|h3|h4|aj|ar|al|#([0-9A-Fa-f]))>/g,`</span>`)
  
   
   
   const paras = document.split('\n')
   paras.forEach((element,index) => {
      paras[index]=`<p style="font-size:.9rem;">`+element+`</p>`
   });
   document = paras.join('\n')

   const headers = paras.filter(para=>/<span id='h[1-4] h[1-4][0-9]{5}'.*>/.test(para))
  //  !edit && console.log(headers);
   headers.forEach((header,index)=>{
    const removeP = header.split(/<p style=.*?>/)[1].split('</p>')[0].split('</span>')
    const ankerId = removeP[0].split(/\s+/)[2]
    console.log(ankerId);
    const removeSpan = removeP[0].split(/<span id='h[1-4] .*?>/)[1]
    headers[index]=`<a id='point_to_header' href=#${ankerId}>${removeSpan}</a>`
   })
   !edit && console.log(headers);
   
  
  return (
    <div className={`content-container ${showContentViewer ? `translate-to-view` : 'translate-to-hide' } `}>
     {!edit && <section className='content-viewer content-font'>
          <button className="content-viewer__toggle" onClick={()=>{setShowContentViewer(pre=>!pre)}}></button>
          <h1 className="content-viewer__h1 black-clr">Article's Name</h1>
          <p className="content-viewer__p p-small p-small-fade black-clr">creted date : dd/mm/yyy</p>
          <p className="content-viewer__p p-small p-small-fade black-clr">last updated date : dd/mm/yyy</p>
          <div  className="content-viewer__br ">
            {/* <div dangerouslySetInnerHTML={{ __html: headersView }} /> */}
          </div>
      </section>}
      <section className={`article-viewer ${edit ? `half-size` : `full-size`}`}>
        <div dangerouslySetInnerHTML={{ __html: document }} />
      </section>
    </div>
  )
}

export default ContentViewer