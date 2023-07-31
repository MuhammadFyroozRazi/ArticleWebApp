// 'use  client'

const ContentViewer = (prop) => {
  if(prop.edit==false){return (
    <section className='content-viewer content-font'>
        <h1 className="content-viewer__h1 black-clr">Article's Name</h1>
        <p className="content-viewer__p p-small p-small-fade black-clr">creted date : dd/mm/yyy</p>
        <p className="content-viewer__p p-small p-small-fade black-clr">last updated date : dd/mm/yyy</p>
        <div  className="content-viewer__br "></div>
        
    </section>
  )}
}

export default ContentViewer