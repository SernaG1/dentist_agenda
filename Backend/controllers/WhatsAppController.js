const { getWhatsAppService } = require('../services/whatsappService');

class WhatsAppController {
  // Enviar mensaje desde el panel del odontólogo
  static async enviarMensaje(req, res, next) {
    try {
      const { numero, mensaje } = req.body;

      if (!numero || !mensaje) {
        return res.status(400).json({
          error: 'Número y mensaje son requeridos'
        });
      }

      const whatsapp = getWhatsAppService();

      if (!whatsapp.isReady) {
        return res.status(503).json({
          error: 'WhatsApp no está conectado'
        });
      }

      // Formatear número (agregar @c.us si no lo tiene)
      const chatId = numero.includes('@') ? numero : `${numero}@c.us`;

      await whatsapp.sendMessage(chatId, mensaje);

      res.json({
        mensaje: 'Mensaje enviado correctamente',
        numero,
        contenido: mensaje
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener chats activos
  static async obtenerChats(req, res, next) {
    try {
      const whatsapp = getWhatsAppService();

      if (!whatsapp.isReady) {
        return res.status(503).json({
          error: 'WhatsApp no está conectado'
        });
      }

      const chats = await whatsapp.getChats();

      res.json({
        total: chats.length,
        chats: chats.map(chat => ({
          id: chat.id._serialized,
          nombre: chat.name,
          ultimoMensaje: chat.lastMessage?.body || 'Sin mensajes',
          noLidos: chat.unreadCount || 0,
          hora: chat.timestamp
        }))
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener historial de chat
  static async obtenerHistorial(req, res, next) {
    try {
      const { chatId } = req.params;
      const whatsapp = getWhatsAppService();

      if (!whatsapp.isReady) {
        return res.status(503).json({
          error: 'WhatsApp no está conectado'
        });
      }

      const chats = await whatsapp.getChats();
      const chat = chats.find(c => c.id._serialized === chatId);

      if (!chat) {
        return res.status(404).json({
          error: 'Chat no encontrado'
        });
      }

      const mensajes = await chat.fetchMessages({ limit: 50 });

      res.json({
        chatId,
        nombre: chat.name,
        total: mensajes.length,
        mensajes: mensajes.map(msg => ({
          id: msg.id._serialized,
          de: msg.from.replace('@c.us', ''),
          texto: msg.body,
          timestamp: msg.timestamp,
          esDelBot: msg.fromMe
        }))
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener estado de conexión
  static async obtenerEstado(req, res, next) {
    try {
      const whatsapp = getWhatsAppService();

      res.json({
        conectado: whatsapp.isReady,
        mensaje: whatsapp.isReady ? 'Conectado' : 'Desconectado',
        timestamp: new Date()
      });
    } catch (error) {
      next(error);
    }
  }

  // Desconectar WhatsApp
  static async desconectar(req, res, next) {
    try {
      const whatsapp = getWhatsAppService();
      await whatsapp.disconnect();

      res.json({
        mensaje: 'WhatsApp desconectado correctamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // Inicializar WhatsApp
  static async conectar(req, res, next) {
    try {
      const whatsapp = getWhatsAppService();

      if (whatsapp.isReady) {
        return res.json({
          mensaje: 'WhatsApp ya está conectado',
          estado: 'conectado'
        });
      }

      // Iniciar conexión (no espera a que termine)
      whatsapp.initialize().catch(err => {
        console.error('Error inicializando WhatsApp:', err);
      });

      res.json({
        mensaje: 'Inicializando WhatsApp. Por favor escanea el código QR en la consola.',
        estado: 'inicializando'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WhatsAppController;
