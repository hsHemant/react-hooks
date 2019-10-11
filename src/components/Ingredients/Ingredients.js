import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addUserIngredinets = ingredients => {
    setUserIngredients(prevUserIngredients => [
      ...prevUserIngredients,
      { id: Math.random().toString(), ...ingredients }
    ]);
  };

  const removeUserIngredinets = id => {
    setUserIngredients(userIngredients.filter(ig => ig.id !== id));
  };

  console.log(userIngredients);

  return (
    <div className="App">
      <IngredientForm addIngredients={addUserIngredinets} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeUserIngredinets}
        />
      </section>
    </div>
  );
}

export default Ingredients;
