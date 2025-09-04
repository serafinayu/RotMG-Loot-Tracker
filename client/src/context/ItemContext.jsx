import React, { createContext, useEffect, useState, useCallback } from "react";
import { items, collections as asset_collections } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  // Temporary Until Actual Database Implementation
  const collectionId = "asdfasfe";

  const navigate = useNavigate();
  const categories = {
    weapons: [
      "daggers",
      "dual blades",
      "bows",
      "longbows",
      "staves",
      "spellblades",
      "wands",
      "morning stars",
      "swords",
      "flails",
      "katanas",
      "tachis",
    ],
    abilities: [
      "cloaks",
      "quivers",
      "spells",
      "tomes",
      "helms",
      "shields",
      "seals",
      "poisons",
      "skulls",
      "traps",
      "orbs",
      "prisms",
      "scepters",
      "stars",
      "wakizashi",
      "lutes",
      "maces",
      "sheaths",
    ],
    armor: ["leather", "robes", "heavy"],
    rings: [
      "health",
      "magic",
      "attack",
      "defense",
      "speed",
      "dexterity",
      "vitality",
      "wisdom",
      "untiered",
      "limited",
    ],
  };
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tieredItems, setTieredItems] = useState([]);
  const [utItems, setUtItems] = useState([]);
  const [stItems, setStItems] = useState([]);
  const [shinyItems, setShinyItems] = useState([]);
  const [showObtained, setShowObtained] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [collections, setCollections] = useState(asset_collections);
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    Object.keys(collections)[0]
  );
  const [selectedCollection, setSelectedCollection] = useState(
    collections[selectedCollectionId]
  );
  const [showCollections, setShowCollections] = useState(false);

  const [displayLogin, setDisplayLogin] = useState(false);

  // Set User Login
  const [token, setToken] = useState("dafsdf");

  const updateCollections = async (itemId) => {
    setSelectedCollectionId(itemId);
    setSelectedCollection(collections[itemId]);
  };

  const resetFilters = async () => {
    setShowObtained(false);
    setCategory("");
    setSubCategory("");
    setSearch("");
  };

  const applyFilter = useCallback(async () => {
    // Reset arrays first
    const newTieredItems = [];
    const newUtItems = [];
    const newStItems = [];
    const newShinyItems = [];

    // Filter items based on selected category, subcategory, and search
    const filteredItems = Object.entries(items).filter(([itemId, item]) => {
      const obtainedItems = selectedCollection?.obtained || {};

      // First check if showObtained filter is active
      if (
        showObtained &&
        !Object.prototype.hasOwnProperty.call(obtainedItems, itemId)
      ) {
        return false; // Skip items that are NOT obtained when showObtained is true
      }

      // Check search filter (only if search string is 3+ characters)
      if (search && search.length >= 3) {
        // Create case-insensitive regex for partial matching
        const searchRegex = new RegExp(
          search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i"
        );
        if (!searchRegex.test(item.name)) {
          return false; // Skip items that don't match search
        }
      }

      // If no category is selected, show all items (that pass the quantity and search checks)
      if (!category) return true;

      // Check if item matches selected category
      const matchesCategory = item.category === category;

      // If no subcategory is selected, just check category
      if (!subCategory) return matchesCategory;

      // Check if item matches both category and subcategory
      return matchesCategory && item.subCategory === subCategory;
    });

    // Sort filtered items by tier
    Object.entries(filteredItems).forEach(([itemId, item]) => {
      switch (item[1].tier) {
        case "ut":
          newUtItems.push(item);
          break;
        case "st":
          newStItems.push(item);
          break;
        case "shiny":
          newShinyItems.push(item);
          break;
        default:
          newTieredItems.push(item);
          break;
      }
    });

    setTieredItems(newTieredItems);
    setUtItems(newUtItems);
    setStItems(newStItems);
    setShinyItems(newShinyItems);
  }, [
    category,
    subCategory,
    showObtained,
    search,
    selectedCollection,
    collections,
    token,
  ]);

  useEffect(() => {
    // console.log(Object.entries(asset_collections)[0]);
    // console.log(collections[Object.entries(asset_collections)[0][0]])
    // console.log(collections[collectionId])
    applyFilter();
    // console.log(selectedCollection)
  }, [
    category,
    subCategory,
    showObtained,
    search,
    selectedCollection,
    collections,
    token,
  ]);

  const value = {
    navigate,
    categories,
    items,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    tieredItems,
    utItems,
    stItems,
    shinyItems,
    applyFilter,
    showObtained,
    setShowObtained,
    resetFilters,
    selectedItem,
    setSelectedItem,
    search,
    setSearch,
    selectedCollectionId,
    setSelectedCollectionId,
    selectedCollection,
    setSelectedCollection,
    collections,
    updateCollections,
    token,
    displayLogin,
    setDisplayLogin,
    showCollections,
    setShowCollections,
  };

  return (
    <ItemContext.Provider value={value}>{props.children}</ItemContext.Provider>
  );
};

export default ItemContextProvider;
