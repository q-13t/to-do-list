import { useNavigate } from 'react-router-dom';
import { useState } from "react";


async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");// convert byte array to single string
    return hashHex;
}

const Login = () => {
    const navigate = useNavigate();
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [status, updateStatus] = useState(null);

    const handleHome = () => {
        navigate('/');
    }

    const handleLogin = () => {//Login function
        if (username === '' || password === '') {// Check if username and password fields are not empty
            updateStatus("Please enter username and password");
            return;
        }
        console.log("Username:", username);
        console.log("Password:", password);

        digestMessage(password).then((sha) => {// Proceed after obtaining SHA256 password
            fetch("http://localhost:8000/users?username=" + username)
                .then(data => {
                    if (!data.ok) {// If there is an error in fetch
                        throw Error("Fetch Error");
                    }
                    return data.json();
                }).then(json => {
                    console.log(json);
                    if (json.length === 0) {// If there's no user
                        throw Error("User not registered");
                    } else if (json[0].password !== sha) { // check password
                        throw Error("Incorrect Password");
                    }// Rest is ok
                    sessionStorage.setItem("username", username);
                    navigate('/todo');
                    updateStatus(null);// Clear error message
                }).catch(err => {
                    updateStatus(err.message);
                })
            console.log(sha);
        });
    }

    const handleRegister = () => {
        digestMessage(password).then((password) => {
            const userData = { username, password };
            fetch('http://localhost:8000/users',
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(userData)
                }
            ).then(() => {
                sessionStorage.setItem("username", username);
                navigate('/todo');
            });
        });
    }
    return (
        <div className="login-page">
            <button onClick={() => { handleHome() }}>X</button>
            <input type="text" placeholder="username" maxLength={64}
                value={username}
                onChange={(e) => updateUsername(e.target.value)}
            ></input>
            <input
                type="password" placeholder="password" maxLength={64}
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
            ></input>
            <button onClick={() => { handleLogin() }}>Login</button>
            <label>or</label>
            <button onClick={() => { handleRegister() }}>Register</button>
            {status && <label className='login-error'>{status}</label>}
        </div>
    );
}

export default Login;