import React, { useState } from "react";
import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "https://cdn.skypack.dev/react-icons/ti";
import style from "./Card.module.scss";

const CARDS = 5;
const MAX_VISIBILITY = 2;

const Card = ({ title, content }) => (
  <div className={style.card}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className={style.carousel}>
      {active > 0 && (
        <button className={style.nav} onClick={() => setActive((i) => i - 1)}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className={style.cardcontainer}
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className={style.nav} onClick={() => setActive((i) => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const App = () => (
  <Carousel>
    {[...new Array(CARDS)].map((_, i) => (
      <Card title={"Card " + (i + 1)} content="test" />
    ))}
  </Carousel>
);

export default App;
