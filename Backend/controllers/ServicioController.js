const db = require('../models');
const { validationResult } = require('express-validator');

class ServicioController {
  // Crear servicio
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { nombre, descripcion, duracion_minutos, precio } = req.body;

      const servicio = await db.Servicio.create({
        nombre,
        descripcion,
        duracion_minutos,
        precio,
        activo: true
      });

      res.status(201).json({
        mensaje: 'Servicio creado exitosamente',
        servicio
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los servicios
  static async getAll(req, res, next) {
    try {
      const { activos } = req.query;
      const where = activos === 'false' ? {} : { activo: true };

      const servicios = await db.Servicio.findAll({
        where,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: servicios.length,
        servicios
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener servicio por ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const servicio = await db.Servicio.findByPk(id, {
        include: [
          {
            model: db.Cita,
            include: [db.Paciente, db.Dentista]
          }
        ]
      });

      if (!servicio) {
        return res.status(404).json({
          error: 'Servicio no encontrado'
        });
      }

      res.json(servicio);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar servicio
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { id } = req.params;
      const { nombre, descripcion, duracion_minutos, precio } = req.body;

      const servicio = await db.Servicio.findByPk(id);
      if (!servicio) {
        return res.status(404).json({
          error: 'Servicio no encontrado'
        });
      }

      await servicio.update({
        nombre,
        descripcion,
        duracion_minutos,
        precio
      });

      res.json({
        mensaje: 'Servicio actualizado exitosamente',
        servicio
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar (desactivar) servicio
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const servicio = await db.Servicio.findByPk(id);

      if (!servicio) {
        return res.status(404).json({
          error: 'Servicio no encontrado'
        });
      }

      await servicio.update({ activo: false });

      res.json({
        mensaje: 'Servicio eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // Restaurar servicio
  static async restore(req, res, next) {
    try {
      const { id } = req.params;
      const servicio = await db.Servicio.findByPk(id);

      if (!servicio) {
        return res.status(404).json({
          error: 'Servicio no encontrado'
        });
      }

      await servicio.update({ activo: true });

      res.json({
        mensaje: 'Servicio restaurado exitosamente',
        servicio
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServicioController;
