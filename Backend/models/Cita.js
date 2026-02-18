const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cita = sequelize.define('Cita', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'id'
      }
    },
    dentista_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dentistas',
        key: 'id'
      }
    },
    servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'servicios',
        key: 'id'
      }
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duracion_minutos: {
      type: DataTypes.INTEGER,
      defaultValue: 30
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'completada', 'cancelada'),
      defaultValue: 'pendiente'
    },
    motivo_consulta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'citas',
    timestamps: true,
    underscored: true
  });

  return Cita;
};
