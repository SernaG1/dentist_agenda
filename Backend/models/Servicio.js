const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Servicio = sequelize.define('Servicio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duracion_minutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'servicios',
    timestamps: true,
    underscored: true
  });

  return Servicio;
};
