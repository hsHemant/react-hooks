import React, { useState, useReducer, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function ingrdientsReducer(currentIngrdients, action) {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngrdients, action.ingredient];
    case "DELETE":
      return currentIngrdients.filter(ig => ig.id !== action.id);
    default:
      throw new Error();
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingrdientsReducer, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("userIngredients chaneged");
  }, [userIngredients]);

  const onLoadIngredientsHandler = useCallback(
    loadedIngredinets => {
      setLoading(false);
      dispatch({ type: "SET", ingredients: loadedIngredinets });
    },
    [dispatch]
  );

  const addIngredinetsHandler = ingredients => {
    setLoading(true);
    fetch("https://react-hooks-c1de4.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredients }
        });
      })
      .catch(error => setError(error.message));
  };

  const removeIngredinetsHandler = id => {
    fetch(`https://react-hooks-c1de4.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE"
    }).then(responseData => {
      dispatch({ type: "DELETE", id });
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
