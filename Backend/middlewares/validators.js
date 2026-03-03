const { body, param } = require('express-validator');

// Validadores para Paciente
const pacienteValidators = {
  create: [
    body('nombre')
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
      .notEmpty().withMessage('El apellido es requerido')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe ser válido'),
    body('telefono')
      .optional()
      .matches(/^[\d\s\-\+\(\)]{7,}$/).withMessage('El teléfono debe ser válido'),
    body('fecha_nacimiento')
      .optional()
      .isISO8601().withMessage('La fecha debe ser válida (YYYY-MM-DD)')
  ],

  update: [
    body('nombre')
      .optional()
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
      .optional()
      .notEmpty().withMessage('El apellido no puede estar vacío')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe ser válido'),
    body('telefono')
      .optional()
      .matches(/^[\d\s\-\+\(\)]{7,}$/).withMessage('El teléfono debe ser válido'),
    body('fecha_nacimiento')
      .optional()
      .isISO8601().withMessage('La fecha debe ser válida (YYYY-MM-DD)'),
    param('id')
      .isInt().withMessage('El ID debe ser un número entero')
  ]
};

// Validadores para Dentista
const dentistaValidators = {
  create: [
    body('nombre')
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
      .notEmpty().withMessage('El apellido es requerido')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe ser válido'),
    body('telefono')
      .optional()
      .matches(/^[\d\s\-\+\(\)]{7,}$/).withMessage('El teléfono debe ser válido'),
    body('especialidad')
      .optional()
      .isLength({ min: 2 }).withMessage('La especialidad debe tener al menos 2 caracteres'),
    body('numero_licencia')
      .optional()
      .isLength({ min: 2 }).withMessage('El número de licencia debe ser válido')
  ],

  update: [
    body('nombre')
      .optional()
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
      .optional()
      .notEmpty().withMessage('El apellido no puede estar vacío')
      .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe ser válido'),
    body('telefono')
      .optional()
      .matches(/^[\d\s\-\+\(\)]{7,}$/).withMessage('El teléfono debe ser válido'),
    body('especialidad')
      .optional()
      .isLength({ min: 2 }).withMessage('La especialidad debe tener al menos 2 caracteres'),
    body('numero_licencia')
      .optional()
      .isLength({ min: 2 }).withMessage('El número de licencia debe ser válido'),
    param('id')
      .isInt().withMessage('El ID debe ser un número entero')
  ]
};

// Validadores para Servicio
const servicioValidators = {
  create: [
    body('nombre')
      .notEmpty().withMessage('El nombre del servicio es requerido')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('duracion_minutos')
      .notEmpty().withMessage('La duración es requerida')
      .isInt({ min: 1 }).withMessage('La duración debe ser un número positivo'),
    body('precio')
      .optional()
      .isDecimal().withMessage('El precio debe ser un número decimal válido'),
    body('descripcion')
      .optional()
      .isLength({ min: 2 }).withMessage('La descripción debe tener al menos 2 caracteres')
  ],

  update: [
    body('nombre')
      .optional()
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('duracion_minutos')
      .optional()
      .isInt({ min: 1 }).withMessage('La duración debe ser un número positivo'),
    body('precio')
      .optional()
      .isDecimal().withMessage('El precio debe ser un número decimal válido'),
    body('descripcion')
      .optional()
      .isLength({ min: 2 }).withMessage('La descripción debe tener al menos 2 caracteres'),
    param('id')
      .isInt().withMessage('El ID debe ser un número entero')
  ]
};

// Validadores para Cita
const citaValidators = {
  create: [
    body('paciente_id')
      .notEmpty().withMessage('El paciente es requerido')
      .isInt().withMessage('El paciente_id debe ser un número entero'),
    body('dentista_id')
      .notEmpty().withMessage('El dentista es requerido')
      .isInt().withMessage('El dentista_id debe ser un número entero'),
    body('servicio_id')
      .notEmpty().withMessage('El servicio es requerido')
      .isInt().withMessage('El servicio_id debe ser un número entero'),
    body('fecha_hora')
      .notEmpty().withMessage('La fecha y hora son requeridas')
      .isISO8601().withMessage('La fecha debe ser válida (formato ISO8601)'),
    body('duracion_minutos')
      .optional()
      .isInt({ min: 1 }).withMessage('La duración debe ser un número positivo'),
    body('motivo_consulta')
      .optional()
      .isLength({ min: 2 }).withMessage('El motivo debe tener al menos 2 caracteres')
  ],

  update: [
    body('paciente_id')
      .optional()
      .isInt().withMessage('El paciente_id debe ser un número entero'),
    body('dentista_id')
      .optional()
      .isInt().withMessage('El dentista_id debe ser un número entero'),
    body('servicio_id')
      .optional()
      .isInt().withMessage('El servicio_id debe ser un número entero'),
    body('fecha_hora')
      .optional()
      .isISO8601().withMessage('La fecha debe ser válida (formato ISO8601)'),
    body('duracion_minutos')
      .optional()
      .isInt({ min: 1 }).withMessage('La duración debe ser un número positivo'),
    body('estado')
      .optional()
      .isIn(['pendiente', 'confirmada', 'completada', 'cancelada'])
      .withMessage('El estado debe ser: pendiente, confirmada, completada o cancelada'),
    body('motivo_consulta')
      .optional()
      .isLength({ min: 2 }).withMessage('El motivo debe tener al menos 2 caracteres'),
    param('id')
      .isInt().withMessage('El ID debe ser un número entero')
  ],

  updateEstado: [
    body('estado')
      .notEmpty().withMessage('El estado es requerido')
      .isIn(['pendiente', 'confirmada', 'completada', 'cancelada'])
      .withMessage('El estado debe ser: pendiente, confirmada, completada o cancelada'),
    param('id')
      .isInt().withMessage('El ID debe ser un número entero')
  ]
};

module.exports = {
  pacienteValidators,
  dentistaValidators,
  servicioValidators,
  citaValidators
};
