'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pacientes', {
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
      direccion: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      // underscored: true convierte createdAt → created_at
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
    await queryInterface.dropTable('pacientes');
  }
};