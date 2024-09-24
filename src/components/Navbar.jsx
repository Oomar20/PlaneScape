import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className="border-b text-xl" style={{ backgroundColor: '#f6f4f9', borderColor: '#f6f4f9' }}>

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        {/* Logo */}
                        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4">
                            <span className="hidden md:block text-black text-2xl font-bold ml-2">
                                Plane Scape
                            </span>
                        </NavLink>
                        <div className="md:ml-auto">
                            <div className="flex space-x-7">
                                <NavLink to={location.pathname === '/myflights' ? '/home' : '/myflights'}>
                                    {location.pathname === '/myflights' ? 'Flight Booking' : 'My Flights'}
                                </NavLink>
                                <NavLink to="" >Deals</NavLink>
                                <NavLink to="">Discover</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar