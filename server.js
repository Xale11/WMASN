import express from "express"
import path from "path"
import { fileURLToPath } from "url";
import { config as dotenvConfig } from 'dotenv';



const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "dist");

// Local development
dotenvConfig();

// AWS deployment
// const dotenvPath = path.resolve(__dirname, '../config4thqtr/app.env');
// dotenvConfig({ path: dotenvPath });

// app.use(express.static(buildPath))




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