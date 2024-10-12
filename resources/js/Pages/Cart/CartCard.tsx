import React from 'react'
import { Item ,cartBoolItem} from '@/types'
import Checkbox from '@/Components/Checkbox'
import { Button } from '@mui/material'
import ItemCounter from '@/Components/Components/ItemCounter'
import axios from 'axios'

interface CartCardProps{
    item:cartBoolItem,
    className?:string,
    itemIndex:number,
    sendCheckboxStatus:(value:boolean,index:number) => void,
}
// const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>,index:number) =>{ 
//     getCheckboxStatus(event,index);
// }



const CartCard:React.FC<CartCardProps> = ({item,className,itemIndex,sendCheckboxStatus}) => {


    const quantityChanged = (val: number) => {
        // axios.
        axios.post('/cartChanged',{
            id:item.id,
            value:val,
        })
        .then((response)=>{
            console.log('cart change data');
            console.log(response.data);
        })
        .catch((e)=>{
            console.error(e);
        })
    };

  return (
      <div className={`${className} overflow-hidden relative`}>
          <Checkbox className="hover:cursor-pointer m-5 font-2xl" onChange={(event)=>sendCheckboxStatus(event.target.checked,itemIndex)}/* {(event)=>handleCheckboxChange(event, itemIndex)}  *//>
          <img src={item.imageLink} alt={item.title} className="h-4/5 m-5" />
          <div className="h-full pt-10 flex-1">
              <h1 className="">{item.title}</h1>
              <p className="text-green-200">&#8369; {item.price}</p>
          </div>
          <ItemCounter quantity={item.quantity} itemQuantityChanged={(value)=>quantityChanged(value)}/>
          <div className="w-1/6 h-full flex items-center justify-center">
              <button className="bg-red-300 p-2 rounded hover:bg-red-200">
                  REMOVE
              </button>
          </div>
      </div>
  );
}

export default CartCard
