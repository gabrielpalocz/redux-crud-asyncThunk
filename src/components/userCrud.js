import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, addNewUser, editUser, deleteUser } from '../store/feactures/userCrud/userCrudSlice'


/**
 * 
 * @returns the view with buttons to controlate the dispatch and make CRUD and see data, status, error
 */
export function UserCrud() {
    const { data, status, error } = useSelector(state => state.userCrud)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div>
            <div>
                <button
                    aria-label="Get value"
                    onClick={() => dispatch(getUsers())}
                >
                    Get
                </button>
                <button
                    aria-label="Post value"
                    onClick={() => dispatch(addNewUser({ nombre: 'gabriel' }))}
                >
                    Post
                </button>
                <button
                    aria-label="Put value"
                    onClick={() => dispatch(editUser({ id: '48',  nombre: 'gabriel' }))}
                >
                    Put
                </button>
                <button
                    aria-label="Delete value"
                    onClick={() => dispatch(deleteUser({ id: '49' }))}
                >
                    Delete
                </button>
                <div>
                    <div>DATA: {JSON.stringify(data)}</div>
                    <div>STATUS: {JSON.stringify(status)}</div>
                    <div>ERROR: {JSON.stringify(error)}</div>
                </div>
            </div>
        </div>
    )
}