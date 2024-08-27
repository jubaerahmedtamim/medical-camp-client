import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { FaLocationDot } from 'react-icons/fa6';

const CampCard = ({ camp }) => {
    const { campName, image_url, details, location, _id } = camp;
    return (
        <div>
            <Card className="w-full max-w-[48rem] flex-row gap-4">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                    <img
                        src={image_url}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" color="gray" className="mb-4 uppercase">
                        {campName}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">

                        <div className='flex gap-2 items-center'>
                            <FaLocationDot></FaLocationDot> {location}
                        </div>
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                        {details}
                    </Typography>
                    <a href="#" className="inline-block">
                        <Button variant="text" className="flex items-center gap-2">
                            Details
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </Button>
                    </a>
                </CardBody>
            </Card>
        </div>
    );
};

export default CampCard;
