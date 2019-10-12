import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log("userIngredients chaneged");
  }, [userIngredients]);

  const onLoadIngredientsHandler = useCallback(
    loadedIngredinets => {
      setUserIngredients(loadedIngredinets);
    },
    [setUserIngredients]
  );

  const addIngredinetsHandler = ingredients => {
    fetch("https://react-hooks-c1de4.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        setUserIngredients(prevUserIngredients => [
          ...prevUserIngredients,
          { id: responseData.name, ...ingredients }
        ]);
      });
  };

  const removeIngredinetsHandler = id => {
    setUserIngredients(prevUserIngredients =>
      prevUserIngredients.filter(ig => ig.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredinetsHandler} />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredinetsHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
