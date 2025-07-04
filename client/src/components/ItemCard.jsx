import React, {useContext} from 'react'
import { ItemContext } from '../context/ItemContext'

const ItemCard = () => {

  const { selectedItem, updateQuantity, items } = useContext(ItemContext);

  return ( selectedItem &&
    <div className={` sm:flex sm:flex-col sm:m-4 sm:rounded-lg sm:bg-[#2D2D2D] items-center align-center gap-8 p-3`}>
      <h3 className="bg-[#111111] w-[98%] h-auto rounded-lg text-center p-2">{items[selectedItem].name}</h3>
      <img src={items[selectedItem].imgUrl} className="w-30 border-white border-5 rounded-md" alt={items[selectedItem].name} />
      <div className="bg-white text-black p-2 flex flex-row justify-center rounded-xl items-center gap-5 text-2xl font-bold">
        <p><i className="bi bi-dash "></i></p>
        <input 
          type="number" 
          placeholder="0" 
          // value={selectedItem.quantity}
          onChange={(e) => updateQuantity(items[selectedItem], e.target.value)}
          className="w-12 text-center bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
        <p><i className="bi bi-plus"></i></p>
      </div>
    </div>
  )
}

export default ItemCard
