import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue === inputRef.current.value) {
        const query =
          searchValue.length === 0
            ? ``
            : `?orderBy="title"&equalTo="${searchValue}"`;

        fetch(
          `https://react-hooks-c1de4.firebaseio.com/ingredients.json${query}`
        )
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
            onLoadIngredients(loadedIngredinets);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
