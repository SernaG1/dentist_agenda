const db = require('../models');
const { validationResult } = require('express-validator');

class PacienteController {
  // Crear paciente
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { nombre, apellido, email, telefono, fecha_nacimiento, direccion, observaciones } = req.body;

      const paciente = await db.Paciente.create({
        nombre,
        apellido,
        email,
        telefono,
        fecha_nacimiento,
        direccion,
        observaciones,
        activo: true
      });

      res.status(201).json({
        mensaje: 'Paciente creado exitosamente',
        paciente
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los pacientes
  static async getAll(req, res, next) {
    try {
      const { activos } = req.query;
      const where = activos === 'false' ? {} : { activo: true };

      const pacientes = await db.Paciente.findAll({
        where,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: pacientes.length,
        pacientes
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener paciente por ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const paciente = await db.Paciente.findByPk(id, {
        include: [
          {
            model: db.Cita,
            include: [db.Dentista, db.Servicio]
          }
        ]
      });

      if (!paciente) {
        return res.status(404).json({
          error: 'Paciente no encontrado'
        });
      }

      res.json(paciente);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar paciente
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { id } = req.params;
      const { nombre, apellido, email, telefono, fecha_nacimiento, direccion, observaciones } = req.body;

      const paciente = await db.Paciente.findByPk(id);
      if (!paciente) {
        return res.status(404).json({
          error: 'Paciente no encontrado'
        });
      }

      await paciente.update({
        nombre,
        apellido,
        email,
        telefono,
        fecha_nacimiento,
        direccion,
        observaciones
      });

      res.json({
        mensaje: 'Paciente actualizado exitosamente',
        paciente
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar (desactivar) paciente
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const paciente = await db.Paciente.findByPk(id);

      if (!paciente) {
        return res.status(404).json({
          error: 'Paciente no encontrado'
        });
      }

      await paciente.update({ activo: false });

      res.json({
        mensaje: 'Paciente eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // Restaurar paciente
  static async restore(req, res, next) {
    try {
      const { id } = req.params;
      const paciente = await db.Paciente.findByPk(id);

      if (!paciente) {
        return res.status(404).json({
          error: 'Paciente no encontrado'
        });
      }

      await paciente.update({ activo: true });

      res.json({
        mensaje: 'Paciente restaurado exitosamente',
        paciente
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PacienteController;
