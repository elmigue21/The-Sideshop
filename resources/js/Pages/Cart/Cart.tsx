import React, { useState, useEffect } from "react";
import { PageProps, User ,cartBoolItem} from "@/types";
import axios from "axios";
import { Item } from "@/types";
import Header from "@/Components/Header/Header";
import CartCard from "./CartCard";


const Cart = ({ auth }: PageProps) => {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    const [cartItems, setCartItems] = useState<cartBoolItem[]>();
    const [totalValue, setTotalValue] = useState(0);
    useEffect(() => {
        axios
            .get("/cart")
            .then((response) => {
                const boolItems: cartBoolItem[] = response.data.map(
                    
                    (item: cartBoolItem) => ({
                        ...item,
                        checked: false, 
                    })
                );
                // setCartItems(response.data);
                console.log('logging response');
                console.log(response.data);
                setCartItems(boolItems);
            })
            .catch((e) => {
                console.error("error fetching cart", e);
            });
    }, []);

    const getCheckboxStatus = (value:boolean,index:number) =>{
        // Copy the current state array
        const updatedItems = [...(cartItems ?? [])];

        // Update the value at the specific index
        updatedItems[index].checked = value;
        // console.log(value, index);
        // Set the new state
        setCartItems(updatedItems);
        updateTotal();
        // console.log(cartItems??[0].checked)
    }
    const updateTotal = () =>{
        var total :number = 0;

       for (let i = 0; i < (cartItems?.length ?? 0); i++) {
            if(cartItems?.[i]?.checked){
                total += cartItems?.[i]?.price;
            }
       }
       setTotalValue(total);

    }

    return (
        <div>
            <Header user={auth.user} />

            <div className="flex justify-center">
                <div className="bg-slate-400 w-4/5 flex flex-col items-center rounded-xl m-5 p-5">
                    <h1 className="text-2xl font-bold float text-teal-700 w-full">
                        YOUR CART
                    </h1>
                    {cartItems?.map((item, index) => (
                        <CartCard
                            className="bg-blue-500 m-3 w-4/5 h-[200px] flex items-center rounded"
                            item={item}
                            key={index}
                            itemIndex={index}
                            sendCheckboxStatus={getCheckboxStatus}
                        >
                            {/* <img
                                src={item.imageLink}
                                alt={item.title}
                                className="h-4/5 m-5"
                            />
                            <div className="h-full pt-10">
                                <h1 className="">{item.title}</h1>
                            </div> */}
                        </CartCard>
                    ))}
                    <div className="w-full h-[200px] my-10 rounded p-5 bg-red-500">
                        <button
                            className="bg-white text-blue-500 rounded p-5"
                            onClick={updateTotal}
                        >
                            CHECK
                        </button>
                        <h1 className="w-full text-right px-20 text-3xl">
                            &#8369;{totalValue}
                        </h1>
                    </div>
                </div>
            </div>
            {/* <footer className="fixed bottom-0 w-full bg-blue-500 h-[200px]">
qwe
            </footer> */}
        </div>
    );
};

export default Cart;
