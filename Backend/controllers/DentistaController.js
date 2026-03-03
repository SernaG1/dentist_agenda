const db = require('../models');
const { validationResult } = require('express-validator');

class DentistaController {
  // Crear dentista
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { nombre, apellido, email, telefono, especialidad, numero_licencia } = req.body;

      const dentista = await db.Dentista.create({
        nombre,
        apellido,
        email,
        telefono,
        especialidad,
        numero_licencia,
        activo: true
      });

      res.status(201).json({
        mensaje: 'Dentista creado exitosamente',
        dentista
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los dentistas
  static async getAll(req, res, next) {
    try {
      const { activos } = req.query;
      const where = activos === 'false' ? {} : { activo: true };

      const dentistas = await db.Dentista.findAll({
        where,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: dentistas.length,
        dentistas
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener dentista por ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const dentista = await db.Dentista.findByPk(id, {
        include: [
          {
            model: db.Cita,
            include: [db.Paciente, db.Servicio]
          }
        ]
      });

      if (!dentista) {
        return res.status(404).json({
          error: 'Dentista no encontrado'
        });
      }

      res.json(dentista);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar dentista
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { id } = req.params;
      const { nombre, apellido, email, telefono, especialidad, numero_licencia } = req.body;

      const dentista = await db.Dentista.findByPk(id);
      if (!dentista) {
        return res.status(404).json({
          error: 'Dentista no encontrado'
        });
      }

      await dentista.update({
        nombre,
        apellido,
        email,
        telefono,
        especialidad,
        numero_licencia
      });

      res.json({
        mensaje: 'Dentista actualizado exitosamente',
        dentista
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar (desactivar) dentista
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dentista = await db.Dentista.findByPk(id);

      if (!dentista) {
        return res.status(404).json({
          error: 'Dentista no encontrado'
        });
      }

      await dentista.update({ activo: false });

      res.json({
        mensaje: 'Dentista eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // Restaurar dentista
  static async restore(req, res, next) {
    try {
      const { id } = req.params;
      const dentista = await db.Dentista.findByPk(id);

      if (!dentista) {
        return res.status(404).json({
          error: 'Dentista no encontrado'
        });
      }

      await dentista.update({ activo: true });

      res.json({
        mensaje: 'Dentista restaurado exitosamente',
        dentista
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DentistaController;
