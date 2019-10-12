import React, { useReducer, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

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

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...httpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { ...httpState, error: null };
    default:
      throw new Error();
  }
};

function Ingredients() {
  const [userIngredientsState, dispatch] = useReducer(ingrdientsReducer, []);
  const [httpSate, dispatchHttp] = useReducer(httpReducer, {
    loading: true,
    error: null
  });

  useEffect(() => {
    console.log("userIngredientsState chaneged");
  }, [userIngredientsState]);

  const onLoadIngredientsHandler = useCallback(
    loadedIngredinets => {
      dispatchHttp({ type: "RESPONSE" });
      dispatch({ type: "SET", ingredients: loadedIngredinets });
    },
    [dispatch]
  );

  const addIngredinetsHandler = ingredients => {
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-c1de4.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredients }
        });
      })
      .catch(error =>
        dispatchHttp({ type: "ERROR", errorData: error.message })
      );
  };

  const removeIngredinetsHandler = id => {
    dispatchHttp({ type: "SEND" });
    fetch(`https://react-hooks-c1de4.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE"
    })
      .then(responseData => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id });
      })
      .catch(error =>
        dispatchHttp({ type: "ERROR", errorData: error.message })
      );
  };

  const clearError = () => {
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpSate.error && (
        <ErrorModal onClose={clearError}>{httpSate.error}</ErrorModal>
      )}

      <IngredientForm
        addIngredients={addIngredinetsHandler}
        loading={httpSate.loading}
      />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        <IngredientList
          ingredients={userIngredientsState}
          onRemoveItem={removeIngredinetsHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
