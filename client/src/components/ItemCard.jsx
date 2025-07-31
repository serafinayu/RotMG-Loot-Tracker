import React, { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const ItemCard = () => {
  const { selectedItem, updateQuantity, items, showCollections } =
    useContext(ItemContext);

  return (
    selectedItem &&
    !showCollections && (
      <div
        className={`w-screen box-border m-0 bg-[#111111] md:w-auto md:static flex flex-row md:flex-col md:mx-4 rounded-lg bg-[#2D2D2D] items-center justify-center gap-4 p-3`}
      >
        <h3 className="hidden md:block bg-[#111111] w-[98%] h-auto rounded-lg text-center p-2">
          {items[selectedItem].name}
        </h3>
        <img
          src={items[selectedItem].imgUrl}
          className="w-25 border-white border-5 rounded-md"
          alt={items[selectedItem].name}
        />
        <div className="">
          <h3 className="md:hidden bg-[#111111] w-[98%] h-auto rounded-lg text-center px-2 pb-3">
            {items[selectedItem].name}
          </h3>
          <div className="bg-white text-black p-1 md:p-2 flex flex-row justify-center rounded-xl items-center gap-5 text-2xl font-bold">
            <p>
              <i className="bi bi-dash "></i>
            </p>
            <input
              type="number"
              placeholder="0"
              // value={selectedItem.quantity}
              onChange={(e) =>
                updateQuantity(items[selectedItem], e.target.value)
              }
              className="w-12 text-center bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <p>
              <i className="bi bi-plus"></i>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default ItemCard;
