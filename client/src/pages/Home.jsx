import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import ItemGrid from "../components/ItemGrid";
import ItemCard from "../components/ItemCard";
import AdPlacement from "../components/AdPlacement";
import Login from "../components/Login";
import { ItemContext } from "../context/ItemContext";

const Home = () => {
  const { token, displayLogin } = useContext(ItemContext);

  return !token ? (
    // Show landing page if user isn't logged in
    <div className="bg-linear-to-b from-[#111111] to-[#050505] flex-1 flex flex-col items-center text-center scattered-items-mask relative">
      <h1 className="font-lexend mt-25 mb-15 font-bold">
        Realm of the Mad God
        <br />
        Loot Tracker
      </h1>
      <p className="font-thin">Keep track of your loot in one place!</p>

      {displayLogin && <Login />}
    </div>
  ) : (
    // Show page with collections if user is logged in
    <div className="flex-1 flex flex-col">
      <div className="bg-black box-border px-8 m-0 md:mb-5 flex-1 flex flex-col relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          <div className="md:max-w-[220px] md:flex-[2]">
            <Sidebar />
          </div>
          <div className="flex-5 flex flex-col">
            <FilterBar />
            <div className="flex-2">
              <ItemGrid />
            </div>
            <AdPlacement />
          </div>
          <div className="hidden flex-[0.7] md:flex">
            <AdPlacement />
          </div>
        </div>
      </div>
      <div className="block mt-4 z-1 md:hidden">
        <ItemCard />
      </div>
    </div>
  );
};

export default Home;
