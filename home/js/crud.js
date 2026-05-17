import db from "./database/connect.js";


const Product = db.products;
const Op = db.Sequelize.Op;

const create = (req, res) => {
  if (!req.body.produto) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const product = {
    produto: req.body.produto,
    quantidade: req.body.quantidade,
    setor: req.body.setor,
    alarme: req.body.alarme,
    acoes: req.body.acoes
  };

  Product.create(product)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error occurred while creating the Product."
      })
    );
};

const findAll = (req, res) => {
  const queryValue = req.query.produto || req.query.name;
  const condition = queryValue
    ? { produto: { [Op.like]: `%${queryValue}%` } }
    : null;

  Product.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      })
    );
};

const findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).send({ message: `Cannot find Product with id=${id}.` });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error retrieving Product with id=" + id })
    );
};

const update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1)
        res.send({ message: "Successfully Updated Product." });
      else
        res.send({ message: `Can't update product with id=${id}. Something went wrong!` });
    })
    .catch((err) => res.status(500).send({ message: "Can't update Product with id=" + id }));
};

const deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Successfully deleted product!" });
      else res.send({ message: `Something went wrong! Can't delete Product with id=${id}.` });
    })
    .catch((err) => res.status(500).send({ message: "Can't delete Product with id=" + id }));
};

export default {
  create,
  findAll,
  findOne,
  update,
  delete: deleteProduct
};

// responsavel por criar , ler, update e delete ///