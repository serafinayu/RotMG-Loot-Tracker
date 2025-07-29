import React, { useContext } from "react";
import Login from "../components/Login";
import { ItemContext } from "../context/ItemContext";

const FAQ = () => {
  const { displayLogin } = useContext(ItemContext);

  return (
    <div className="flex-1 flex flex-col relative">
      Faq
      {displayLogin && <Login />}
    </div>
  );
};

export default FAQ;
