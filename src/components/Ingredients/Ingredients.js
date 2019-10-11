import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addUserIngredinets = ingredients => {
    setUserIngredients(prevUserIngredients => [
      ...prevUserIngredients,
      { id: Math.random, ...ingredients }
    ]);
  };

  return (
    <div className="App">
      <IngredientForm addIngredients={addUserIngredinets} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
