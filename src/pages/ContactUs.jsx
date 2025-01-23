import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const ContactUs = () => {

    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        // Clean up and re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the page from being refreshed upon pressing the submit button
        toast.success('A mail has been sent to your email');
    };

    return (
        <>
            <div style={{ backgroundColor: '#f6f4f9' }}>
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="p-8 mb-32 rounded shadow-lg bg-white">
                        <h1 className="text-xl font-bold mb-4">How about receiving the latest discounts?</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                {/* footer */}
                <div className="absolute bottom-0 w-full bg-gray-300 p-4 text-center">
                    <p>If you need any help, you can contact us via xyz@gmail.com</p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ContactUs;
