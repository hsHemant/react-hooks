import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch("https://react-hooks-c1de4.firebaseio.com/ingredients.json")
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredinets = [];
        for (const key in responseData) {
          loadedIngredinets.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        console.log(loadedIngredinets);
        setUserIngredients(loadedIngredinets);
      });
  }, []);

  const addUserIngredinets = ingredients => {
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

  const removeUserIngredinets = id => {
    setUserIngredients(prevUserIngredients =>
      prevUserIngredients.filter(ig => ig.id !== id)
    );
  };

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
