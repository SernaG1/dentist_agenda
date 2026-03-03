// Middleware de manejo centralizado de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    const campos = Object.keys(err.errors).map(key => err.errors[key].path);
    return res.status(400).json({
      error: 'Error de validación',
      detalles: `El campo(s) ${campos.join(', ')} ya existe(n) en la base de datos`
    });
  }

  if (err.name === 'SequelizeValidationError') {
    const errores = err.errors.map(e => ({
      campo: e.path,
      mensaje: e.message
    }));
    return res.status(400).json({
      error: 'Error de validación',
      detalles: errores
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Error de integridad referencial',
      detalles: 'No se puede realizar esta operación debido a campos relacionados'
    });
  }

  // Errores no identificados
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
