import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    // Function to handle the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetching the data from the database
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful! Redirecting...');
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                toast.error(data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Server error. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex items-center justify-center h-screen bg-[#F6F4F9]">
                <div className="bg-white w-1/2 h-1/2 flex items-center justify-center mb-48">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-6 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
