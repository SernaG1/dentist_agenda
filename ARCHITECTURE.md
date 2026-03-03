# Estructura Modular MVC - Dentist Agenda

## 📋 Descripción General

Este proyecto ha sido refactorizado a una arquitectura **MVC modular** con separación clara de responsabilidades:

- **Backend**: Express.js + Sequelize (Node.js)
- **Frontend**: Angular 19 (TypeScript)
- **Base de datos**: MySQL

---

## 📁 Estructura del Proyecto Recomendada

```
dentist_agenda/
│
├── Backend/                          # 🔧 API REST Express.js
│   ├── controllers/                  # Lógica de negocio
│   │   ├── PacienteController.js
│   │   ├── DentistaController.js
│   │   ├── CitaController.js
│   │   └── ServicioController.js
│   │
│   ├── models/                       # Modelos Sequelize
│   │   ├── Paciente.js
│   │   ├── Dentista.js
│   │   ├── Cita.js
│   │   ├── Servicio.js
│   │   └── index.js
│   │
│   ├── routes/                       # Definición de rutas
│   │   └── routes.js
│   │
│   ├── middlewares/                  # Middlewares y validadores
│   │   ├── errorHandler.js           # Manejo centralizado de errores
│   │   ├── validators.js             # Validadores de express-validator
│   │   └── requestValidation.js      # Validaciones personalizadas
│   │
│   ├── config/                       # Configuración
│   │   ├── database.js
│   │   └── config.json
│   │
│   ├── migrations/                   # Migraciones de DB
│   │
│   ├── app.js                        # Configuración principal Express
│   ├── package.json
│   └── .env                          # Variables de entorno (no versionado)
│
├── Frontend/                         # 🎨 Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/                # Componentes de página
│   │   │   │   ├── home/
│   │   │   │   ├── login/
│   │   │   │   ├── agendar-cita/
│   │   │   │   ├── ver-citas/
│   │   │   │   ├── servicios/
│   │   │   │   ├── promociones/
│   │   │   │   └── quienes-somos/
│   │   │   │
│   │   │   ├── services/             # Servicios
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── citas.service.ts
│   │   │   │
│   │   │   ├── guards/               # Guars (autenticación, etc)
│   │   │   │   └── auth.guard.ts
│   │   │   │
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   │
│   │   ├── styles.css
│   │   ├── main.ts
│   │   └── index.html
│   │
│   ├── public/                       # Recursos estáticos
│   │   ├── images/
│   │   ├── videos/
│   │   ├── promociones/
│   │   └── quienes/
│   │
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── ARCHITECTURE.md                   # Este archivo
```

---

## ⚠️ IMPORTANTE: Duplicación de Carpetas

**Problema detectado**: Hay carpetas `/src` en la raíz del proyecto que duplican la estructura de `/Frontend/src`.

**Solución recomendada**:
1. **Mantener** la estructura dentro de `/Frontend`
2. **Eliminar** los archivos de la raíz: `src/`, `angular.json`, `tsconfig.app.json`, `tsconfig.json`, `tsconfig.spec.json`, `public/` (mantener solo en Frontend)
3. **Mantener** en la raíz solo: `Backend/`, `Frontend/`, `.gitignore`, `README.md`, `ARCHITECTURE.md`

Este cambio evitará confusión y mantendrá una estructura limpia.

---

## 🔧 Cambios Realizados en el Backend

### 1. **Controllers** (Nuevos)
- **PacienteController.js**: CRUD completo para pacientes
- **DentistaController.js**: CRUD completo para dentistas
- **CitaController.js**: CRUD completo para citas + cambio de estado
- **ServicioController.js**: CRUD completo para servicios

✨ **Características**:
- Métodos estáticos para cada acción
- Manejo de errores mediante `try-catch` con `next(error)`
- Inclusión de datos relacionados en consultas
- Filtros y búsquedas avanzadas

### 2. **Middlewares** (Nuevos)
- **errorHandler.js**: Manejo centralizado de errores
  - Captura errores de Sequelize
  - Retorna respuestas consistentes
  - Incluye stack traces en desarrollo

- **validators.js**: Validadores para cada entidad
  - Validaciones de creación y actualización
  - Validación de tipos de datos
  - Mensajes de error personalizados

- **requestValidation.js**: Middlewares personalizados
  - Validación de IDs
  - Validación de body vacío
  - Logging de acciones

### 3. **Routes (Refactorizado)**
- Separación clara por recurso (Pacientes, Dentistas, Citas, Servicios)
- Uso de validadores en cada ruta
- Métodos HTTP semánticos:
  - **POST** `/pacientes` - Crear
  - **GET** `/pacientes` - Listar
  - **GET** `/pacientes/:id` - Obtener uno
  - **PUT** `/pacientes/:id` - Actualizar
  - **DELETE** `/pacientes/:id` - Eliminar (desactivar)
  - **PATCH** `/pacientes/:id/restaurar` - Restaurar

### 4. **app.js (Mejorado)**
- Mejor organización de middlewares
- Rutas de health check y documentación
- Manejo de errores global
- Logging mejorado
- Variables de entorno

---

## 📊 Flujo de Solicitudes MVC

```
REQUEST
  ↓
MIDDLEWARES GLOBALES (cors, json, logging)
  ↓
ROUTES (rutas definidas)
  ↓
VALIDATORS (validación de entrada)
  ↓
CONTROLLER (lógica de negocio)
  ↓
MODELS (Sequelize)
  ↓
DATABASE (MySQL)
  ↓
RESPONSE
  ↓
ERROR HANDLER (si hay error)
```

---

## 🔐 Validadores Disponibles

### Paciente
```javascript
POST /api/pacientes  // Crear
- nombre (requerido, min 2)
- apellido (requerido, min 2)
- email (válido)
- telefono (formato válido)
- fecha_nacimiento (ISO8601)

PUT /api/pacientes/:id  // Actualizar
- Todos los campos opcionales
```

### Dentista
```javascript
POST /api/dentistas  // Crear
- nombre (requerido, min 2)
- apellido (requerido, min 2)
- email (válido)
- telefono (formato válido)
- especialidad (min 2)
- numero_licencia (únique)

PUT /api/dentistas/:id  // Actualizar
- Todos los campos opcionales
```

### Servicio
```javascript
POST /api/servicios  // Crear
- nombre (requerido, min 2)
- duracion_minutos (requerido, positivo)
- precio (decimal válido)
- descripcion (min 2)

PUT /api/servicios/:id  // Actualizar
- Todos los campos opcionales
```

### Cita
```javascript
POST /api/citas  // Crear
- paciente_id (requerido, entero)
- dentista_id (requerido, entero)
- servicio_id (requerido, entero)
- fecha_hora (requerido, ISO8601)
- duracion_minutos (positivo)
- motivo_consulta (min 2)

PATCH /api/citas/:id/estado  // Cambiar estado
- estado (pendiente|confirmada|completada|cancelada)

PUT /api/citas/:id  // Actualizar
- Todos los campos opcionales
```

---

## 📦 Dependencias Nuevas

```json
{
  "express-validator": "^7.0.0"  // Validación de datos
}
```

**Instalar**:
```bash
cd Backend
npm install
```

---

## 🚀 Cómo Usar

### Backend
```bash
cd Backend

# Desarrollo (con hot reload)
npm run dev

# Producción
npm start

# Migrar base de datos
npm run migrate
```

### Frontend
```bash
cd Frontend

# Desarrollo
npm start

# Build producción
npm run build

# Tests
npm test
```

---

## 📋 Próximas Mejoras Recomendadas

1. **Autenticación JWT**
   - Implementar middleware de autenticación
   - Proteger rutas sensibles
   - Refresh tokens

2. **Paginación**
   - Agregar limit y offset a listados
   - Metadata de paginación

3. **Filtros Avanzados**
   - Búsqueda por múltiples campos
   - Ordenamiento
   - Rangos de fechas

4. **Logging**
   - Winston o Morgan para logs
   - Auditoría de cambios

5. **Testing**
   - Tests unitarios (Jest)
   - Tests de integración

6. **API Documentation**
   - Swagger/OpenAPI
   - Documentación interactiva

7. **Caché**
   - Redis para sesiones
   - Caché de datos frecuentes

---

## ✅ Checklist de Implementación

- [x] Controllers para cada entidad
- [x] Middlewares de validación
- [x] Error handler centralizado
- [x] Routes refactorizadas
- [x] Validadores con express-validator
- [x] Mejora de app.js
- [ ] Autenticación JWT
- [ ] Tests unitarios
- [ ] Documentación API (Swagger)
- [ ] Eliminar carpetas duplicadas en Frontend

---

## 📝 Notas

- El proyecto sigue el patrón **MVC** (Model-View-Controller)
- **Separación de responsabilidades**: cada archivo tiene un propósito específico
- **Reutilización**: middlewares y validadores centralizados
- **Mantenibilidad**: código organizado y fácil de escalar

---

**Última actualización**: Marzo 1, 2026
**Versión**: 1.0.0
