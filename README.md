# 🎓 UAO Social - Red Social Universitaria

Una aplicación de red social para la Universidad Autónoma de Occidente (UAO) desarrollada con React, Redux y Firebase. Implementa estructuras de datos fundamentales (Lista, Pila y Cola) para gestionar publicaciones, notificaciones y mensajes directos.

## 📋 Características

### 1. **Posts - Estructura de Lista (FIFO)**
- Los usuarios pueden publicar mensajes
- Los posts se agregan al final de la lista
- Se pueden eliminar posts individuales
- Visualización ordenada de todas las publicaciones

### 2. **Notificaciones - Estructura de Pila (LIFO)**
- Sistema de notificaciones en tiempo real
- Las notificaciones se agregan al tope de la pila
- Operación Pop para eliminar la notificación del tope
- Contador de notificaciones no leídas en el header
- Marcado de notificaciones como leídas

### 3. **Mensajes Directos - Estructura de Cola (FIFO)**
- Cola de mensajes pendientes por enviar
- Los mensajes se agregan al final de la cola
- Operación Dequeue para enviar el siguiente mensaje
- Visualización del estado de cada mensaje

### 4. **Autenticación con Firebase**
- Registro de nuevos usuarios
- Inicio de sesión persistente
- Cierre de sesión con limpieza de datos

### 5. **Persistencia en Firebase Realtime Database**
- Guardado automático del estado global
- Recuperación de datos al iniciar sesión
- Sincronización en tiempo real

## 🛠️ Tecnologías Utilizadas

- **React 19** - Librería de UI
- **Redux Toolkit** - Gestión del estado global
- **Firebase** - Autenticación y base de datos en tiempo real
  - Firebase Authentication
  - Firebase Realtime Database
- **Vite** - Build tool y dev server
- **CSS3** - Estilos modernos y responsive

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd parcial-2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - El proyecto ya está configurado con Firebase
   - Las credenciales están en `src/firebase/config.js`

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes de React
│   ├── Login.jsx       # Formulario de inicio de sesión
│   ├── Register.jsx    # Formulario de registro
│   ├── Header.jsx      # Encabezado con navegación y contador
│   ├── Posts.jsx       # Lista de publicaciones
│   ├── Notifications.jsx # Pila de notificaciones
│   └── DirectMessages.jsx # Cola de mensajes
├── store/              # Redux Store
│   ├── store.ts        # Configuración del store
│   ├── slices/         # Slices de Redux
│   │   ├── authSlice.jsx
│   │   ├── postsSlice.jsx
│   │   ├── notificationsSlice.jsx
│   │   └── messagesSlice.jsx
│   └── thunks/         # Thunks para operaciones asíncronas
│       ├── loginThunk.jsx
│       ├── registerThunk.jsx
│       ├── logoutThunk.jsx
│       ├── postsThunk.jsx
│       ├── notificationsThunk.jsx
│       └── messagesThunk.jsx
├── firebase/           # Configuración de Firebase
│   └── config.js
├── App.jsx            # Componente principal
├── App.css            # Estilos principales
├── index.css          # Estilos globales
└── main.jsx           # Punto de entrada

```

## 🎯 Funcionalidades Principales

### Gestión de Posts (Lista)
```javascript
// Agregar post al final de la lista
dispatch(addPost({ content, author }));

// Eliminar post específico
dispatch(deletePost(postId));
```

### Gestión de Notificaciones (Pila)
```javascript
// Push - Agregar al tope
dispatch(pushNotification({ message, type }));

// Pop - Eliminar del tope
dispatch(popNotification());

// Marcar como leída
dispatch(markAsRead(notificationId));
```

### Gestión de Mensajes (Cola)
```javascript
// Enqueue - Agregar al final
dispatch(enqueueMessage({ to, content, from }));

// Dequeue - Enviar el siguiente
dispatch(dequeueMessage());
```

## 🔥 Firebase Configuration

La aplicación está configurada con:
- **Authentication**: Email/Password
- **Realtime Database**: Estructura de datos por usuario

### Estructura de la Base de Datos
```
users/
  └── {userId}/
      ├── posts/        # Array de posts
      ├── notifications/ # Array de notificaciones
      └── messages/     # Array de mensajes
```

## 🎨 Diseño y Estilos

- Diseño moderno y limpio
- Paleta de colores morada/azul
- Totalmente responsive
- Animaciones suaves
- Feedback visual en todas las acciones
- Componentes sin estilos inline (todo en CSS)

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Escritorio (> 1024px)

## 🧪 Testing Manual

Para probar la aplicación:

1. **Registro**: Crear una cuenta nueva
2. **Login**: Iniciar sesión con las credenciales
3. **Posts**: Crear varias publicaciones
4. **Notificaciones**: Ver cómo se generan automáticamente
5. **Mensajes**: Agregar mensajes a la cola y enviarlos
6. **Persistencia**: Cerrar sesión y volver a entrar para verificar que los datos persisten

## 🔒 Seguridad

- Autenticación mediante Firebase Authentication
- Validación de formularios en el cliente
- Manejo de errores de Firebase
- Mensajes de error informativos

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 👥 Autor

Proyecto desarrollado para el curso de Estructuras de Datos y Algoritmos 2 - UAO

## 📄 Licencia

Este proyecto es de uso académico para la Universidad Autónoma de Occidente.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
