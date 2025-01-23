import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Function for handling the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('User registered successfully');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });

                // Redirect to login page after successful registration
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(data.message || 'Error registering user');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Server error. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex items-center justify-center h-screen bg-[#F6F4F9]">
                <div className="bg-white w-1/2 h-3/4 flex items-center justify-center mb-48">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                            required
                        />
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-3/4 p-2 rounded-lg bg-[#D9D9D9] text-center placeholder-black"
                            required
                        />
                        <button
                            type="submit"
                            className="mt-6 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
