import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const query =
      searchValue.length === 0
        ? ``
        : `?orderBy="title"&equalTo="${searchValue}"`;
    fetch(`https://react-hooks-c1de4.firebaseio.com/ingredients.json${query}`)
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
        onLoadIngredients(loadedIngredinets);
      });
  }, [searchValue, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
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
