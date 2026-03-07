# 🤖 Guía de Integración de WhatsApp Bot

## Descripción General

Se ha integrado un chatbot de WhatsApp que permite:
- ✅ Responder automáticamente a preguntas frecuentes
- ✅ Recibir mensajes en tiempo real
- ✅ Permitir que los odontólogos respondan manualmente desde el panel
- ✅ Gestionar chats desde la aplicación

---

## 🔧 Configuración

### 1. **Variables de Entorno**

Agrega esto a tu archivo `.env` en la carpeta `Backend`:

```env
# WhatsApp Configuration
ENABLE_WHATSAPP=true
```

### 2. **Instalación de Dependencias**

Las dependencias ya están instaladas:
- `whatsapp-web.js` - Cliente de WhatsApp
- `qrcode-terminal` - Generador de códigos QR

---

## ▶️ Cómo Usar

### **Opción 1: Iniciar automáticamente**

Si tienes `ENABLE_WHATSAPP=true` en `.env`, el bot se iniciará automáticamente al iniciar el servidor.

Verás algo como:
```
🤖 Inicializando Bot de WhatsApp...
📱 Escanea este código QR con WhatsApp:
[código QR]
```

### **Opción 2: Iniciar manualmente**

Llamar al endpoint:

```bash
POST /api/whatsapp/conectar
```

Respuesta:
```json
{
  "mensaje": "Inicializando WhatsApp. Por favor escanea el código QR en la consola.",
  "estado": "inicializando"
}
```

---

## 📱 Pasos para Conectar

1. **Inicia el servidor backend**:
   ```bash
   npm start
   ```

2. **Verás un código QR en la consola** o puedes obtenerlo del endpoint `/api/whatsapp/conectar`

3. **Abre WhatsApp en tu teléfono**:
   - Toca los **tres puntos** (⋮) en la esquina superior derecha
   - Selecciona **"Dispositivos vinculados"**
   - Toca **"Vincular dispositivo"**
   - **Escanea el código QR** del servidor

4. **¡Listo!** El bot comenzará a recibir y responder mensajes automáticamente

---

## 🤖 Respuestas Automáticas del Chatbot

El bot responde automáticamente a:

| Palabra Clave | Respuesta |
|---------------|-----------|
| `hola`, `hi` | Bienvenida con menú de opciones |
| `servicios` | Lista de servicios disponibles |
| `horarios` | Horarios de atención |
| `agendar` | Instrucciones para agendar cita |
| `contacto` | Datos de contacto |
| `precio`, `costo` | Información de precios |
| `gracias`, `thanks` | Mensaje de despedida |

**Personaliza las respuestas** editando el objeto `respuestas` en:
```
Backend/services/whatsappService.js (línea ~95)
```

---

## 📡 Endpoints API

### **1. Conectar WhatsApp**
```
POST /api/whatsapp/conectar
```
Inicia la conexión (muestra QR en consola)

### **2. Obtener Estado**
```
GET /api/whatsapp/estado
```
Respuesta:
```json
{
  "conectado": true,
  "mensaje": "Conectado",
  "timestamp": "2026-03-06T..."
}
```

### **3. Enviar Mensaje**
```
POST /api/whatsapp/enviar
Body:
{
  "numero": "573001234567",  // Sin +
  "mensaje": "¡Hola! ¿Cómo estás?"
}
```

### **4. Obtener Chats Activos**
```
GET /api/whatsapp/chats
```
Respuesta:
```json
{
  "total": 5,
  "chats": [
    {
      "id": "573001234567@c.us",
      "nombre": "Juan Pérez",
      "ultimoMensaje": "¿A qué hora abren?",
      "noLidos": 2,
      "hora": 1234567890
    }
  ]
}
```

### **5. Obtener Historial de Chat**
```
GET /api/whatsapp/chats/573001234567@c.us
```

### **6. Desconectar**
```
POST /api/whatsapp/desconectar
```
Cierra la conexión

---

## 🎯 Flujo de Funcionamiento

```
Cliente WhatsApp
      ↓
   Envía mensaje
      ↓
WhatsApp Web.js recibe
      ↓
Verifica si hay respuesta automática
      ├─ SÍ → Responde automáticamente
      └─ NO → Notifica al odontólogo
      ↓
Odontólogo ve en panel
      ↓
Responde manualmente (POST /api/whatsapp/enviar)
      ↓
Cliente recibe respuesta
```

---

## 💾 Datos Persistentes

La sesión de WhatsApp se guarda en:
```
Backend/.wwebjs_auth/
```

No borres esta carpeta a menos que quieras desconectar.

---

## ⚙️ Personalización Avanzada

### **Agregar más respuestas automáticas**

En `Backend/services/whatsappService.js`, busca el método `getBotResponse`:

```javascript
const respuestas = {
  'hola': '¡Hola! 👋...',
  'tu_palabra_clave': 'Tu respuesta aquí',
  // Agrega más aquí
};
```

### **Enviar imágenes/documentos**

```javascript
// Desde el controlador
await whatsapp.sendMedia(chatId, '/ruta/al/archivo.pdf', 'Aquí está tu receta');
```

### **Mensajes automáticos por horario**

Puedes agregar lógica para enviar recordatorios:

```javascript
// En handleIncomingMessage
if (hora > '18:00') {
  mensaje = 'Estamos fuera de horario...';
}
```

---

## 🐛 Solución de Problemas

### **No genera código QR**
- Asegúrate que Puppeteer puede acceder: agrega `--no-sandbox` en las opciones
- Reinicia el servidor

### **El bot no responde mensajes**
- Verifica que `ENABLE_WHATSAPP=true` en `.env`
- Comprueba `GET /api/whatsapp/estado` 
- Revisa los logs del servidor

### **Sesión caducada**
- Escanea el código QR nuevamente
- Borra la carpeta `Backend/.wwebjs_auth/` y reinicia

### **Error de memoria**
- whatsapp-web.js usa memoria. En servidores pequeños puede ser un problema
- Solución futura: migrar a API oficial de Meta

---

## 🔐 Seguridad

**Recomendaciones:**
1. ✅ No compartas tokens o sesiones de WhatsApp
2. ✅ Cifra los números de teléfono en la BD
3. ✅ Agrega autenticación JWT a los endpoints de WhatsApp
4. ✅ Registra los mensajes en base de datos para auditoría

**Ejemplo de autenticación (próxima versión):**
```
POST /api/whatsapp/enviar
Headers:
  Authorization: Bearer <token>
```

---

## 📈 Próximos Pasos

1. **Migrar a API oficial de Meta** (más confiable para producción)
2. **Guardar mensajes en Base de Datos**
3. **Panel de chat en tiempo real** (Socket.io)
4. **Respuestas dinámicas** (consultar BD sobre horarios, citas, etc.)
5. **Integraciones con IA** (respuestas más naturales)

---

## 📞 Soporte

Para problemas, revisa:
- Logs del servidor (Consola Backend)
- Estado del API: `GET /api/whatsapp/estado`
- Documentación oficial: [whatsapp-web.js](https://github.com/pedrosans/whatsapp-web.js)

