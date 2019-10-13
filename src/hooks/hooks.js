import { useReducer } from "react";

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...httpState, loading: false, data: action.responseData };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { ...httpState, error: null };
    default:
      throw new Error();
  }
};

const useHttp = () => {
  const [httpSate, dispatchHttp] = useReducer(httpReducer, {
    loading: true,
    error: null,
    data: null
  });

  const sendRequest = (url, method, body) => {
    fetch(url, {
      method: method,
      body: body,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        dispatchHttp({ type: "RESPONSE", responseData: responseData });
        // dispatch({ type: "DELETE", id });
      })
      .catch(error =>
        dispatchHttp({ type: "ERROR", errorData: error.message })
      );
  };

  return {
    isLoading: httpSate.loading,
    data: httpSate.data,
    error: httpSate.error,
    sendRequest: sendRequest
  };
};

export default useHttp;
