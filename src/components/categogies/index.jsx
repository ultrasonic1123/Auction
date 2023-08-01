import React from "react";
import { useState } from "react";
const CategoriesList = () => {
  const categogies = [
    { name: "Furniture", image: "" },
    { name: "Sports", image: "" },
    { name: "Jeueries", image: "" },
    { name: "Books", image: "" },
    { name: "Houses", image: "" },
    { name: "Cars", image: "" },
  ];
  const CategoryItem = ({ item }) => {
    return (
      <div
        key={item.name.toString()}
        style={{ background: `url(${item.image})` }}
      >
        <div>{item.name}</div>
      </div>
    );
  };
  return (
    <div style={{ display: "flex" }}>
      {categogies.map((item) => (
        <CategoryItem item={item} />
      ))}
    </div>
  );
};

export default CategoriesList;
