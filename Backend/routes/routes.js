const express = require('express');
const router = express.Router();

// Importar controllers
const PacienteController = require('../controllers/PacienteController');
const DentistaController = require('../controllers/DentistaController');
const CitaController = require('../controllers/CitaController');
const ServicioController = require('../controllers/ServicioController');
const WhatsAppController = require('../controllers/WhatsAppController');

// Importar validadores
const { pacienteValidators, dentistaValidators, servicioValidators, citaValidators } = require('../middlewares/validators');
const { validateIdParam, validateNotEmptyBody } = require('../middlewares/requestValidation');

// ===== PACIENTES =====
router.post('/pacientes', pacienteValidators.create, PacienteController.create);
router.get('/pacientes', PacienteController.getAll);
router.get('/pacientes/:id', validateIdParam, PacienteController.getById);
router.put('/pacientes/:id', validateIdParam, validateNotEmptyBody, pacienteValidators.update, PacienteController.update);
router.delete('/pacientes/:id', validateIdParam, PacienteController.delete);
router.patch('/pacientes/:id/restaurar', validateIdParam, PacienteController.restore);

// ===== DENTISTAS =====
router.post('/dentistas', dentistaValidators.create, DentistaController.create);
router.get('/dentistas', DentistaController.getAll);
router.get('/dentistas/:id', validateIdParam, DentistaController.getById);
router.put('/dentistas/:id', validateIdParam, validateNotEmptyBody, dentistaValidators.update, DentistaController.update);
router.delete('/dentistas/:id', validateIdParam, DentistaController.delete);
router.patch('/dentistas/:id/restaurar', validateIdParam, DentistaController.restore);

// ===== SERVICIOS =====
router.post('/servicios', servicioValidators.create, ServicioController.create);
router.get('/servicios', ServicioController.getAll);
router.get('/servicios/:id', validateIdParam, ServicioController.getById);
router.put('/servicios/:id', validateIdParam, validateNotEmptyBody, servicioValidators.update, ServicioController.update);
router.delete('/servicios/:id', validateIdParam, ServicioController.delete);
router.patch('/servicios/:id/restaurar', validateIdParam, ServicioController.restore);

// ===== CITAS =====
router.post('/citas', citaValidators.create, CitaController.create);
router.get('/citas', CitaController.getAll);
router.get('/citas/:id', validateIdParam, CitaController.getById);
router.put('/citas/:id', validateIdParam, validateNotEmptyBody, citaValidators.update, CitaController.update);
router.patch('/citas/:id/estado', validateIdParam, citaValidators.updateEstado, CitaController.updateEstado);
router.delete('/citas/:id', validateIdParam, CitaController.delete);

// ===== WHATSAPP =====
router.post('/whatsapp/conectar', WhatsAppController.conectar);
router.post('/whatsapp/desconectar', WhatsAppController.desconectar);
router.get('/whatsapp/estado', WhatsAppController.obtenerEstado);
router.post('/whatsapp/enviar', WhatsAppController.enviarMensaje);
router.get('/whatsapp/chats', WhatsAppController.obtenerChats);
router.get('/whatsapp/chats/:chatId', WhatsAppController.obtenerHistorial);

module.exports = router;
