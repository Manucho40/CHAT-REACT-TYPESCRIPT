import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../app/store";

export const API = "http://localhost:8080/api/user/";

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
    entries: object[],
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
        addUser: (state, action) =>{
            state.entries.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(dataAPI.fulfilled, (state, action) => {
            state.entries = action.payload
            state.loading = "succeeded"
            
        })
      },
})

 export const selectData = (state: RootState) => state.users.entries
 export const {addUser} = userSlice.actions
 export default userSlice.reducer;