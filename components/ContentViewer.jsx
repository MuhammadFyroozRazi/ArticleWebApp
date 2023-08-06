// 'use client'

import { useSelector } from "react-redux"

const ContentViewer = ({text,edit}) => {

  const auther = useSelector(state=>state.articleSlice.auther)
  const article = useSelector(state=>state.articleSlice.article)
  
  let document =  text.replace(/<(b)>/g,`<span id='bold' `)
                        .replace(/<(c)>/g,`<span id='code'>`)
                        .replace(/<(i)>/g,`<span id='italic'>`)
                        .replace(/<(clr)>/g,`<span id='color'>`)
                        .replace(/<(h1)>/g,`<span id='h1' style="font-size:2.5rem;">`)
                        .replace(/<(h2)>/g,`<span id='h2' style="font-size:2rem;">`)
                        .replace(/<(h3)>/g,`<span id='h3' style="font-size:1.8rem;">`)
                        .replace(/<(h4)>/g,`<span id='h4' style="font-size:1.5rem;">`)
                        .replace(/<(aj)>/g,`<span id='aj'>`)
                        .replace(/<(ar)>/g,`<span id='ar'>`)
                        .replace(/<(al)>/g,`<span id='al'>`)
                        .replace(/<\/(b|c|i|clr|h1|h2|h3|h4|aj|ar|al)>/g,`</span>`)
  
   
   
   const paras = document.split('\n')
   paras.forEach((element,index) => {
      paras[index]=`<p style="font-size:1rem;">`+element+`</p>`
   });
   document = paras.join('\n')
   
  // const parseHTML = (text) =>{
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(text,'text/html')
  //   return doc.body
  // }
  // const parsedDoc=parseHTML(document);
  // console.log(parsedDoc.innerHTML);
  
  
  if(edit===false){return (
    <div className="content-container">
      <section className='content-viewer content-font'>
          <h1 style={{color:'red'}} className="content-viewer__h1 black-clr">Article's Name</h1>
          <p className="content-viewer__p p-small p-small-fade black-clr">creted date : dd/mm/yyy</p>
          <p className="content-viewer__p p-small p-small-fade black-clr">last updated date : dd/mm/yyy</p>
          <div  className="content-viewer__br "></div>
      </section>
      <section className="article-viewer">
        <div dangerouslySetInnerHTML={{ __html: document }} />
      </section>
    </div>
  )}
}

export default ContentViewer