import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import './adminAddNew.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import AddColumn from '../../../components/add-column/AddColumn';
import InputPassword from '../../../components/input-password/InputPassword';
import { useEffect } from 'react';
import InputEmail from '../../../components/input-email/InputEmail';
import InputNormal from '../../../components/input-normal/InputNormal';

const AdminAddNew = () => {
    const token = useSelector(state => state.auth.tokenId);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);

    const [lastName, setLastName] = useState("");
    const [isLastNameValid, setIsLastNameValid] = useState(false);

    const [miriId, setMiriId] = useState("");
    const [isMiriIdValid, setIsMiriIdValid] = useState(false);

    const [perthId, setPerthId] = useState("");
    const [isPerthIdValid, setIsPerthIdValid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (isPasswordValid && isEmailValid && isFirstNameValid && isLastNameValid && isMiriIdValid && isPerthIdValid) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [isPasswordValid, isEmailValid, isFirstNameValid, isLastNameValid, isMiriIdValid, isPerthIdValid]);

    const submitHandler = (event) => {
        event.preventDefault();

        const jsonObject = {
            "first_name": firstName,
            "last_name": lastName,
            "miri_id": miriId,
            "perth_id": perthId,
            "email": email,
            "password": password,
            // default isSuperAdmin is set to false
            "isSuperAdmin": false,
        };

        fetch('http://127.0.0.1:8000/api/createAdmin', {
            method: 'POST',
            body: JSON.stringify(jsonObject),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    (navigate('/'));
                    return response.json();
                }
                return Promise.reject(response);
            })
            .catch(response => {
                response.json().then(json => alert(json.message));
            });

        // fetch(`https://foes-3edf9-default-rtdb.asia-southeast1.firebasedatabase.app/database/${viewCollection}.json`, {
        //   method: 'POST',
        //   body: JSON.stringify(newObj)
        // })
        // navigate('/');
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="title">
                    <p>Admin</p>
                </div>
                <div className="bottom">
                    <form onSubmit={submitHandler}>

                        <InputNormal value={firstName} setHandler={setFirstName} label="First Name" isValid={isFirstNameValid} setIsValid={setIsFirstNameValid} />

                        <InputNormal value={lastName} setHandler={setLastName} label="Last Name" isValid={isLastNameValid} setIsValid={setIsLastNameValid} />

                        <InputNormal value={miriId} setHandler={setMiriId} label="Miri ID" isValid={isMiriIdValid} setIsValid={setIsMiriIdValid} />

                        <InputNormal value={perthId} setHandler={setPerthId} label="Perth ID" isValid={isPerthIdValid} setIsValid={setIsPerthIdValid} />

                        <InputEmail value={email} setHandler={setEmail} label="Email Address (eg. example@email.com)" isValid={isEmailValid} setIsValid={setIsEmailValid} />

                        <InputPassword value={password} setHandler={setPassword} label="Password (Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 symbol and 1 numeric charcter)" isValid={isPasswordValid} setIsValid={setIsPasswordValid} />

                        {/* <Button type='submit'>Send</Button> */}
                        <Button disabled={!isFormValid} type='submit'>Send</Button>
                        {/* <Button type='submit' disabled="true">Send</Button> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddNew;
