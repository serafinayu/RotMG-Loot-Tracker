import React, { useContext, useEffect } from 'react'
import { ItemContext } from '../context/ItemContext'

const ItemGrid = () => {

  const {
    category, subCategory, tieredItems, utItems, stItems, shinyItems, 
    applyFilter, selectedItem, setSelectedItem, selectedCollection, selectedCollectionId,
    updateCollections
  } = useContext(ItemContext);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, applyFilter, selectedCollection]);

  const renderItems = (itemsArray, groupName) => {
    return (
      <div>
        <div className="bg-[#1A1A1A] text-white w-full text-center p-1.5 mb-2 rounded-md select-none">{groupName}</div>
          <div className="flex flex-row flex-wrap gap-2 px-5 mt-4 mb-8">
            {itemsArray.map(([itemId, item], index) => (

              <div 
                key={index} 
                onClick={() => setSelectedItem(itemId)} 
                className="relative cursor-pointer hover:scale-105 duration-100 select-none"
              >
                <img 
                  src={item.imgUrl} 
                  className={`w-13  ${
                    selectedItem === itemId
                      ? 'border-4 border-white-400 scale-110' 
                      : 'border border-white hover:border-2 hover:border-gray-300'
                  }`}
                />

                <p className="absolute right-1 bottom-[0.5px] text-white font-bold text-shadow-outline"
                  style={{
                    textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 1px 0 #000, 1px 0 0 #000, 0 -1px 0 #000, -1px 0 0 #000'
                  }}>
                  {/* Check to see if the obtained list ids match the current  */}                    
                  {
                    // console.log(selectedCollection)
                    selectedCollection?.obtained && Object.prototype.hasOwnProperty.call(selectedCollection.obtained, itemId) 
                      ? selectedCollection.obtained[itemId].quantity 
                      : "0"
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
    );
  };

  return (
    <div className="item-grid-scrollbar my-5 px-3 h-[70vh]">
      <div className="">
        {/* Tiered Items */}
        {tieredItems.length > 0 && renderItems(tieredItems, "Tiered Items")}
        
        {/* UT Items */}
        {utItems.length > 0 && renderItems(utItems, "UT Items")}
        
        {/* ST Items */}
        {stItems.length > 0 && renderItems(stItems, "ST Items")}
        
        {/* Shiny Items */}
        {shinyItems.length > 0 && renderItems(shinyItems, "Shinies")}
      </div>
    </div>
  )
}

export default ItemGrid
