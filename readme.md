# Dentist Agenda - Sistema de Gestión de Citas Odontológicas

Sistema completo full-stack para la gestión de citas en consultorios dentales.

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue una arquitectura **MVC modular** con:

- **Backend**: Express.js 5.x + Sequelize ORM + MySQL
- **Frontend**: Angular 19 + TypeScript + Angular Material
- **Base de Datos**: MySQL 8.0+

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o pnpm
- MySQL 8.0+

### Backend
```bash
cd Backend
npm install
npm run dev          # Desarrollo
npm start            # Producción
```

Servidor en `http://localhost:3000`

### Frontend
```bash
cd Frontend
npm install
npm start            # Desarrollo
npm run build        # Producción
```

App en `http://localhost:4200`

## 📚 Endpoints Principales API

### Pacientes
- `POST /api/pacientes` - Crear
- `GET /api/pacientes` - Listar
- `GET /api/pacientes/:id` - Obtener
- `PUT /api/pacientes/:id` - Actualizar
- `DELETE /api/pacientes/:id` - Desactivar
- `PATCH /api/pacientes/:id/restaurar` - Restaurar

### Dentistas, Servicios y Citas
Endpoints similares a Pacientes con rutas `/api/dentistas`, `/api/servicios`, `/api/citas`

## 🔐 Características

✅ Validación de datos en servidor con express-validator
✅ Manejo centralizado de errores
✅ Relaciones entre entidades (Sequelize)
✅ Soft delete (desactivación lógica)
✅ Timestamps automáticos
✅ CORS habilitado
✅ Arquietctura MVC modular

## 📖 Documentación

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para:
- Estructura detallada de carpetas
- Controllers, Middlewares, Models
- Validadores por entidad
- Flujo de solicitudes

## 📋 Historias de Usuario Implementadas

### 1. Agendamiento de Cita

En la sección de citas del sistema:

- El sistema muestra un formulario de agendamiento
- Todos los campos (nombre, fecha, hora y motivo) son obligatorios
- Al guardar la cita, el sistema muestra un mensaje de confirmación
- La cita queda visible en "Ver citas"

### 2. Visualización de Servicios Odontológicos

Página principal muestra servicios: diseño de sonrisa, blanqueamiento y ortodoncia.

- Tarjetas informativas con imagen y descripción
- Al hacer clic, navega a página con más información y video
- Diseño claro, atractivo y responsive

### 3. Contacto rápido por WhatsApp

Usuario puede contactar a la clínica directamente.

- Botón de WhatsApp visible en todo momento
- Abre conversación directa con mensaje predefinido
- No interfiere con la navegación

## 👥 Equipo

Proyecto de línea de énfasis - Semestre 7, 2026

## 📄 Licencia

ISC
- El botón no debe interferir con la navegación del sitio.