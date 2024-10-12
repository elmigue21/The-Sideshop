import React from 'react'
import CatalogItem from './CatalogItem'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Item } from "@/types";

// interface Item {
//     id: number;
//     title: string;
//     price: number;
//     imageLink: string;
// }
// interface Item{
//     item:Item
// }
import { User } from '@/types';
interface CatalogProps{
    className?:string
    itemsProp?:Item[]
}


const Catalog:React.FC<CatalogProps> = ({className, itemsProp}) => {
 const [items, setItems] = useState<Item[]>([]);

     axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    useEffect(() => {
        // Fetch items only if itemsProp is not provided
        if (!itemsProp) {
            axios
                .get<Item[]>("/items")
                .then((response) => {
                    setItems(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(
                        "There was an error fetching the items!",
                        error
                    );
                });
        } else {
            // Use itemsProp if provided
            setItems(itemsProp);
        }
    }, [itemsProp]);
    return (
        <div className={className}>
            <h1 className="text-2xl font-bold">CATALOG</h1>
            <div className="flex flex-wrap gap-2 justify-center">
                {items.map((item,index) => (
                    <CatalogItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Catalog
