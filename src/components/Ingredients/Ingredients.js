import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/hooks";

const ingrdientsReducer = (currentIngrdientsState, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngrdientsState, action.ingredient];
    case "DELETE":
      return currentIngrdientsState.filter(ig => ig.id !== action.id);
    default:
      throw new Error();
  }
};

function Ingredients() {
  const [userIngredientsState, dispatch] = useReducer(ingrdientsReducer, []);
  const { isLoading, error, data, sendRequest } = useHttp();

  useEffect(() => {
    console.log("userIngredientsState chaneged");
  }, [userIngredientsState]);

  const onLoadIngredientsHandler = useCallback(
    loadedIngredinets => {
      // dispatchHttp({ type: "RESPONSE" });
      dispatch({ type: "SET", ingredients: loadedIngredinets });
    },
    [dispatch]
  );

  const addIngredinetsHandler = useCallback(ingredients => {
    // dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-c1de4.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        // dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredients }
        });
      })
      .catch(
        error => {}
        // dispatchHttp({ type: "ERROR", errorData: error.message })
      );
  }, []);

  const removeIngredinetsHandler = useCallback(
    id => {
      sendRequest(
        `https://react-hooks-c1de4.firebaseio.com/ingredients/${id}.json`,
        "DELETE"
      );
    },
    [sendRequest]
  );

  const IngredientsList = useMemo(
    () => (
      <IngredientList
        ingredients={userIngredientsState}
        onRemoveItem={removeIngredinetsHandler}
      />
    ),
    [userIngredientsState, removeIngredinetsHandler]
  );

  const clearError = () => {
    // dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        addIngredients={addIngredinetsHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        {IngredientsList}
      </section>
    </div>
  );
}

export default Ingredients;
