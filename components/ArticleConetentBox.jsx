const ArticleContentBox = ({fullname,lastupdate,title,description,peopleinvolved}) =>{
    // console.log(peopleinvolved);
    return(
        <div className="article-content-box">
            {fullname && lastupdate && <div className="content-box-header">
                <p className="content-box__from">from {fullname}</p>
                <p className="content-box__lastupdate">last update: {lastupdate}</p>
            </div>}
            <div className="content-box-body">
                <h3 className="content-box__title">{title}</h3>
                <button className="content-box__btn btn">involvers</button>
                <p className="content-box__desc">{description}</p>
            </div>
           {peopleinvolved && <div className="content-box-footer">
                {peopleinvolved.map((involver,index) => (
                    <p key={index}>{involver}</p>
                ))}
            </div>}
        </div>
    )
}
export default ArticleContentBox