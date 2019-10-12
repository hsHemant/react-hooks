import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("userIngredients chaneged");
  }, [userIngredients]);

  const onLoadIngredientsHandler = useCallback(
    loadedIngredinets => {
      setLoading(false);
      setUserIngredients(loadedIngredinets);
    },
    [setUserIngredients]
  );

  const addIngredinetsHandler = ingredients => {
    setLoading(true);
    fetch("https://react-hooks-c1de4.firebasio.com/ingrediets.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        setUserIngredients(prevUserIngredients => [
          ...prevUserIngredients,
          { id: responseData.name, ...ingredients }
        ]);
      })
      .catch(error => setError(error.message));
  };

  const removeIngredinetsHandler = id => {
    fetch(`https://react-hooks-c1de4.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE"
    }).then(responseData => {
      setUserIngredients(prevUserIngredients =>
        prevUserIngredients.filter(ig => ig.id !== id)
      );
    });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        addIngredients={addIngredinetsHandler}
        loading={loading}
      />

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
