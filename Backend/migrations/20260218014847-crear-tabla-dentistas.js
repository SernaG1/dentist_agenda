'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dentistas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      especialidad: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      numero_licencia: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true  // no pueden existir dos dentistas con la misma licencia
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('dentistas');
  }
};