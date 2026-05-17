export default (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      produto: {
        type: Sequelize.STRING
      },
      quantidade:{
        type:Sequelize.INTEGER
      },
      setor: {
        type: Sequelize.STRING
      },
      alarme: {
        type: Sequelize.STRING
      },
      acoes: {
        type: Sequelize.STRING
      }
    });
  
    return Product;
  };

  