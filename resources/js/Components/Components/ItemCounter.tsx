import React from 'react'
import { useState,useEffect } from 'react';


type ItemCounterProps = {
  quantity:number,
  className?:string,
  itemQuantityChanged:(value:number) => void;
}

const ItemCounter = (props:ItemCounterProps) => {

  const [itemCount, setItemCount] = useState(props.quantity);

  const add = () => {
    setItemCount(itemCount+1);
  };
  const sub = () => {
    if(itemCount>1){
      setItemCount(itemCount-1);
    }
  };

    useEffect(() => {
      props.itemQuantityChanged(itemCount)
        // setItemCount(props.quantity);
        // emit function and send value
    }, [itemCount]);

  return (
      <div className={`bg-white text-black border-2 border-black rounded inline-block ${props.className}`}>
          <button
              className="px-5 py-2 border-r border-black bg-stone-200 active:bg-stone-500"
              onClick={sub}
          >
              -
          </button>
          <span className="px-5 py-3">{itemCount}</span>
          <button
              className="px-5 py-2 border-l border-black bg-stone-200 active:bg-stone-500"
              onClick={add}
          >
              +
          </button>
      </div>
  );
}

export default ItemCounter
