import cors from 'cors';
import express from 'express';
import route from "./routes.js";

const app = express();
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(route);
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});

// arquivo responsavel pela configuração do express e cors - arquivos main do backend//