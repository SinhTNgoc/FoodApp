import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/actionType";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainerRef = useRef();
  let items = useRef([]);

  //Handle add to cart
  const [{ cartItems }, dispatch] = useStateValue();
  // const [items, setItems] = useState([]);

  // const addToCart = (clickedItem) => {
  //   setItems((prev) => {
  //     const isItemInCart = prev.find((item) => item.id === clickedItem.id);
  //     if (isItemInCart) {
  //       return prev.map((item) =>
  //         item.id === clickedItem.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...clickedItem, quantity: 1 }];
  //   });

  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: items,
  //   });
  // };

  // useEffect(() => {
  //   const dispatchCartItems = () => {

  //   };
  //   dispatchCartItems();
  // }, [items, dispatch]);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);

  const addToCart = (clickedItem) => {
    const checkItemInCart = cartItems.find(
      (item) => item.id === clickedItem.id
    );
    if (checkItemInCart) {
      items.current = cartItems.map((item) =>
        item.id === clickedItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else items.current = [...cartItems, { ...clickedItem, quantity: 1 }];

    localStorage.setItem("cartItems", JSON.stringify(items.current));

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items.current,
    });
  };

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  // }, []);

  //Handle click left & right slide show
  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      className={`w-full my-12 bg-rowBg flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden justify-center flex-wrap"
      }`}
      ref={rowContainerRef}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-full min-w-full md:w-340 md:min-w-[340px] h-[225px] my-12 bg-gray-200 rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-md flex flex-col justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-40 h-40  -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md "
                onClick={() => addToCart(item)}
              >
                <MdShoppingBasket className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col gap-1 items-end justify-end">
              <p className="text-base text-textColor ">{item?.title}</p>
              <p className="text-sm text-gray-500 ">{item?.calory} calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-gray-500 font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-fullflex flex-col items-center justify-center">
          <img
            src={NotFound}
            alt="notfound"
            className="w-full h-[320px] object-contain"
          />
          <p className="text-2xl text-textColor capitalize">
            Item is not available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
