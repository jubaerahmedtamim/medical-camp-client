
import {  Card } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
    const { campName, image_url, details, location, _id } = camp;
    return (
        <div>
            <Card
                className="max-w-screen-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={image_url}
            >
                <div className="flex gap-2 items-center mt-2">
                    <FaLocationDot></FaLocationDot>
                    <p>{location}</p>
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {campName}
                </h5>
                <p className="font-normal text-gray-700 ">
                    {details}
                </p>
                <Link to={`/camp-details/${_id}`} className="m-2"><button className="btn">See Details</button></Link>
            </Card>
            
        </div>
    );
};

export default CampCard;
