import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../server/request";

const initialState = {
    skills: null,
    selected: null,
    loading: false,
    btnLoading: false,
    search: "",
    isOpen: false,
    callback: false,
    total: 0, 
    page: 1,
}

export const getSkills = createAsyncThunk('skills/fetch', async(params, {getState})=>{
    const {page, search} = getState().skills
     params = {...params, page, limit: 10, search}
    const {data} = await request('skills', {params})
    return data
})

const skillsSlice = createSlice({
    initialState,
    name: 'skills',
    reducers: {
        controlModal(state){
            state.isOpen =!state.isOpen
        },
        setSelected(state, {payload}){
            state.selected = payload
        },   
        controlBtnLoading(state){
            state.btnLoading =!state.btnLoading
        },
        refresh(state){
            state.callback =!state.callback
        },
        controlPage(state, {payload}){
            state.page = payload
            console.log(state.page);
        },
        controlSearch(state, {payload}){
            state.search = payload
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(getSkills.pending, (state)=>{
            state.loading = true
        }).addCase(getSkills.fulfilled, (state, {payload: {data, pagination : {total}}})=>{
            state.skills = data
            state.total = total
            state.loading = false
        }).addCase(getSkills.rejected, (state)=>{
            state.loading = false
        })
    }
})

const {reducer: skillsReducer, actions} = skillsSlice

export const {controlModal, setSelected, controlBtnLoading, refresh, controlPage, controlSearch } = actions

export default skillsReducer