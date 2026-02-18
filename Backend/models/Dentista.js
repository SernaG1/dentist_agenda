const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dentista = sequelize.define('Dentista', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    numero_licencia: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'dentistas',
    timestamps: true,
    underscored: true
  });

  return Dentista;
};
