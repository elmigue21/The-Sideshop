import { usePage } from "@inertiajs/react";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import {Item} from '../../Components/assets/types'
import Header from "../../Components/Header/Header";
import { Divider, Rating } from "@mui/material";
import test from "../Auth/Login";
import { PageProps, Item, User } from "@/types";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

import ItemCounter from "../../Components/Components/ItemCounter";
// interface PageProps {
//     id: number;
// }
interface ItemPageProps extends PageProps {
    item: Item;
    id: number;
}



const ItemPage: React.FC<ItemPageProps> = ({ id, auth }) => {
    // const {props} = usePage<{id:number}>();
    // const {id} = props;
    const [seller, setSeller] = React.useState<User | null>();
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    const [item, setItem] = useState<Item>();
    const [value, setValue] = React.useState<number | null>(2);

    const [itemQuantity,setItemQuantity] = useState(1);

    const addToCart = (item?: Item) => {
        if (item) {
            console.log("item quantity is");
            console.log(itemQuantity);
            axios
                .post("/item", {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    created_at: item.created_at,
                    image_link: item.image_link,
                    seller: item.seller,
                    quantity: itemQuantity,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        // Fetch items from Laravel API
        axios
            .get<Item>("/item/" + id)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the items!", error);
            });
    }, []);

    useEffect(() => {
        console.log("ITEM CHANGED");
        axios
            .get<User>("/user/" + item?.seller)
            .then((response) => {
                console.log('logging seller');
                console.log(response.data);
                setSeller(response.data);
            })
            .catch((error) => {
                console.error("error fetching seller", error);
            });
    }, [item]);

    // const quantityChanged = (val:number) =>{
    //     console.log(val);
    // }

    const testCart = (item?:Item) =>{
        if(item){
            axios.post("/logcart", {
                
                id: item.id,
                title: item.title,
                price: item.price,
                created_at: item.created_at,
                image_link: item.image_link,
                seller: item.seller,
                quantity: itemQuantity,
                user_id:1,
                
            });
        }
    }

    return (
        <>
            {" "}
            <Header user={auth.user} />
            <div className="flex flex-col items-center">
                <div className="">
                    <div className="bg-stone-400 rounded h-[1000px] p-5 m-5 grid grid-cols-2">
                        <div className="overflow-hidden w-full h-full bg-transparent inline-block relative">
                            <img
                                src={item?.image_link}
                                alt=""
                                className="w-full p-3"
                            />
                            <Divider />
                            <div className="m-5">
                                <button className="inline-flex items-center mx-3 p-2 rounded hover:bg-stone-200 hover:text-black">
                                    <ThumbUpOffAltIcon />
                                    Like
                                </button>
                                <button className="inline-flex items-center mx-3 p-2 rounded hover:bg-stone-200 hover:text-black">
                                    <ShareOutlinedIcon />
                                    Share
                                </button>
                                <button className="inline-flex items-center mx-3 p-2 rounded hover:bg-stone-200 hover:text-black">
                                    <BookmarkBorderOutlinedIcon />
                                    Save
                                </button>
                                <div className="flex flex-col absolute right-0">
                                    <ItemCounter quantity={1} itemQuantityChanged={(value) => setItemQuantity(value)} className=""/>
                                    <button
                                        className="bg-stone-500 px-5 py-3 my-5 rounded"
                                        onClick={() => testCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-transparent p-5 h-full">
                            <h1 className="text-3xl font-boldtext pb-5">
                                {item?.title}
                            </h1>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Divider />
                            <p className="p-5 text-2xl text-green-200 text-bold drop-shadow-md bg-cyan-950 rounded my-5">
                                &#8369; {item?.price}
                            </p>
                        </div>
                    </div>
                    <div className="bg-stone-400 rounded m-5 p-10 h-[200px] flex flex-row items-center relative">
                        <h1 className="absolute left-0 top-0 m-3 text-2xl font-bold text-white">
                            Seller:
                        </h1>
                        <div className="w-[100px] h-[100px] bg-red-500 rounded-full mx-5"></div>
                        <span className="">{seller?.name}</span>
                    </div>
                    <div className="bg-stone-400 rounded m-5 h-[500px] relative">
                        <h1 className="absolute left-0 top-0 m-3 text-2xl font-bold text-white">
                            Product Details:
                        </h1>
                    </div>
                    <div className="bg-stone-400 rounded m-5 h-[500px] relative">
                        <h1 className="absolute left-0 top-0 m-3 text-2xl font-bold text-white">
                            Comments:
                        </h1>
                    </div>
                </div>
                <div className="hidden sm:flex sm:items-center sm:ms-6">
                    <div className="ms-3 relative"></div>
                </div>
            </div>
        </>
    );
};

export default ItemPage;
