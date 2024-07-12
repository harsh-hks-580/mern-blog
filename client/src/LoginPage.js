import {useState} from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    function login(ev) {
        ev.preventDefault();
        const response = fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if( response.ok ){
            setRedirect(true);
        }else{
            alert('Wrong Credentials')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                   placeholder="username" 
                   value={username}
                   onChange={ev => setUserName(ev.target.value)}/>
            <input type="text" 
                   placeholder="password" 
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    )
}