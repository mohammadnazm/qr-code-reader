import "./App.css"
import { useState } from "react"
import QRCode from "react-qr-code"

function App() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div>
      <h3>1, QRCode Generator and Downloader : react-qr-code package</h3>

      <input type="text" onChange={e => setInputValue(e.target.value)}></input>

      <h3>2, QRCode Reader : qr-scanner package</h3>
    </div>
  )
}

export default App
