import express from "express"
import path from "path"

const app = express()

const _dirname = path.dirname("./")
const buildPath = path.join(_dirname, "./dist")

app.use(express.static(buildPath))


app.get("/*", (req, res) => {
  res.sendFile(
    path.join(_dirname, "./dist/index/index.html"),
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