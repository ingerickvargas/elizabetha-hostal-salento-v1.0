# 🏨 Elizabetha Hostal Salento - Sistema de Reservas

> Sistema completo de gestión de reservas para hostales con frontend React y backend Node.js

## ✨ Características

- ✅ **Reservas Online**: Clientes pueden reservar habitaciones en línea
- ✅ **Verificación de Disponibilidad**: Consulta disponibilidad en tiempo real
- ✅ **Panel Admin**: Gestión de reservas para administradores
- ✅ **Emails Automáticos**: Confirmación de reserva por email
- ✅ **Autenticación**: Sistema de login seguro con JWT
- ✅ **Base de Datos**: MongoDB para almacenamiento persistente
- ✅ **API REST**: Endpoints completos y documentados

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Opción 2: Manual

1. **Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edita .env con tus credenciales
   npm run dev
   ```

2. **Frontend (otra terminal):**
   ```bash
   npm install
   npm run dev
   ```

Abre **http://localhost:5173** en tu navegador.

## 📚 Documentación

| Documento | Descripción |
|-----------|------------|
| [INICIO_RAPIDO.md](INICIO_RAPIDO.md) | Guía de 3 pasos para empezar |
| [IMPLEMENTACION.md](IMPLEMENTACION.md) | Setup detallado completo |
| [RESUMEN_IMPLEMENTACION.md](RESUMEN_IMPLEMENTACION.md) | Resumen técnico de todo |
| [EJEMPLO_INTEGRACION.md](EJEMPLO_INTEGRACION.md) | Integración en componentes |
| [COMANDOS_UTILES.md](COMANDOS_UTILES.md) | Comandos de desarrollo |
| [backend/README.md](backend/README.md) | Documentación del backend |
| [COMPLETADO.md](COMPLETADO.md) | Resumen de implementación |
| [MANIFEST.txt](MANIFEST.txt) | Lista de archivos generados |

## 🔌 Endpoints API

### Reservas
```
POST   /api/bookings                    Crear reserva
GET    /api/bookings/availability       Verificar disponibilidad
GET    /api/bookings                    Obtener todas (admin)
GET    /api/bookings/:id                Obtener por ID
PUT    /api/bookings/:id                Actualizar estado (admin)
DELETE /api/bookings/:id                Cancelar (admin)
```

### Autenticación
```
POST   /api/auth/register               Registrar usuario
POST   /api/auth/login                  Login
```

## ⚙️ Configuración Requerida

### Backend - `backend/.env`
```env
MONGODB_URI=mongodb://localhost:27017/elizabetha-hostal
PORT=5000
NODE_ENV=development
JWT_SECRET=tu_secreto_aqui
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password
FRONTEND_URL=http://localhost:5173
```

### Frontend - `.env.local`
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Tecnologías

### Frontend
- React 19
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- Nodemailer

## 🔐 Seguridad

- Autenticación con JWT
- Contraseñas hasheadas con bcryptjs
- Control de acceso por roles (admin/user)
- CORS configurado
- Validación de datos en backend

## 📋 Requisitos Previos

- **Node.js** 16+ ([Descargar](https://nodejs.org))
- **MongoDB** ([Descargar](https://www.mongodb.com/try/download/community) o usar [Atlas](https://www.mongodb.com/cloud/atlas))
- **Gmail + App Password** ([Configurar](https://myaccount.google.com/apppasswords))

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo
cd backend && npm run dev  # Terminal 1
npm run dev               # Terminal 2 (frontend)

# Compilar para producción
npm run build

# Ver más comandos
cat COMANDOS_UTILES.md
```

## 📁 Estructura del Proyecto

```
elizabetha-hostal/
├── backend/                    # ⭐ Server Node.js
│   ├── src/
│   │   ├── config/            # Configuración
│   │   ├── models/            # Esquemas MongoDB
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── routes/            # Endpoints
│   │   ├── middleware/        # Autenticación
│   │   └── services/          # Emails
│   ├── package.json
│   └── README.md
│
├── src/                        # Frontend React
│   ├── pages/
│   ├── components/
│   ├── contexts/
│   └── utils/api.ts           # ⭐ Cliente API
│
└── 📚 Documentación
    ├── INICIO_RAPIDO.md
    ├── IMPLEMENTACION.md
    ├── EJEMPLO_INTEGRACION.md
    └── ...
```

## 🚨 Troubleshooting

| Problema | Solución |
|----------|----------|
| MongoDB no conecta | Inicia MongoDB: `mongod` |
| CORS error | Revisa `FRONTEND_URL` en `backend/.env` |
| Emails no se envían | Usa [App Password](https://myaccount.google.com/apppasswords) de Gmail |
| Puerto ocupado | Mata el proceso: `lsof -ti:5000 \| xargs kill -9` |

## 📈 Próximos Pasos

1. Panel de administración mejorado
2. Sistema de pagos integrado
3. Notificaciones SMS
4. App móvil
5. Optimizaciones de performance

## 📞 Soporte

Revisa la documentación:
- **Inicio rápido**: [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
- **Setup completo**: [IMPLEMENTACION.md](IMPLEMENTACION.md)
- **Comandos**: [COMANDOS_UTILES.md](COMANDOS_UTILES.md)

## 📄 Licencia

MIT

---

**Última actualización:** Febrero 2, 2026
**Versión:** 1.0.0
**Status:** ✅ Completado
