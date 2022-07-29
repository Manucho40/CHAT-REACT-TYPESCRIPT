import { createSlice } from "@reduxjs/toolkit"


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
    initialState:{
        users: null
    },
    reducers: {
        setUsersData: (state, action) =>{
            state.users = action.payload
        }
    }
})

export const { setUsersData } = userSlice.actions;
export default userSlice.reducer;