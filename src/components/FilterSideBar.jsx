import React from 'react'

const FilterSideBar = () => {
    return (
        <div className="rounded-lg text-xl pr-16">
            {/* Sort by */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Sort by:</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option value="lowest-price">Lowest Price</option>
                    <option value="earliest-arrival">Earliest Arrival</option>
                    <option value="shortest-duration">Shortest Duration</option>
                </select>
            </div>

            {/* Arrival Time */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Arrival Time</label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="radio" name="arrival-time" value="morning" className="mr-2" />
                        5:00 AM - 11:59 AM
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="arrival-time" value="afternoon" className="mr-2" />
                        12:00 PM - 5:59 PM
                    </label>
                </div>
            </div>

            {/* Stops */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Stops</label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="radio" name="stops" value="nonstop" className="mr-2" />
                        Nonstop <span className="ml-auto">$230</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="stops" value="1stop" className="mr-2" />
                        1 Stop <span className="ml-auto">$230</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="stops" value="2plus-stops" className="mr-2" />
                        2+ Stops <span className="ml-auto">$230</span>
                    </label>
                </div>
            </div>

            {/* Airlines Included */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Airlines Included</label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="radio" name="airline" value="alitalia" className="mr-2" />
                        Alitalia <span className="ml-auto">$230</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="airline" value="lufthansa" className="mr-2" />
                        Lufthansa <span className="ml-auto">$230</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="airline" value="air-france" className="mr-2" />
                        Air France <span className="ml-auto">$230</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="airline" value="brussels-airlines" className="mr-2" />
                        Brussels Airlines <span className="ml-auto">$230</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterSideBar