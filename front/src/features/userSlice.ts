import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../app/store";
import { UsersState } from "../types/UsersState";
import { User } from "../types/User";
import { userLogin } from "../types/userLogin";


export const API = "http://localhost:8080/api/user/";


const user = JSON.parse(localStorage.getItem('user') || '{}');
// Formatage de mon initialState
const initialState = {
    entries: user ? user : null,
    loading: 'idle',
    inform: ""
} as UsersState;

/**
 * Creation de la fonction dataAPI à l'aide de la fonction asyncrone createAsyncThunk.
 * Elle me permet de faire appelle à mes datas depuis ma BDD et tout ça de façon asyncrone
 */
export const dataAPI = createAsyncThunk(
    'userSlice/dataAPI',
    async () =>{
        try{
            const response = await axios.get(API);
            const res = response.data
            return res;
        }catch(error){
            console.log(error)
        }
    }
);


/**
 * Création de mon slice UserSlice
 */
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // addUser pour l'enregistrement d'un nouvel utilisateur
        reset: (state) => {
            state.entries = {};
            state.loading = 'idle';
            state.inform = "";
        }
    },
    /**
     *Gestion des sorti de la fonction dataAPI vu que celle ci à été crée avec createAsyncThunk
     *
     */
    extraReducers: (builder) => {
        builder
            .addCase(addUserAsync.pending, (state) => {
             state.loading = "pending"
            
            })
            .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<User[]>) => {
             state.entries = action.payload
             state.loading = "succeeded"
             state.inform = "Enregistrement réussi!"
            
            })
            .addCase(addUserAsync.rejected, (state, action: any) => {
             state.loading = "failed"
             state.inform = action.payload
            })
            .addCase(connexion.fulfilled, (state, action: PayloadAction<User[]>) => {
             state.entries = action.payload
             state.loading = "succeeded"
            
            })
            .addCase(connexion.rejected, (state, action: any) => {
                state.loading = "failed"
                state.inform = action.payload
               })
            .addCase(deconnexion.fulfilled, (state) => {
                state.entries = {}
            })
            
      },
})

/**
 * Fonction addUserAsync gère la logique d'envoie de données à mon API
 */
export const addUserAsync = createAsyncThunk(
    'userSlice/addUserAsync',
    
    async (data: User, thunkAPI) => {
        try{
            //addUser(data)
            const response = await axios.post(API, data);
            // if(response.data){
            //     localStorage.setItem('user', JSON.stringify(response.data))
            // }
            return response.data
        }catch (error :any) {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }
    }
);
export const connexion = createAsyncThunk(
    'userSlice/connexion',
    
    async (data: userLogin, thunkAPI) => {
        try{
            //addUser(data)
            const response = await axios.post(API + 'login', data);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        }catch (error :any) {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }
    }
);

export const deconnexion = createAsyncThunk('userSlice/deconnexion',
    async() => {
        await deconnecter();
    }
)


const deconnecter = () => {
    localStorage.removeItem('user')
}





 export const selectData = (state: RootState) => state.users;
 export const {reset} = userSlice.actions
 export default userSlice.reducer;