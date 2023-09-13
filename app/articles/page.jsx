import {TfiSettings} from 'react-icons/tfi'


const page = () => {
  return (
      <div className="article-content">
        <div className="article-content-header">
          <TfiSettings/> {/*fixed position*/}
          <button className="article-content__btn"></button> {/*fixed position*/}
          <h1>Personal</h1>
        </div>
        <div className="article-content-viewer">
        </div>
      </div>
  )
}

export default page