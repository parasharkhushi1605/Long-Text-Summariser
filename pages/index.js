import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
      console.log(data);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Long text Summarisation</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Long text Summarisation</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="text"
            rows={20}
            cols={70}
            placeholder="Paste the long text here"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Generate Summary" />
        </form>
        <div className="result">{result}</div>
      </main>
    </div>
  );
}
