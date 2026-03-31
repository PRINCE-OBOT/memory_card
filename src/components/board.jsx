import { useEffect } from "react";
import "../styles/board.css";

export function Board({ handleIsSelect, lists, setList }) {
  async function fetchData(url) {
    const res = await fetch(url);

    const pokemonList = await res.json();

    const pokemonSrc = [];

    pokemonList.results.forEach(async (pokemon, i) => {
      const res = await fetch(pokemon.url);

      const details = await res.json();

      pokemonSrc.push(details.sprites.front_default);

      if (i === lists.length-1) {
        const newList = lists.map((list, j) => {
          list.src = pokemonSrc[j];
          return list;
        });
        setList(newList);
      }
    });
  }

  useEffect(() => {
    fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${lists.length}`);
  }, []);

  return (
    <section id="board" onClick={handleIsSelect}>
      {lists.map(({ id, cardName, src }) => {
        return (
          <div key={id} className="card_item" data-card-id={id}>
            {src && <img src={src} />}
            <p>{cardName}</p>
          </div>
        );
      })}
    </section>
  );
}
