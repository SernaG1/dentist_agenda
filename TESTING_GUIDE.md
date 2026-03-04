#  Guía de Verificación de Funcionalidad - Dentist Agenda

## Verificación Inicial del Proyecto

###  Paso 1: Instalar Dependencias

```bash
# Backend
cd Backend
npm install

# Frontend (en otra terminal)
cd Frontend
npm install
```

###  Paso 2: Configurar Base de Datos

**MySQL debe estar corriendo en tu máquina**

Opción A - MySQL local instalado:
```bash
# Windows CMD
mysql -u root -p
# Ingresar contraseña (vacía si es estándar)
```

Opción B - MySQL en Docker:
```bash
docker run --name mysql-dentist \
  -e MYSQL_ROOT_PASSWORD=password123 \
  -p 3306:3306 \
  -d mysql:8.0

# Actualizar Backend/.env:
DB_PASSWORD=password123
```

###  Paso 3: Verificar Archivo `.env`

Backend `Backend/.env` debe contener:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=        (tu contraseña MySQL)
DB_NAME=dentist_agenda
```

---

##  Verificación del Backend

### Iniciar el Servidor

```bash
cd Backend
npm run dev
```

**Salida esperada:**
```
==================================================
Servidor iniciando en puerto 3000
Ambiente: development
==================================================

✓ Base de datos 'dentist_agenda' verificada/creada
✓ Conexión a la base de datos establecida
✓ Base de datos sincronizada correctamente
✓ Sistema listo para recibir solicitudes
```

###  Prueba 1: Health Check

**URL**: `http://localhost:3000/health`

```bash
# Con curl
curl http://localhost:3000/health

# Respuesta esperada:
{
  "status": "OK",
  "mensaje": "Servidor funcionando correctamente",
  "timestamp": "2026-03-01T12:34:56.789Z"
}
```

### Prueba 2: Ruta Raíz

**URL**: `http://localhost:3000/`

```bash
curl http://localhost:3000/

# Respuesta esperada:
{
  "mensaje": "API de Agenda Odontológica - v1.0",
  "estado": "Activo",
  "version": "1.0.0",
  "endpoints": {
    "pacientes": "/api/pacientes",
    "dentistas": "/api/dentistas",
    "citas": "/api/citas",
    "servicios": "/api/servicios"
  },
  "documentacion": "/docs"
}
```

---

##  Pruebas CRUD Completas

###  Recurso: PACIENTES

#### CREATE: Crear Paciente

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "telefono": "+573001234567",
    "fecha_nacimiento": "1995-05-15",
    "direccion": "Calle 10 #20-30",
    "observaciones": "Paciente frecuente"
  }'

# Respuesta esperada: 201 Created
{
  "mensaje": "Paciente creado exitosamente",
  "paciente": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "telefono": "+573001234567",
    "fecha_nacimiento": "1995-05-15",
    "direccion": "Calle 10 #20-30",
    "observaciones": "Paciente frecuente",
    "activo": true,
    "createdAt": "2026-03-01T12:34:56.789Z",
    "updatedAt": "2026-03-01T12:34:56.789Z"
  }
}
```

#### READ: Obtener Todos los Pacientes

```bash
curl http://localhost:3000/api/pacientes

# Respuesta esperada: 200 OK
{
  "total": 1,
  "pacientes": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      ...
    }
  ]
}
```

####  READ: Obtener Paciente por ID

```bash
curl http://localhost:3000/api/pacientes/1

# Respuesta esperada: 200 OK
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  ...
}
```

####  UPDATE: Actualizar Paciente

```bash
curl -X PUT http://localhost:3000/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "email": "juancarlos@example.com"
  }'

# Respuesta esperada: 200 OK
{
  "mensaje": "Paciente actualizado exitosamente",
  "paciente": {
    "id": 1,
    "nombre": "Juan Carlos",
    "email": "juancarlos@example.com",
    ...
  }
}
```

#### DELETE: Eliminar Paciente (Soft Delete)

```bash
curl -X DELETE http://localhost:3000/api/pacientes/1

# Respuesta esperada: 200 OK
{
  "mensaje": "Paciente eliminado exitosamente"
}

# El paciente sigue en BD pero con activo: false
```

#### RESTORE: Restaurar Paciente

```bash
curl -X PATCH http://localhost:3000/api/pacientes/1/restaurar

# Respuesta esperada: 200 OK
{
  "mensaje": "Paciente restaurado exitosamente",
  "paciente": {
    "id": 1,
    "activo": true,
    ...
  }
}
```

---

###  Recurso: DENTISTAS

####  CREATE: Crear Dentista

```bash
curl -X POST http://localhost:3000/api/dentistas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María",
    "apellido": "García",
    "email": "maria@example.com",
    "telefono": "+573009876543",
    "especialidad": "Ortodoncia",
    "numero_licencia": "DEN-2024-001"
  }'

# Respuesta esperada: 201 Created
```

####  READ: Listar Dentistas

```bash
curl http://localhost:3000/api/dentistas

# Respuesta esperada: 200 OK con lista de dentistas
```

---

###  Recurso: SERVICIOS

#### CREATE: Crear Servicio

```bash
curl -X POST http://localhost:3000/api/servicios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Limpieza Dental",
    "descripcion": "Limpieza profunda de dientes",
    "duracion_minutos": 30,
    "precio": 50.00
  }'

# Respuesta esperada: 201 Created
```

---

###  Recurso: CITAS

####  CREATE: Agendar Cita

**Requisito**: Debe existir paciente (id=1), dentista (id=1) y servicio (id=1)

```bash
curl -X POST http://localhost:3000/api/citas \
  -H "Content-Type: application/json" \
  -d '{
    "paciente_id": 1,
    "dentista_id": 1,
    "servicio_id": 1,
    "fecha_hora": "2026-03-15T10:00:00Z",
    "duracion_minutos": 30,
    "motivo_consulta": "Revisión general",
    "observaciones": "Primer cita"
  }'

# Respuesta esperada: 201 Created
{
  "mensaje": "Cita creada exitosamente",
  "cita": {
    "id": 1,
    "paciente_id": 1,
    "dentista_id": 1,
    "servicio_id": 1,
    "fecha_hora": "2026-03-15T10:00:00Z",
    "estado": "pendiente",
    ...
  }
}
```

####  UPDATE: Cambiar Estado de Cita

```bash
curl -X PATCH http://localhost:3000/api/citas/1/estado \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "confirmada"
  }'

# Respuesta esperada: 200 OK
# Estados válidos: pendiente, confirmada, completada, cancelada
```

---

##  Pruebas de Validación

###  Caso: Campo Requerido Faltante

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan"
    # Falta 'apellido'
  }'

# Respuesta esperada: 400 Bad Request
{
  "errores": [
    {
      "type": "field",
      "value": undefined,
      "msg": "El apellido es requerido",
      "path": "apellido",
      "location": "body"
    }
  ]
}
```

###  Caso: Email Inválido

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "email-invalido"
  }'

# Respuesta esperada: 400 Bad Request
{
  "errores": [
    {
      "msg": "El email debe ser válido",
      "path": "email"
    }
  ]
}
```

###  Caso: Formato de Fecha Inválido

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "fecha_nacimiento": "15/05/1995"  # Formato inválido
  }'

# Respuesta esperada: 400 Bad Request
```

###  Caso: Body Vacío en Update

```bash
curl -X PUT http://localhost:3000/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -d '{}'

# Respuesta esperada: 400 Bad Request
{
  "error": "Body vacío",
  "detalles": "El cuerpo de la solicitud no puede estar vacío"
}
```

###  Caso: ID Inválido

```bash
curl http://localhost:3000/api/pacientes/abc

# Respuesta esperada: 400 Bad Request
{
  "error": "ID inválido",
  "detalles": "El ID debe ser un número entero positivo"
}
```

###  Caso: Recurso No Encontrado

```bash
curl http://localhost:3000/api/pacientes/999

# Respuesta esperada: 404 Not Found
{
  "error": "Paciente no encontrado"
}
```

---

##  Verificación del Frontend

### Iniciar Angular

```bash
cd Frontend
npm start
```

**URL**: `http://localhost:4200`

**Verificar que aparezca la aplicación en el navegador**

---

##  Herramientas Recomendadas para Pruebas

### Opción 1: Postman (Interfaz Gráfica)

1. Descargar: https://www.postman.com/downloads/
2. Crear nueva colección "Dentist Agenda"
3. Agregar requests para cada endpoint
4. Guardar y exportar colección

### Opción 2: Thunder Client (VS Code Extension)

1. Instalar extension "Thunder Client"
2. Crear requests directamente en VS Code
3. Más ligero que Postman

### Opción 3: REST Client (VS Code Extension)

1. Instalar "REST Client" de Huachao Mao
2. Crear archivo `test.rest` en Backend:

```rest
### Health Check
GET http://localhost:3000/health

### Crear Paciente
POST http://localhost:3000/api/pacientes
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567"
}

### Listar Pacientes
GET http://localhost:3000/api/pacientes

### Obtener Paciente
GET http://localhost:3000/api/pacientes/1

### Actualizar Paciente
PUT http://localhost:3000/api/pacientes/1
Content-Type: application/json

{
  "nombre": "Juan Carlos"
}

### Eliminar Paciente
DELETE http://localhost:3000/api/pacientes/1
```

3. Hace clic en "Send" para ejecutar cada request

---

##  Verificación de Base de Datos

### Ver Tablas Creadas

```sql
-- En MySQL terminal
USE dentist_agenda;
SHOW TABLES;

-- Resultado esperado:
-- | Tables_in_dentist_agenda |
-- |-----------------------|
-- | Citas                 |
-- | Dentistas             |
-- | Pacientes             |
-- | Servicios             |
```

### Ver Estructura de Tabla

```sql
DESC Pacientes;

-- Resultado esperado:
-- | Field           | Type        | Null | Key |
-- |-----------------|-------------|------|-----|
-- | id              | int         | NO   | PRI |
-- | nombre          | varchar     | NO   |     |
-- | apellido        | varchar     | NO   |     |
-- | email           | varchar     | YES  |     |
-- | ... etc ...     |             |      |     |
```

### Ver Datos Insertados

```sql
SELECT * FROM Pacientes;
SELECT * FROM Dentistas;
SELECT * FROM Citas;
SELECT * FROM Servicios;
```

---

## Checklist de Verificación Final

- [ ] Backend instalado y npm install ejecutado
- [ ] Frontend instalado y npm install ejecutado
- [ ] MySQL corriendo
- [ ] Backend/.env configurado correctamente
- [ ] Backend inicia sin errores (npm run dev)
- [ ] GET /health responde 200 OK
- [ ] POST /api/pacientes crea paciente correctamente
- [ ] GET /api/pacientes lista pacientes
- [ ] GET /api/pacientes/:id obtiene un paciente
- [ ] PUT /api/pacientes/:id edita paciente
- [ ] DELETE /api/pacientes/:id desactiva paciente
- [ ] PATCH /api/pacientes/:id/restaurar restaura paciente
- [ ] POST /api/dentistas crea dentista
- [ ] POST /api/servicios crea servicio
- [ ] POST /api/citas crea cita (requiere paciente, dentista, servicio)
- [ ] PATCH /api/citas/:id/estado cambia estado de cita
- [ ] Validadores rechazan datos inválidos
- [ ] Frontend inicia sin errores (npm start)
- [ ] Frontend accesible en http://localhost:4200
- [ ] Base de datos contiene tablas esperadas

---

##  Solución de Problemas

### Error: "Cannot find module 'express'"

```bash
cd Backend
npm install
```

### Error: "connect ECONNREFUSED 127.0.0.1:3306"

**MySQL no está corriendo**
- Inicia MySQL local o Docker
- Verifica credenciales en `.env`

###  Error: "Unexpected token < in JSON at position 0"

Probablemente HTML en lugar de JSON
- Verifica que el endpoint existe
- Revisa URL (¿está bien escrita?)

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

Backend CORS no está habilitado
- Verificar que `app.use(cors())` está en app.js

###  Puerto 3000 ya está en uso

```bash
# Windows - Ver proceso
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Cambiar puerto en Backend/.env
PORT=3001
```

---

##  Verificación Exitosa

Si todos los tests pasan:

**Backend funcionando correctamente**
**Database sincronizada**
**Validadores funcionando**
**CRUD operativo**
**Frontend accesible**

