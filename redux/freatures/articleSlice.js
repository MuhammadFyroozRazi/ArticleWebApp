import {createSlice} from '@reduxjs/toolkit'


const getDate = () =>{
    const currentDate = new Date()
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