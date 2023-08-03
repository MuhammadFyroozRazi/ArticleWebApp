import {createSlice} from '@reduxjs/toolkit'


const getDate = () =>{
    const currentDate = new Date()
    // const year = currentDate.getFullYear()
    // const day =String(currentDate.getDate()).padStart(2,'0')
    // const month = String(currentDate.getMonth()).padStart(2,'0')
    // const hours = String(currentDate.getHours()).padStart(2,'0')
    // const minutes = String(currentDate.getMinutes()).padStart(2,'0')
    // const seconds = String(currentDate.getSeconds()).padStart(2,'0')
    // return `${day}:${month}:${year}//${hours}:${minutes}:${seconds}`
    return `${currentDate.toUTCString()}`
}

const initialState = {
    auther:'',
    article:{
        header:'',
        content:''
    },
    dateOfCreation:'',
    dateOfUpdation:''
}

export const article = createSlice({
    name:"article",
    initialState: initialState,
    reducers:{
        addArticle:(state,action)=>{
            const {auther,article} = action.payload
            return {
                ...state,
                auther: auther,
                article:{
                    ...state.article,
                    header:article.header,
                    content:article.content
                },
                dateOfCreation : getDate(),
                dateOfUpdation : state.dateOfCreation
            }
        },
        updateArticle:(state,action)=>{
            const {article} = action.payload
            return{
                ...state,
                article:{
                    ...state.article,
                    header:article.header,
                    content:article.content
                },
                dateOfUpdation : getDate()
            }
        },

    }
})

export const {addArticle,updateArticle} = article.actions
export default article.reducer