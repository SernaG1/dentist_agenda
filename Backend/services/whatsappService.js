const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.sessionPath = path.join(__dirname, '../.wwebjs_auth');
  }

  // Inicializar cliente de WhatsApp
  async initialize() {
    console.log('🔄 Inicializando WhatsApp Web...');

    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: 'dentist-bot',
        dataPath: this.sessionPath
      }),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    // Evento: Generar QR
    this.client.on('qr', (qr) => {
      console.log('\n📱 Escanea este código QR con WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    // Evento: Cliente listo
    this.client.on('ready', () => {
      console.log('✅ WhatsApp conectado correctamente');
      this.isReady = true;
    });

    // Evento: Mensaje recibido
    this.client.on('message', async (message) => {
      console.log(`📨 Mensaje de ${message.from}: ${message.body}`);
      await this.handleIncomingMessage(message);
    });

    // Evento: Desconexión
    this.client.on('disconnected', (reason) => {
      console.log('❌ WhatsApp desconectado:', reason);
      this.isReady = false;
    });

    // Inicializar cliente
    await this.client.initialize();
  }

  // Manejar mensaje entrante
  async handleIncomingMessage(message) {
    try {
      const senderNumber = message.from.replace('@c.us', '');
      const messageText = message.body.toLowerCase().trim();

      console.log(`\n📥 Procesando mensaje de ${senderNumber}`);

      // Respuestas automáticas del chatbot
      const respuesta = this.getBotResponse(messageText);

      if (respuesta) {
        await this.sendMessage(message.from, respuesta);
      } else {
        // Si no hay respuesta automática, notificar al odontólogo
        await this.notifyDentist(senderNumber, messageText);
      }
    } catch (error) {
      console.error('❌ Error procesando mensaje:', error);
    }
  }

  // Lógica del chatbot automático
  getBotResponse(mensaje) {
    const respuestas = {
      'hola': '¡Hola! 👋 Bienvenido a nuestra clínica dental. ¿En qué podemos ayudarte?\n\nEscribe:\n- SERVICIOS: Ver nuestros servicios\n- HORARIOS: Horarios de atención\n- AGENDAR: Agendar una cita\n- CONTACTO: Datos de contacto',
      
      'hi': '¡Hola! 👋 Bienvenido a nuestra clínica dental. ¿En qué podemos ayudarte?\n\nEscribe:\n- SERVICIOS: Ver nuestros servicios\n- HORARIOS: Horarios de atención\n- AGENDAR: Agendar una cita\n- CONTACTO: Datos de contacto',

      'servicios': `🦷 NUESTROS SERVICIOS:\n\n
      ✨ Blanqueamiento dental\n
      💎 Diseño de sonrisa\n
      🔧 Ortodoncia\n
      🧹 Limpieza dental\n
      📋 Consulta general\n\n
      ¿Necesitas agendar? Escribe AGENDAR`,

      'horarios': `⏰ HORARIOS DE ATENCIÓN:\n\n
      Lunes a Viernes: 8:00 AM - 6:00 PM\n
      Sábados: 9:00 AM - 2:00 PM\n
      Domingos: Cerrado\n\n
      ¿Deseas agendar una cita? Escribe AGENDAR`,

      'agendar': `📅 AGENDAR CITA:\n\n
      Por favor proporciona:\n
      • Tu nombre completo\n
      • Número de documento\n
      • Servicio que deseas\n
      • Día y hora preferida\n\n
      Un odontólogo confirmará tu cita pronto.`,

      'contacto': `📞 DATOS DE CONTACTO:\n\n
      📱 Teléfono: +57 3001234567\n
      📧 Email: info@clinicadental.com\n
      📍 Dirección: Cra 45 #23-45, Ciudad\n\n
      ¿Necesitas algo más?`,

      'precio|costo|valores': `💰 INFORMACIÓN DE PRECIOS:\n\n
      Para obtener información detallada de precios, por favor contacta directamente con nuestro equipo.\n\n
      📱 Teléfono: +57 3001234567\n
      📧 Email: info@clinicadental.com`,

      'gracias': '¡De nada! 😊 Si necesitas algo más, estamos aquí para ayudarte.',

      'thanks': '¡De nada! 😊 Si necesitas algo más, estamos aquí para ayudarte.'
    };

    // Buscar coincidencia exacta
    if (respuestas[mensaje]) {
      return respuestas[mensaje];
    }

    // Buscar palabras clave
    for (const [clave, respuesta] of Object.entries(respuestas)) {
      if (mensaje.includes(clave)) {
        return respuesta;
      }
    }

    return null; // Sin respuesta automática
  }

  // Enviar mensaje
  async sendMessage(chatId, texto) {
    try {
      await this.client.sendMessage(chatId, texto);
      console.log(`✉️ Mensaje enviado a ${chatId}`);
    } catch (error) {
      console.error('❌ Error enviando mensaje:', error);
    }
  }

  // Enviar documento/imagen
  async sendMedia(chatId, rutaArchivo, caption = '') {
    try {
      const media = MessageMedia.fromFilePath(rutaArchivo);
      await this.client.sendMessage(chatId, media, { caption });
      console.log(`📎 Archivo enviado a ${chatId}`);
    } catch (error) {
      console.error('❌ Error enviando archivo:', error);
    }
  }

  // Notificar al odontólogo de unmensaje que no se pudo procesar
  async notifyDentist(numeroCliente, mensaje) {
    // Aquí guardarías el mensaje en la DB para que el odontólogo lo vea
    console.log(`⚠️ Mensaje de cliente ${numeroCliente} requiere respuesta manual: ${mensaje}`);
    
    // Respuesta automática mientras llega el odontólogo
    await this.sendMessage(`${numeroCliente}@c.us`, 
      `Gracias por tu mensaje. 📨\n\nUn odontólogo estará disponible pronto para ayudarte.\n\nPor favor espera nuestra respuesta.`
    );
  }

  // Obtener contactos
  async getContacts() {
    try {
      const contactos = await this.client.getContacts();
      return contactos;
    } catch (error) {
      console.error('❌ Error obteniendo contactos:', error);
      return [];
    }
  }

  // Obtener chats
  async getChats() {
    try {
      const chats = await this.client.getChats();
      return chats;
    } catch (error) {
      console.error('❌ Error obteniendo chats:', error);
      return [];
    }
  }

  // Desconectar cliente
  async disconnect() {
    try {
      if (this.client) {
        await this.client.destroy();
        this.isReady = false;
        console.log('👋 WhatsApp desconectado');
      }
    } catch (error) {
      console.error('❌ Error desconectando:', error);
    }
  }
}

// Crear instancia única
let whatsappInstance = null;

function getWhatsAppService() {
  if (!whatsappInstance) {
    whatsappInstance = new WhatsAppService();
  }
  return whatsappInstance;
}

module.exports = { WhatsAppService, getWhatsAppService };
