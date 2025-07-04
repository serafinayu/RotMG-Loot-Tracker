import React, {useContext, useState, useEffect} from 'react';
import {ItemContext} from '../context/ItemContext';
import _ from 'lodash';

const FilterBar = () => {

  const { categories, category, setCategory, 
    subCategory, setSubCategory, showObtained,
    setShowObtained, resetFilters, search, setSearch 
  } = useContext(ItemContext);

  const [subCategories, setSubCategories] = useState([]);


  const populateSubCategories = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    console.log("Selected category:", selectedCategory);
    setSubCategories(categories[selectedCategory]);
  }

  useEffect(()=> {

    if (subCategory && category) {
      setSubCategory("");
    }

  }, [category])

  return (
    <div className="flex flex-col sm:gap-3 lg:flex-row lg:justify-between">

      {/* Search Bar */}
      <div className="relative">
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-[#1A1A1A] rounded-full pl-10 py-2 max-w-[250px]" >
        </input>
        <i className="bi bi-search absolute left-4 top-2"></i>
      </div>

      <div className="flex gap-3 items-center pl-2">

        {/* Obtained Filter */}
        <div className="flex flex-row">
          <input 
            type="checkbox" 
            id="obtained" 
            checked={showObtained} 
            onChange={(e) => setShowObtained(e.target.checked)}
          />
          <label htmlFor="obtained" className="p-2 select-none">Obtained</label>
        </div>

        {/* Category Filter */}
        <select 
          value={category} 
          onChange={(e) => populateSubCategories(e)} 
          className="bg-[#1A1A1A] py-2 px-3 rounded-lg cursor-pointer"
        >
          <option value="" disabled defaultValue hidden>Category</option>
          {Object.keys(categories).map((c, index) => (
            <option value={c} key={index}>{_.startCase(c)}</option>
          ))}
        </select>

        {/* SubCategory Filter */}
        <select 
          value={subCategory} 
          disabled={!category} 
          onChange={(e) => setSubCategory(e.target.value)}
          className="bg-[#1A1A1A] py-2 px-3 rounded-lg disabled:text-[#4B4B4B] cursor-pointer disabled:cursor-not-allowed"
        >
          <option value="" disabled defaultValue hidden>Subcategory</option>
          {subCategories.map((sc, index) => (
            <option value={sc} key={index}>{_.startCase(sc)}</option>
          ))}
        </select>

        {/* Reset Filters Button */}
        <div 
          onClick={resetFilters} 
          className="bg-[#1A1A1A] py-2 px-3 rounded-lg cursor-pointer h-full hover:bg-[#141414] select-none" 
          title="Reset all filters"
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </div>

      </div>

      {/*  */}
      <div className="hidden">

      </div>
    </div>

  )
}

export default FilterBar
