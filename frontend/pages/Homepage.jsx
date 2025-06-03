import React, { useState } from "react";
import RecipeList from "../components/HomePage-components/RecipeList";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState();
  const [filterBy, setFilterBy] = useState();
  const [category, setCategory] = useState();
  const [order, setOrder] = useState("asc");

  return (
    <RecipeList
      searchQuery={searchQuery}
      filterBy={filterBy}
      category={category}
      order={order}
      setSearchQuery={setSearchQuery}
      setFilterBy={setFilterBy}
      setCategory={setCategory}
      setOrder={setOrder}
    />
  );
}
