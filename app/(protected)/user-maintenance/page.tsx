'use client'

import { useState } from "react";

export default function UserMaintenance () {
    
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        setFormData(prev => ({ ...prev , [e.target.name]: e.target.value}));
    }



    return (

        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold">User Maintenance</h1>
            <p className="mt-4 text-lg">
                This is a simple file maintenance for my bakasyon tayo.
            </p>


            <div>
                <div className="inputFieldSection">
                    <form action="submit">
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            placeholder="Please enter your Given Name" 
                            value={formData.firstName} 
                            onChange={handleChange}  
                            className="py-2 px-4 m-4 border rounded-sm" 
                        />

                        <input 
                            id="lastName" 
                            name="lastName"
                            type="text"
                            placeholder="Please enter your Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="py-2 px-4 m-4 border rounded-sm"
                        />

                        <input 
                            id="email" 
                            name="email"
                            type="email"
                            placeholder="Please enter your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="py-2 px-4 m-4 border rounded-sm"
                        />

                        <input 
                            id="phone" 
                            name="phone"
                            type="text"
                            placeholder="Please enter your Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="py-2 px-4 m-4 border rounded-sm"
                        />

                        <input 
                            id="address" 
                            name="address"
                            type="text"
                            placeholder="Please enter your Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="py-2 px-4 m-4 border rounded-sm"
                        />                                                                        

                    </form>


                </div>
                <div className="listViewSection">


                </div>
                <div className="buttonFieldSection">




                </div>



            </div>

        </main>

    );
}