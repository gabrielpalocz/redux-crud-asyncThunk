import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, addNewUser, editUser, deleteUser } from '../store/feactures/userCrud/userCrudSlice'


/**
 * 
 * @returns the view with buttons to controlate the dispatch and make CRUD and see data, status, error
 */
export function UserCrud() {
    const { data, status, error } = useSelector(state => state.userCrud)
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const handleSubmitPost = (event) => {
        event.preventDefault();
        dispatch(addNewUser({ nombre: name }));
        event.target.reset();
    }

    const handleSubmitPut = (event) => {
        event.preventDefault();
        dispatch(editUser({ id: id, nombre: name }));
        event.target.reset();
    }


    const handleSubmitDelete = (event) => {
        event.preventDefault();
        dispatch(deleteUser({ id: id }));
        event.target.reset();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minWidth: "100%" }}>
            <div style={{ maxWidth: "30%" }}>
                <button
                    aria-label="Get value"
                    onClick={() => dispatch(getUsers())}
                >
                    Get
                </button>
                <hr />
                <form onSubmit={handleSubmitPost}>
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                        <button type="submit">Post</button>
                    </div>                  
                </form>
                <hr />
                <form onSubmit={handleSubmitPut}>
                    <div>
                        <label for="id">id:</label>
                        <input type="text" id="id" onChange={(e) => setId(e.target.value)} />
                        <label for="name">Name:</label>
                        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                        <button type="submit">Put</button>
                    </div>                   
                </form>
                <hr />
                <form onSubmit={handleSubmitDelete}>
                    <div>
                        <label for="id">Id:</label>
                        <input type="text" id="id" onChange={(e) => setId(e.target.value)} />
                        <button type="submit">Delete</button>
                    </div>                    
                </form>
                <hr />
                <div>
                    <div>DATA: {JSON.stringify(data)}</div>
                    <hr />
                    <div>STATUS: {JSON.stringify(status)}</div>
                    <div>ERROR: {JSON.stringify(error)}</div>
                </div>
            </div>
        </div>
    )
}