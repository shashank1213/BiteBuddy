import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);  //The Object.keys() method returns an Array Iterator object with the keys of an object. Here key is option like 
  // half full regular medium and values are prices for that respective option

  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
  
  useEffect(()=>{
    setSize(priceRef.current.value);
  }, [])

  const handleCart = async () => {
    let flag=false;
    for(const item of data){
      if(item.id===props.foodItem._id && item.size===size){     // For same id there may be differnt sizes like half,full,etc
        flag=true;
        break;
      }
    }

    if(flag===true){
      await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice, qty:qty, size:size})
      return 
    }

    await dispatch({type: "ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size, img:props.foodItem.img}) 
  } 

  let finalPrice = qty*parseInt(options[size]);
 
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <br/>
              <div className="d-inline h-100 fs-5">
                Price - Rs.{finalPrice}
              </div>
            </div>
            <hr/>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
