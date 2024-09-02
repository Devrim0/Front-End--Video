import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const UserAuth = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const registerUrl = 'http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/auth/signup';
        const registerBody = JSON.stringify({ 
            id: null,
            role: false,
            firstName, 
            lastName, 
            email, 
            userName, 
            password, 
            birthday,
            refreshToken: null
        });

        try {
            const registerResponse = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: registerBody
            });

            if (registerResponse.ok) {
                alert('Registration successful. You can now login.');
                setIsLogin(true);
            } else {
                const errorData = await registerResponse.json();
                console.error('Registration failed', errorData);
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginUrl = 'http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/auth/signin';
        const loginBody = JSON.stringify({ 
            email, 
            password,
            userName
        });

        try {
            const loginResponse = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: loginBody
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                alert('Login successful');
                localStorage.setItem('username', loginData.userName);  // Username'i sakla
                localStorage.setItem('token', loginData.token); // Token'ı sakla
                navigate('/');
            } else {
                const errorData = await loginResponse.json();
                console.error('Login failed', errorData);
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                            />
                            <input
                                type="date"
                                placeholder="Birthday"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <button
                    className="mt-4 text-blue-500 hover:underline dark:text-blue-400"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </button>
                <button
                    className="mt-4 text-green-500 hover:underline dark:text-green-400"
                    onClick={() => navigate('/')}
                >
                    Continue without login
                </button>
            </div>
        </div>
    );
};

export default UserAuth;
