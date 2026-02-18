const { Sequelize } = require('sequelize');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/database')[environment];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool
  }
);

const db = {
  sequelize,
  Sequelize,
  Paciente: require('./Paciente')(sequelize),
  Dentista: require('./Dentista')(sequelize),
  Cita: require('./Cita')(sequelize),
  Servicio: require('./Servicio')(sequelize)
};

// Definir asociaciones
const { Paciente, Dentista, Cita, Servicio } = db;

// Un cita pertenece a un paciente
Cita.belongsTo(Paciente, { foreignKey: 'paciente_id' });
// Un cita pertenece a un dentista
Cita.belongsTo(Dentista, { foreignKey: 'dentista_id' });
// Un cita pertenece a un servicio
Cita.belongsTo(Servicio, { foreignKey: 'servicio_id' });

// Un paciente puede tener muchas citas
Paciente.hasMany(Cita, { foreignKey: 'paciente_id' });
// Un dentista puede tener muchas citas
Dentista.hasMany(Cita, { foreignKey: 'dentista_id' });
// Un servicio puede estar en muchas citas
Servicio.hasMany(Cita, { foreignKey: 'servicio_id' });

module.exports = db;
