const db = require('../models');
const { validationResult } = require('express-validator');

class CitaController {
  // Crear cita
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { paciente_id, dentista_id, servicio_id, fecha_hora, duracion_minutos, motivo_consulta, observaciones } = req.body;

      // Verificar que existan paciente, dentista y servicio
      const [paciente, dentista, servicio] = await Promise.all([
        db.Paciente.findByPk(paciente_id),
        db.Dentista.findByPk(dentista_id),
        db.Servicio.findByPk(servicio_id)
      ]);

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      if (!dentista) {
        return res.status(404).json({ error: 'Dentista no encontrado' });
      }
      if (!servicio) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      const cita = await db.Cita.create({
        paciente_id,
        dentista_id,
        servicio_id,
        fecha_hora,
        duracion_minutos,
        motivo_consulta,
        observaciones,
        estado: 'pendiente'
      });

      res.status(201).json({
        mensaje: 'Cita creada exitosamente',
        cita
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todas las citas
  static async getAll(req, res, next) {
    try {
      const { estado, fecha_desde, fecha_hasta } = req.query;
      const where = {};

      if (estado) {
        where.estado = estado;
      }

      if (fecha_desde || fecha_hasta) {
        where.fecha_hora = {};
        if (fecha_desde) {
          where.fecha_hora[db.Sequelize.Op.gte] = new Date(fecha_desde);
        }
        if (fecha_hasta) {
          where.fecha_hora[db.Sequelize.Op.lte] = new Date(fecha_hasta);
        }
      }

      const citas = await db.Cita.findAll({
        where,
        include: [db.Paciente, db.Dentista, db.Servicio],
        order: [['fecha_hora', 'ASC']]
      });

      res.json({
        total: citas.length,
        citas
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener cita por ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const cita = await db.Cita.findByPk(id, {
        include: [db.Paciente, db.Dentista, db.Servicio]
      });

      if (!cita) {
        return res.status(404).json({
          error: 'Cita no encontrada'
        });
      }

      res.json(cita);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar cita
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const { id } = req.params;
      const { paciente_id, dentista_id, servicio_id, fecha_hora, duracion_minutos, estado, motivo_consulta, observaciones } = req.body;

      const cita = await db.Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({
          error: 'Cita no encontrada'
        });
      }

      // Validar referencias si cambian
      if (paciente_id && paciente_id !== cita.paciente_id) {
        const paciente = await db.Paciente.findByPk(paciente_id);
        if (!paciente) {
          return res.status(404).json({ error: 'Paciente no encontrado' });
        }
      }

      if (dentista_id && dentista_id !== cita.dentista_id) {
        const dentista = await db.Dentista.findByPk(dentista_id);
        if (!dentista) {
          return res.status(404).json({ error: 'Dentista no encontrado' });
        }
      }

      if (servicio_id && servicio_id !== cita.servicio_id) {
        const servicio = await db.Servicio.findByPk(servicio_id);
        if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
        }
      }

      await cita.update({
        paciente_id,
        dentista_id,
        servicio_id,
        fecha_hora,
        duracion_minutos,
        estado,
        motivo_consulta,
        observaciones
      });

      res.json({
        mensaje: 'Cita actualizada exitosamente',
        cita
      });
    } catch (error) {
      next(error);
    }
  }

  // Cambiar estado de cita
  static async updateEstado(req, res, next) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      if (!['pendiente', 'confirmada', 'completada', 'cancelada'].includes(estado)) {
        return res.status(400).json({
          error: 'Estado inválido. Debe ser: pendiente, confirmada, completada o cancelada'
        });
      }

      const cita = await db.Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({
          error: 'Cita no encontrada'
        });
      }

      await cita.update({ estado });

      res.json({
        mensaje: 'Estado de cita actualizado exitosamente',
        cita
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar cita
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const cita = await db.Cita.findByPk(id);

      if (!cita) {
        return res.status(404).json({
          error: 'Cita no encontrada'
        });
      }

      await cita.destroy();

      res.json({
        mensaje: 'Cita eliminada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CitaController;
