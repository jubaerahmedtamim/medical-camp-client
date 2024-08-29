import React from 'react';

import { Card } from "flowbite-react";
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';

const OrganizerProfile = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    return (
        <div>
            <Card className="max-w-7xl mx-auto">

                <div className="flex flex-col items-center pb-10 mt-10">
                    <img
                        alt="Bonnie image"
                        height="300"
                        src={user?.photoURL}
                        width="300"
                        className="mb-3 rounded-full  border-2 shadow-lg"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{user?.displayName}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Gmail: {user?.email}</span>
                    {isAdmin=== true && <p>Role: Organizer</p> }
                    <div className="mt-4  space-x-3 lg:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                            Edit Profile
                        </a>

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OrganizerProfile;