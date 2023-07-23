import "./App.css"
import { useState } from "react"
import QRCode from "react-qr-code"
import QrScanner from "qr-scanner"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")

  // eslint-disable-next-line no-unused-vars
  const download = () => {
    const svg = document.getElementById("QRCode")
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")

      // name of image
      downloadLink.download = `${inputValue}`
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  // Read qr code
  const readCode = e => {
    // eslint-disable-next-line no-undef
    const file = e.target.files[0]
    if (!file) {
      return
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then(result => setResult(result.data))
      .catch(e => console.log(e))
  }

  return (
    <div>
      <h3>1, QRCode Generator and Downloader : react-qr-code package</h3>

      <input type="text" onChange={e => setInputValue(e.target.value)}></input>

      <h3>2, QRCode Reader : qr-scanner package</h3>

      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
          id="QRCode"
        />
      </div>

      <input type="text" onChange={e => setInputValue(e.target.value)}></input>
      <input type="button" onClick={download} value="Download" />
      <input type="file" onChange={e => readCode(e)}></input>

      <p>Result is {result}</p>
    </div>
  )
}

export default App
