import express from "express"
import path from "path"
import { fileURLToPath } from "url";



const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "dist");

app.use(express.static(buildPath))




app.get("/*", (req, res) => {
  res.sendFile(
    path.join(buildPath, "index.html"),
    (err) => {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});