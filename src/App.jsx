import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";
const colors = [
  "#009688",
  "#3f7aa8",
  "#272829",
  "#607d8b",
  "#ff9800",
  "#795548",
  "#FB6964",
];

export default function App() {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });
  const [color, setColor] = useState("#607d8b");

  useEffect(() => {
    getQuote().then((q) => setQuote(q));
  }, []);

  async function getQuote() {
    return await fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        return data[getRandomNumber(data.length)];
      });
  }

  function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

  function handleClick() {
    getQuote().then((q) => {
      setQuote(q);
      setColor(colors[getRandomNumber(colors.length)]);
    });
  }

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div id="quote-box">
        <div>
          <h1 id="text" style={{ color: color }}>
            <FaQuoteLeft style={{ marginRight: 10 }} color={color} />
            {quote.text}
          </h1>
          <p id="author" style={{ color: color }}>
            - {quote.author}
          </p>
        </div>
        <div className="bottom">
          <a
            href="https://twitter.com/intent/tweet"
            target="_blank"
            id="tweet-quote"
            style={{ backgroundColor: color }}
          >
            <FaTwitter />
          </a>
          <button
            id="new-quote"
            onClick={handleClick}
            style={{ backgroundColor: color }}
          >
            New Quote
          </button>
        </div>
      </div>
      <div className="rights">By Mohammad Alkayyali</div>
    </div>
  );
}
