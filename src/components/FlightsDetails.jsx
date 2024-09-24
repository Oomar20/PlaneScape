const FlightsDetails = (flights) => {

    return (
        <>
            <div className='flex flex-col items-center h-full gap-4 mt-10  mr-10 ml-10'>
                <div className="">
                    <div className='bg-white rounded-lg w-full flex-1 flex p-10'>
                        <div className='flex justify-self-start self-strech bg-white rounded-lg w-32 h-full '>
                            <div className='rounded-full ml-10 mt-4 w-20 h-20'>
                                <img src="/assets/delta_logo.png" alt="" className='object-contain w-full h-full rounded-full' />
                            </div>
                        </div>
                        <div className='flex flex-col ml-8 w-80'>
                            <div className='flex bg-white rounded-lg mt-3 pl-3 h-16'>
                                <div className='content-center text-3xl'>{flights.flight.scheduleTime.slice(0, -3)} AM - {flights.flight.estimatedLandingTime} </div>
                            </div>
                            <div className='bg-white rounded-lg text-lg font-bold mt-2 pl-3 w-36 h-8'>Delta Airlines</div>
                            <div className='bg-white rounded-lg text-sky-500 text-lg mt-2 pl-3 w-36 h-8 '>Flight Details</div>
                        </div>
                        <div className='flex flex-col ml-10 mt-20 gap-2'>
                            <div className='bg-white rounded-lg content-center font-bold pl-3 w-32 h-8'>Nonstop</div>
                            <div className='bg-white rounded-lg text-gray-400 content-center pl-3 w-32 h-8'>1h 32m</div>
                        </div>
                        <div className='flex flex-col ml-10 mt-20 gap-2'>
                            <div className='bg-white rounded-lg content-center font-bold pl-3 w-32 h-8'>{flights.flight.departureAirport} to {flights.flight.arrivalAirport}</div>
                            <div className='bg-white rounded-lg text-gray-400 content-center pl-3 w-32 h-8'>Flight number {flights.flight.flightNumber}</div>
                        </div>
                        <div className='flex flex-row justify-around gap-5 ml-64 mt-3'>
                            <div className='flex flex-col justify-around bg-white border border-gray-300 shadow-sm rounded-lg w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$156</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Main</div>
                            </div>
                            <div className='flex flex-col justify-around bg-white border border-gray-300 shadow-sm rounded-lg w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$204</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Comfort+</div>
                            </div>
                            <div className='flex flex-col justify-around bg-gray-300  rounded-lg w-32 h-36'></div>
                            <div className='flex flex-col justify-around bg-white rounded-lg border border-gray-300 shadow-sm w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$386</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Delta One</div>
                            </div>
                            <div className='flex flex-col justify-around bg-gray-300 rounded-lg w-32 h-36'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlightsDetails