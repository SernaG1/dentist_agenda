// Middleware para validar que los parámetros sean válidos
const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(id) || id < 1) {
    return res.status(400).json({
      error: 'ID inválido',
      detalles: 'El ID debe ser un número entero positivo'
    });
  }
  
  next();
};

// Middleware para validar que el body no esté vacío
const validateNotEmptyBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Body vacío',
      detalles: 'El cuerpo de la solicitud no puede estar vacío'
    });
  }
  
  next();
};

// Middleware para registrar acciones
const logAction = (action) => {
  return (req, res, next) => {
    console.log(`[${new Date().toLocaleString('es-CO')}] ${req.method} ${req.baseUrl}${req.path} - ${action}`);
    next();
  };
};

module.exports = {
  validateIdParam,
  validateNotEmptyBody,
  logAction
};
