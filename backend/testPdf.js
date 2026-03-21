const fs = require("fs")
const pdfParse = require("pdf-parse")

const dataBuffer = fs.readFileSync("./Module 1 DMM.pdf") // put a test PDF in backend folder

pdfParse(dataBuffer).then(data => {
  console.log("PDF Text:", data.text)
}).catch(console.error)
