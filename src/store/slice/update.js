import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    isUpdate: true
}

const update = createSlice({
    name: 'update',
    initialState,
    reducers: {
        updateStatus: (state, action) => {
            state.isUpdate = action.payload
        },
    },
})

export const { updateStatus } = update.actions

export default update.reducer