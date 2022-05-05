import React, { useState } from "react";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData"))

    const updateLocalStorage = (array) => {
        localStorage.setItem("usersData", JSON.stringify(array));
    }

    // state
    const [users, setUsers] = useState(usersData);

    // Agregar usuarios
    const addUser = (user) => {
        user.id = uuidv4()
        setUsers([
            ...users,
            user
        ])

        usersData.push(user)
        updateLocalStorage(usersData)
    }

    // Eliminar usuarios
    const deleteUser = (id) => {
        const arrayFiltrado = users.filter((user) => user.id !== id);
        setUsers(arrayFiltrado);

        updateLocalStorage(arrayFiltrado)
    }

    // Editar usuarios
    const [editing, setEditing] = useState(false);
    const initialFormState = { id: null, name: '', username: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState)

    const editRow = (user) => {
        setEditing(true)

        setCurrentUser({
            id: user.id, name: user.name, username: user.username
        })
    }

    const updateUser = (id, updateUser) => {
        setEditing(false);
        const arrayEdited = users.map(user => (user.id === id ? updateUser : user))
        setUsers(arrayEdited)
        updateLocalStorage(arrayEdited)
    }

    return (
        <div className="container">
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">

                    {
                        editing ? (
                            <div>
                                <h2>Edit user</h2>
                                <EditUserForm
                                    currentUser={currentUser}
                                    updateUser={updateUser} />
                            </div>
                        ) : (
                            <div>
                                <h2>Add user</h2>
                                <AddUserForm addUser={addUser} />
                            </div>
                        )
                    }

                </div>
                <div className="flex-large">
                    <h2>View users</h2>
                    <UserTable
                        users={users}
                        deleteUser={deleteUser}
                        editRow={editRow}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
