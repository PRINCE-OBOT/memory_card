import "../styles/board.css";

export function Board({ handleIsSelect, lists }) {
  return (
    <section id="board" onClick={handleIsSelect}>
      {lists.map(({ id, cardName }) => {
        return (
          <div key={id} className="card_item" data-card-id={id}>
            {cardName}
          </div>
        );
      })}
    </section>
  );
}
