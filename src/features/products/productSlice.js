import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { baseurl } from "../../utils/baseurl";

export const loadProducts = createAsyncThunk('products/load', async(thunkApi)=>{
    try{
        const response = await axios.get(baseurl)
        console.log(response.data)
        return response.data
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response.data)
    }
})

const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        status:"idle",
        cart:[],
        savedForLater:[],
    },
    reducers:{
        addToCart: (state, action)=>{
            state.savedForLater = state.savedForLater.filter((product)=>product.name!==action.payload.name)
            if(!state.cart.includes(action.payload)) {
                
                state.cart.push(action.payload)
                
            }
        },

        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter((product)=>product.name!==action.payload.name)
        },

        saveForLater: (state, action)=>{
            state.cart = state.cart.filter((product)=>product.name!==action.payload.name)
            state.savedForLater.push(action.payload)
        },

        removeFromSaveForLater: (state, action)=>{
            state.savedForLater = state.savedForLater.filter((product)=>product.name!==action.payload.name)
        },

        incrementQuantity:(state, action)=>{
            const productIndex = state.cart.findIndex(
                (product) => product.name === action.payload.name
                
              );
            state.cart[productIndex].quantity++;
        },

        decrementQuantity:(state, action)=>{
            const productIndex = state.cart.findIndex(
                (product) => product.name === action.payload.name
                
              );
            const quantity = state.cart[productIndex].quantity--;
            if(quantity ===0){
                state.cart = state.cart.filter((product)=>product.name!==action.payload.name)
            }
        }


    },
    extraReducers:{
        [loadProducts.pending]: (state)=>{
            state.status="loading"
        },
        [loadProducts.fulfilled]: (state, action)=>{
            state.products = action.payload
            state.status="success"
        }
    }
})

export const {addToCart, removeFromCart, saveForLater, removeFromSaveForLater, incrementQuantity, decrementQuantity} = productSlice.actions
export default productSlice.reducer;