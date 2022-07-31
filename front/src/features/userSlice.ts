import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const API = "http://localhost:8080/api/user/";

export const dataAPI = createAsyncThunk(
    'userSlice/dataAPI',
    async () =>{
        try{
            const response = await axios.get(API);
            return response.data;
        }catch(error){
            console.log(error)
        }
    }
)

interface UsersState{
    entries: [],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}
const initialState = {
    entries: [],
    loading: 'idle'
} as UsersState;

export interface User {
    id: Object,
    pseudo: string,
    email: string,
    password: string,
    createAt: Date,
    updateAt: Date,
    token: string
}





export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // setUsersData: (state, action) =>{
        //     state.entries = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(dataAPI.fulfilled, (state, action) => {
            state.entries = action.payload
            
            state.loading = "succeeded"
            
        })
      },
})



export default userSlice.reducer;