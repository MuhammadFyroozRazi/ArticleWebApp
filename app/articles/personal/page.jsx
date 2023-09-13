import ArticleContentBox from "@components/ArticleConetentBox"
import ArticlePageHeader from "@components/ArticlePageHeader"

const page = () => {
    return(
        <div className="article-content">
            <ArticlePageHeader header={'Personal'}/>
            <ArticleContentBox 
            fullname={'Full Name'}
            lastupdate={'13/2/2023'}
            title={`Article's Name`}
            description={'description of the article taht is saved by the creator jkj jkhj hh jkhuigi giuygiugi ugiugi ugiugiugiuiu ugiugigui u'}
            peopleinvolved={['person 1','person 2','person 3','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4','person 4']}
            />
        </div>
    )
}

export default page