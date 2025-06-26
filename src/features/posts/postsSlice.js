import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev"

// Async thunk for fetching a user's posts

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
)

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token)
        const userId = decode.id;
   
        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
    }
            const response = await axios.post(`${BASE_URL}/posts`, data)
            return response.data;

    }
)

// Slice
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        }),
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
        })
    }
})

export default postsSlice.reducer;