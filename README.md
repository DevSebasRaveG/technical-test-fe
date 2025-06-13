# 🌟 Prueba Técnica React — Gestor de Tareas Compartidas

## 👋 Introducción

¡Gracias por participar en esta prueba técnica!

Tu reto será construir una aplicación React sencilla pero bien estructurada que permita a los usuarios agregar, visualizar y filtrar tareas. Esta prueba busca evaluar tu capacidad para estructurar aplicaciones modernas en React, aplicando buenas prácticas como separación de responsabilidades, principios SOLID, uso de hooks avanzados y arquitectura limpia.

---

## 🌟 Objetivo

Crea una aplicación React que permita:

- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar por estado: todas, completadas o pendientes

Además, debes:

- Usar **useReducer** para manejar el estado de las tareas
- Usar **useContext** para compartir el estado global entre varios componentes
- Crear tu propio `TasksContext` para administrar este estado de manera centralizada

---

## 🧐 Requisitos Técnicos

### ✅ Obligatorios

- Crear un contexto global con `useReducer` y `useContext`
- Manejar el estado de una lista de tareas y un filtro de visualización
- Crear al menos los siguientes componentes funcionales:
  - `AddTask`: para agregar nuevas tareas
  - `TaskList`: para listar y marcar tareas
  - `FilterControls`: para aplicar los filtros de visualización
- Estructura modular y reutilizable
- Código legible, organizado y siguiendo principios SOLID (en lo posible dentro del contexto de React)
- Separación clara de responsabilidades (por ejemplo, separar hooks personalizados, servicios, contextos, componentes visuales)
- Buen diseño con **Tailwind CSS** o **Material UI** (recomendado). También es válido usar CSS o SCSS.
- Uso de **variables de entorno (.env)** para configurar endpoints u otras constantes importantes. No subir este archivo al repositorio (ágregalo al `.gitignore`). Compártelo por separado al finalizar la prueba.

### 💡 Bonus (opcionales pero valorados)

- Uso de JavaScript
- ✨ **Integración con WebSocket:**
  - Conectarse a un servidor de WebSocket (la URL del backend será proporcionada, está montado en un contenedor Docker)
  - Emitir un mensaje al crear una tarea
  - Recibir nuevas tareas desde el servidor en tiempo real y actualizar el estado local

---

## 🛡️ Estructura de Proyecto Recomendada

No se impone una estructura estricta, pero se espera que tomes decisiones arquitectónicas profesionales y mantenibles. A modo de guía, esta es una estructura común en proyectos React escalables:

```
frontend/
├── src/
│   ├── components/           # Componentes visuales (AddTask, TaskList, etc.)
│   ├── context/              # Contextos globales (TasksContext)
│   ├── hooks/                # Hooks personalizados si los usas
│   ├── reducers/             # Reducers para manejo de estado (useReducer)
│   ├── services/             # Comunicación con WebSocket o APIs
│   ├── types/                # Tipos y modelos (si usas TypeScript)
│   ├── utils/                # Funciones auxiliares
│   ├── App.jsx               # Punto de entrada principal (o .tsx si usas TS)
│   └── main.jsx              # Inicialización de React (o .tsx)
├── public/                   # Recursos estáticos
└── tailwind.config.js        # Si usas Tailwind CSS
```

---

## 🚀 ¿Cómo ejecutar el proyecto?

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

> Asegúrate de que el backend (si aplica) esté levantado si decides usar WebSocket.
> Usa variables de entorno (.env) para configurar la URL del backend u otras configuraciones sensibles.

---

## ✅ Entrega

- Se debe **clonar el repositorio que se proporcionará para esta prueba**.
- Crear una nueva rama con tu nombre (`tu-nombre`).
- Subir tu código a esa rama.
- Hacer un **Pull Request** contra la rama `main` para su revisión.

Incluye en el repositorio:

- README explicando:
  - Cómo ejecutar la app
  - Estructura del proyecto
  - Explicación técnica breve de tus decisiones

---

## 📊 ¿Cómo será evaluada esta prueba?

Esta prueba no se trata solo de cumplir los requisitos funcionales. Se evaluarán aspectos como:

- **Arquitectura de componentes**: ¿Tu estructura facilita el mantenimiento y la escalabilidad?
- **Calidad del código**: legibilidad, modularidad, nombres claros, principios SOLID.
- **Uso adecuado de React**: comprensión de hooks, separación lógica de responsabilidades.
- **Estilo visual**: uso de Tailwind, Material UI o estilos personalizados bien organizados.
- **Experiencia de usuario**: interacción clara, flujo de tareas simple y fluido.
- **Bonus**: integración de WebSocket, documentación clara y buena presentación.

---

## 🚪 Extras que suman puntos

- Gestión de errores amigable para el usuario
- Organización en carpetas según responsabilidad

---

¡Buena suerte! 💪
