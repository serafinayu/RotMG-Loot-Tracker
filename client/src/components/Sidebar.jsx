import React, { useContext, useState }  from 'react'
import ItemCard from './ItemCard'
import { ItemContext } from '../context/ItemContext'

const Sidebar = () => {

    const {collections, selectedCollectionId, selectedCollection, updateCollections} = useContext(ItemContext);
    const [showCollections, setShowCollections] = useState(false);

  return (
    <div className="bg-[#1A1A1A] h-full sm:rounded-sm flex flex-col justify-between">

        {/* List of Collections */}
        <div className={`${showCollections ? 'flex flex-col mt-4' : 'hidden'}`}>
            <div className="flex flex-row justify-between text-2xl pt-3 pb-6 px-5">
                <i onClick={() => setShowCollections(!showCollections)} className="bi bi-arrow-left-square cursor-pointer hover:scale-110 duration-200"></i>
                <i className="bi bi-plus-circle cursor-pointer hover:scale-110 duration-200"></i>
            </div>

            <div className='flex flex-col gap-4'>
                {Object.entries(collections).map(([collectionId, collection]) => (
                    <div 
                        onClick={() => updateCollections(collectionId)}
                        key={collectionId} 
                        className={`${collectionId === selectedCollectionId ? `bg-white text-black` : 'bg-[#111111]'} flex flex-row text-md justify-between px-6 py-3 mx-5 rounded-3xl cursor-pointer hover:bg-white hover:text-black transition-colors duration-400`}>
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
        <div className={`${!showCollections ? 'flex flex-col items-center' : 'hidden'}`}>
            <div className="flex items-center justify-center px-3 py-8 gap-5">
                <i onClick={() => setShowCollections(!showCollections)} className="bi bi-arrow-left-right text-xl cursor-pointer hover:scale-110 duration-200"></i>
                <div>
                    <h2 className="text-2xl text-center">{selectedCollection?.name || 'No Collection'}</h2>
                    <hr className="bg-white mt-2" />
                </div>
                <i className="bi bi-pencil-square cursor-pointer text-xl hover:scale-110 duration-200 text-md"></i>
            </div>

            <div className="sm:flex sm:flex-col gap-3 items-center w-[80%]">
                <p className="cursor-pointer py-3 text-center text-sm bg-[#111111] hover:bg-black duration-200 text-white px-4 py-2 rounded-xl w-full"><i className="bi bi-download pr-3"></i> Download IMG</p>
                <p className="cursor-pointer py-3 text-center text-sm bg-[#111111] hover:bg-black duration-200 text-white px-4 py-2 rounded-xl w-full"><i className="bi bi-trash-fill pr-3"></i>  Delete List</p>
            </div>

        </div>

        {/* Bottom Half of Side Bar with Item Card */}
        <ItemCard/>
    </div>
  )
}

export default Sidebar
