import React, { useContext, useState } from "react";
import ItemCard from "./ItemCard";
import { ItemContext } from "../context/ItemContext";

const Sidebar = () => {
  const {
    collections,
    selectedItem,
    setSelectedItem,
    selectedCollectionId,
    selectedCollection,
    updateCollections,
    showCollections,
    setShowCollections,
  } = useContext(ItemContext);

  return (
    // Outer div
    <div className="bg-[#1A1A1A] h-full sm:rounded-sm flex py-2 md:py-5 flex-col justify-between">
      {/* List of Collections */}
      <div
        className={`${
          showCollections
            ? "absolute top-0 left-0 bottom-0 right-0 bg-black z-2 md:static md:bg-inherit flex flex-col"
            : "hidden"
        }`}
      >
        <div className="flex flex-row justify-between text-2xl px-5 pb-5">
          <i
            onClick={() => {
              setShowCollections(!showCollections);
              selectedItem && setSelectedItem("");
            }}
            className="bi bi-arrow-left-square cursor-pointer hover:scale-110 duration-200"
          ></i>
          <i className="bi bi-plus-circle cursor-pointer hover:scale-110 duration-200"></i>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(collections).map(([collectionId, collection]) => (
            <div
              onClick={() => {
                updateCollections(collectionId), setShowCollections(false);
              }}
              key={collectionId}
              className={`${
                collectionId === selectedCollectionId
                  ? `bg-white text-black`
                  : "bg-[#111111]"
              } flex flex-row text-md justify-between px-6 py-3 mx-5 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-400`}
            >
              {collection.name}
              {/* <div className='flex gap-4'>
                            <i className="bi bi-trash"></i>
                            <i className="bi bi-pencil-square"></i>
                        </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Top Half of Side Bar */}
      <div
        className={`${
          !showCollections
            ? "flex flex-row justify-center sm:flex-col items-center"
            : "hidden"
        }`}
      >
        <div className="flex items-center justify-center px-3 md:pb-8 gap-5">
          <i
            onClick={() => {
              setShowCollections(!showCollections),
                selectedItem && setSelectedItem("");
            }}
            className="bi bi-arrow-left-right text-xl cursor-pointer hover:scale-110 duration-200"
          ></i>
          <div>
            <h2 className="text-2xl text-center">
              {selectedCollection?.name || "No Collection"}
            </h2>
            <hr className="bg-white mt-2" />
          </div>
          <i className="bi bi-pencil-square cursor-pointer text-xl hover:scale-110 duration-200 text-md"></i>
        </div>

        <div className="hidden md:flex md:flex-col gap-3 items-center w-[80%]">
          <p className="block cursor-pointer py-3 text-center text-sm bg-[#111111] hover:bg-black duration-200 text-white px-4 py-2 rounded-xl w-full">
            <i className="bi bi-download pr-3"></i> Download IMG
          </p>
          <p className="block cursor-pointer py-3 text-center text-sm bg-[#111111] hover:bg-black duration-200 text-white px-4 py-2 rounded-xl w-full">
            <i className="bi bi-trash-fill pr-3"></i> Delete List
          </p>
        </div>
      </div>

      {/* Bottom Half of Side Bar with Item Card */}
      <div className="hidden md:block">
        <ItemCard />
      </div>
    </div>
  );
};

export default Sidebar;
