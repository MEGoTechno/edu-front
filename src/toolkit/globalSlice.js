import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../hooks/cookies";


const getMode = () => {
    let mode = localStorage.getItem("mode")
    if (mode) {
        if (mode === "light") {
            return mode
        } else {
            mode = "dark"
            return mode
        }
    } else {
        mode = "dark"
    }
    return mode
}

const initialState = {
    mode: getMode(),
    globalMsg: null,
    user: getCookie('u') ? getCookie('u') : null
}

const globalSlice = createSlice({
    name: 'global', initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
            localStorage.setItem("mode", state.mode)
            return state
        },
        setGlobalMsg: (state, action) => {
            state.globalMsg = action.payload // isTrue , msg
            return state;
        },
        setUser: (state, action) => {
            setCookie('u', action.payload)
            state.user = action.payload // isTrue , msg
            return state;
        }
    }
})

export const { setMode, setGlobalMsg, setUser } = globalSlice.actions
export default globalSlice.reducer