const express = require("express");
const cors = require("cors");
require("dotenv").config();

const yearsRoutes = require("./routes/years.routes");
const coursesRoutes = require("./routes/courses.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API do Hub TI está a funcionar"
  });
});

app.use("/api/years", yearsRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});