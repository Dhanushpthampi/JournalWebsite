import { useState, useEffect } from 'react'
import './App.css'




function App() {
  const [text, setText] = useState("");
  const [latest, setLatest] = useState(null);
  const [entries,setEntries] = useState([]);

  const FetchEntry = async () => {
    const response = await fetch('http://localhost:5000/api/entry');
    const data = await response.json();
    setLatest(data);
  }

  const submitEntry = async () => {
    await fetch('http://localhost:5000/api/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    setText("");
    FetchEntry();
  }


const FetchEntries = async () => {
  const res = await fetch('http://localhost:5000/api/entries');
  const data = await res.json();
  setEntries(data);
}










  useEffect(() => {
    FetchEntry();
    FetchEntries();
  }
    , [])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
        <h1>create an Entry</h1>
        <textarea rows='4'
        cols='50'
        placeholder='write something....'
        value={text}
        onChange={(e)=>setText(e.target.value)}></textarea>
        <br />
        <button onClick={submitEntry}>Save Entry</button>
      </div>
      

      {
        latest && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "start",border:"1px solid black", margin:"10px"}}>
            <h5>Latest Entry</h5>
            <p>{latest.text}</p>
            <p style={{color:"green"}}>{new Date(latest.createdAt).toLocaleString()}</p>
          </div>
        )
      }
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",   }}>
        <h1>All Entries</h1>
        {entries.map((entry) => (
          <div key={entry._id} style={{border:"1px solid black", margin:"10px",padding:"10px"}}>
            <p>{entry.text}</p>
            <p>{new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
