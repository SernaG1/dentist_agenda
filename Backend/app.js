const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar configuración y base de datos
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const { logAction } = require('./middlewares/requestValidation');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===== MIDDLEWARES GLOBALES =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logAction('Solicitud recibida'));

// ===== SINCRONIZACIÓN DE BASE DE DATOS =====
const syncDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✓ Conexión a la base de datos establecida');
    
    await db.sequelize.sync({ alter: false });
    console.log('✓ Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('✗ Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
};

const createDatabaseIfNotExists = async () => {
  const { Sequelize } = require('sequelize');
  const config = require('./config/database')[NODE_ENV];
  
  const sequelizeNoDB = new Sequelize(
    config.host ? `${config.dialect}://${config.username}:${config.password || ''}@${config.host}:${config.port || 3306}` : '',
    {
      logging: false,
      dialect: config.dialect
    }
  );
  
  try {
    await sequelizeNoDB.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
    console.log(`✓ Base de datos '${config.database}' verificada/creada`);
  } catch (error) {
    console.log('  (La base de datos ya existe o no se pudo crear)');
  } finally {
    await sequelizeNoDB.close();
  }
};

// ===== RUTAS =====

// Ruta health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    mensaje: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API de Agenda Odontológica - v1.0',
    estado: 'Activo',
    version: '1.0.0',
    endpoints: {
      pacientes: '/api/pacientes',
      dentistas: '/api/dentistas',
      citas: '/api/citas',
      servicios: '/api/servicios'
    },
    documentacion: '/docs'
  });
});

// Rutas de la API
app.use('/api', require('./routes/routes'));

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.path,
    metodo: req.method
  });
});

// ===== MIDDLEWARE DE MANEJO DE ERRORES =====
app.use(errorHandler);

// ===== SERVIDOR =====
app.listen(PORT, async () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Servidor iniciando en puerto ${PORT}`);
  console.log(`Ambiente: ${NODE_ENV}`);
  console.log(`${'='.repeat(50)}\n`);
  
  await createDatabaseIfNotExists();
  await syncDatabase();
  
  console.log('✓ Sistema listo para recibir solicitudes\n');
});

module.exports = app;
