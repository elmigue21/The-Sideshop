import React from "react";
import Logo from "../assets/Logo300.png";
import { Divider } from "@mui/material";
import Socks from "../assets/socks.jpg";
import { Item } from "@/types";
import { Link } from "@inertiajs/react";
import LoadingSpinner from '../Components/LoadingSpinner'
// interface CatalogItemProps {
//     item: {
//         id: number;
//         title: string;
//         price: number;
//         imageLink: string;
//     };
// }

const CatalogItem: React.FC<{ item: Item }> = ({ item }) => {
    return (
        <Link href={`/item/${item.id}`}>
            <div
                className="w-[150px] bg-cyan-800 m-3 p-1 shadow border-2
         border-transparent hover:border-white
         hover:shadow-2xl 
         "
            >
                <img src={item.image_link} alt="ITEM" className="w-full h-[110px]" />
                <Divider />
                <h1
                    className="text-white bg-cyan-800 w-full text-left my-2
            overflow-hidden h-[100px]"
                >
                    {item.title}
                </h1>
                <p className="text-green-200 bg-cyan-800 w-full">
                    {" "}
                    &#8369; {item.price}
                </p>
            </div>
        </Link>
    );
};

export default CatalogItem;
