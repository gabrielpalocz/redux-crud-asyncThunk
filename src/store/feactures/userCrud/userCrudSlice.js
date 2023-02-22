import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Initial state of the slice 
 */
const initialState = {
    data: [],
    status: 'idle',
    error: null,
}

/**
 * Redux AsyncThunk to call to get users from the server
 */
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await fetch(
        'http://localhost:9000/users'
    )   
    if (response.ok) {
        const data = await response.json();
        return data
    }
})

/**
 * Redux AsyncThunk to call to add new users sending the data to the server
 */
export const addNewUser = createAsyncThunk('users/addNewUser', async (UserToAdd) => {
    const response = await fetch('http://localhost:9000/users', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(UserToAdd)
    })
    const data = await response.json();
    return data
}
)

/**
 * Redux AsyncThunk to call to edit a user sending the id and the data to the server
 */
export const editUser = createAsyncThunk('users/editUser', async (userToEdit) => {
    console.log(userToEdit.id)
    const response = await fetch(`http://localhost:9000/users/${userToEdit.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userToEdit)
    })
    const data = await response.json();
    return data
}
)

/**
 * Redux AsyncThunk to call to delete a user sending the id to the server
 */
export const deleteUser = createAsyncThunk('users/deleteUser', async (userToDelete) => {
    console.log(userToDelete.id)
    const response = await fetch(`http://localhost:9000/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
    })
    const data = await response.json();
    return data
}
)

/**
 * Redux Slice to work with the CRUD data
 */
export const userCrudSlice = createSlice({
    name: 'userCrud',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.status = 'loading'
                if (state.error != null) state.error = null 
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched data to the array
                state.data = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewUser.pending, (state, action) => {
                state.status = 'loading'
                if (state.error != null) state.error = null 
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'succeeded'
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(editUser.pending, (state, action) => {
                state.status = 'loading'
                if (state.error != null) state.error = null 
            })
            .addCase(editUser.fulfilled, (state, action) => {
                const { id, nombre } = action.payload;
                const existingUser = state.data.find((user) => user.id === id);
                if (existingUser) {
                    existingUser.nombre = nombre;
                    state.status = 'succeeded'
                }
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.status = 'loading'
                if (state.error != null) state.error = null 
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const existingUser = state.data.find((user) => user.id === action.payload.id);
                if (existingUser) {
                    state.data.splice(state.data.indexOf(existingUser), 1);
                    state.status = 'succeeded'
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },

})

// Action creators are generated for each case reducer function
export const { getUser } = userCrudSlice.actions

export default userCrudSlice.reducer
