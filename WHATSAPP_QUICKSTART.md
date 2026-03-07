# 🚀 INICIO RÁPIDO - WhatsApp Bot (5 minutos)

## ✅ Paso 1: Activar en el Backend

Abre `Backend/.env` (o créalo si no existe) y agrega:

```env
ENABLE_WHATSAPP=true
```

## ✅ Paso 2: Iniciar el Servidor

```bash
cd Backend
npm start
```

Verás en la consola:

```
🤖 Inicializando Bot de WhatsApp...
📱 Escanea este código QR con WhatsApp:

█████████████████████████
█ ▄▄▄▄▄ █▀▄ █ █▄▀▀ ▄▄▄▄▄ █
█ █   █ █▄██▀██ █ █ █   █ █
█ █▄▄▄█ █  ▀█▀ █ █ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀ █ ▀ █▄▄▄▄▄▄▄█
█▀▄█▀▀▄▀▄▄▄█▀▀▀█▀▀▀▄▀▀█▄█
█████████████████████████

✅ WhatsApp conectado correctamente
```

## ✅ Paso 3: Escanear QR con tu Teléfono

1. **Abre WhatsApp** en tu teléfono
2. Toca los **3 puntos** (⋮) → **"Dispositivos vinculados"**
3. Toca **"Vincular dispositivo"**
4. **Escanea el código QR** que ves en la consola del servidor

## ✅ Paso 4: Acceder al Panel de Control

En tu navegador ve a:
```
http://localhost:4200/whatsapp
```

Verás:
- Lista de chats en tiempo real
- Botón para conectar/desconectar
- Panel para responder mensajes

## ✅ Paso 5: Prueba el Chatbot

Desde **cualquier WhatsApp**, envía un mensaje a tu número:

```
Hola
```

El bot responderá automáticamente con:
```
¡Hola! 👋 Bienvenido a nuestra clínica dental. ¿En qué podemos ayudarte?

Escribe:
- SERVICIOS: Ver nuestros servicios
- HORARIOS: Horarios de atención
- AGENDAR: Agendar una cita
- CONTACTO: Datos de contacto
```

---

## 🎯 Palabras Clave del Bot

| Escribe | Recibe |
|---------|--------|
| `hola` | Bienvenida con menú |
| `servicios` | Lista de servicios |
| `horarios` | Horarios de atención |
| `agendar` | Cómo agendar cita |
| `contacto` | Datos de contacto |
| `precio` | Info de precios |

---

## 🔧 Personalizar Respuestas

Edita: `Backend/services/whatsappService.js` línea ~95

```javascript
const respuestas = {
  'hola': '¡Hola! Tu respuesta aquí',
  'horarios': '📅 HORARIOS: Lunes a Viernes 8AM-6PM',
  // Agrega más aquí
};
```

**Reinicia el servidor** después de hacer cambios.

---

## 📱 Vista del Panel

```
┌─────────────────────────────────────┐
│  💬 Panel de Mensajes WhatsApp      │
│  ✅ Conectado                       │
└─────────────────────────────────────┘

┌──────────────┬─────────────────────┐
│   CHATS      │    CONVERSACIÓN     │
├──────────────┼─────────────────────┤
│              │                     │
│  JD          │  📨 Hola, ¿cómo    │
│  Juan Díaz   │     están?          │
│  Últimas     │                     │
│  inquietudes │  ✉️ ¡Hola! Bienven│
│              │     ido a nuestra   │
│  María       │     clínica...      │
│  María López │                     │
│  ¿Qué horas  │  [Escribe mensaje]  │
│              │  [Enviar]           │
└──────────────┴─────────────────────┘
```

---

## 🔓 Responder Manualmente

1. Selecciona un chat en el panel
2. Escribe tu mensaje en el input abajo
3. Presiona **Enviar** o Enter
4. El cliente lo recibirá inmediatamente

---

## ⚠️ Problemas Comunes

### **No veo código QR**
```bash
# Reinicia el servidor
npm start
```

### **El bot no responde**
- Verifica: `GET /api/whatsapp/estado`
- Debe mostrar `"conectado": true`

### **Sesión caducó**
- Borra: `Backend/.wwebjs_auth/`
- Reinicia y escanea QR nuevamente

### **Error de conexión**
- Asegúrate que `ENABLE_WHATSAPP=true` en `.env`
- Reinicia: `npm start`

---

## 🚀 Próximas Historias

- [ ] Guardar mensajes en Base de Datos
- [ ] Notificaciones en tiempo real (Socket.io)
- [ ] Respuestas dinámicas (consultar horarios de BD)
- [ ] Integración con IA para respuestas más naturales
- [ ] Migrar a API oficial de Meta (más confiable)

---

## 📖 Para Más Detalles

Lee: [WHATSAPP_GUIDE.md](../WHATSAPP_GUIDE.md)

- Endpoints API completos
- Personalización avanzada
- Seguridad y mejores prácticas
- Solución de problemas detallada

---

¡**¡Listo!** Tu chatbot de WhatsApp está activo 🎉**

