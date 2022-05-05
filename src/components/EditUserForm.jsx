import React from "react";
import { useForm } from 'react-hook-form';

const EditUserForm = (props) => {

    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: props.currentUser
    });

    setValue('name', props.currentUser.name);
    setValue('username', props.currentUser.username);

    const onSubmit = (data, e) => {
        data.id = props.currentUser.id
        props.updateUser(props.currentUser.id, data)

        // limpiar datos
        e.target.reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name</label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && errors.name.type === "required" && <span >Name is required</span>}


            <label htmlFor="username">Username</label>
            <input type="text" {...register("username", { required: true })}
                className="form-control mb-2"
            />
            {errors.username && errors.username.type === "required" && <span >Username is required</span>}
            <button>Edit new user</button>
        </form>
    );
}

export default EditUserForm;