# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Peluquería Web

Es una página web que consta de una sola página para una peluquería de barrio de Córdoba.
Muestra servicios y precios de referencia, horarios, dirección, galería de trabajos, equipo y contacto directo por WhatsApp o formulario, de forma ordenada y concisa.

Es un proyecto de **Taller de Proyectos II** (Tecnicatura Universitaria en Tecnología de la Información, Universidad Kennedy).

## Tecnologías

React 19.3.1 | Vite 8.3.5 | Tailwind CSS | Node.js v22.17.0

## Estructura

peluqueria-react-app
    node_modules
    public
        equipos (fotos del equipo)
        trabajos (fotos de los trabajos)
    src
        assets
        App.css (Define los estilos visuales de la aplicación)
        App.jsx (Arma la página con los componentes)
        index.css (Se usa para Tailwind y los colores del proyecto)
        main.jsx (Punto de entrada de la aplicación react)
    .gitignore
    eslint.config.js
    index.html (Título y SEO básico)
    package-lock.json
    package.json
    README.md (Documentación del proyecto)
    vite.config.js (Plugins de React y Tailwind)
    package-lock.json
    package.json

## Dónde Editar el contenido

Todo el ocntenido está en `src/App.jsx`, salco donde se indique lo contrario. No es necesario modificar los componentes.

Qué cambiar | Dónde

Número y mensaje de WhatsApp | Constante `WA`. Formato 549351XXXXXXX sin `+` ni espacios (549+código de área+número)
Teléfono de la Portada | Componente `Portada`, variable `datos` (tiene que coincidir con `WA`)
Horarios y dirección de la portada | Componente `Portada`, variable `datos`
Dirección de la sección contacto | Componente `contacto`, texto que está encima del botón "Ver en el mapa"
Ubicación del botón "Ver en el mapa" | Constante `MAPA` (reemplazar por la dirección real)
Servicios y precios | Arreglo `SERVICIOS`: `[nombre, descripción, precio]`
Fotos de la galería | Arreglo `TRABAJOS`: guardar la foto en `public/trabajos/` y completar `src`, por ejemplo `"/trabajos/corte-1.jpg"`
Fotos del equipo | Arreglo `EQUIPO`: nombre, descripción, iniciales y `src` de la foto (en `public/equipo/`)
Redes sociales | Enlaces de Instagram y Facebook al final de `Contacto`
Nombre del negocio | Logo en el `Header`, pie de página en `App` y título en `index.html`
Título y descripción para buscadores | `index.html`
Colores | Variables al inicio de `src/index.css`

**Fotos**: Cada una de las imágenes deberían pesar menos de 200 KB y estar en formato JPG. El texto alternativo se crea a partir del campo `titulo` (en `TRABAJOS`) o `nombre` (en `EQUIPO`)

## Validación del Formulario

Campo | Regla

Nombre | Obligatorio, de 2 a 60 caracteres
Correo electrónico | Obligatorio, con el formato de `usuario@dominio.com`
Teléfono | Opcional, solo números `+` y `-`, de 8 a 15 dígitos
Servicio de interés | Opcional, lista desplegable
Mensaje | Obligatorio, mínimo 10 caracteres

## Limitaciones

- El formulario realiza la validación de datos, pero no envía nada a ningún servicio
- Los datos del negocio, tales como el nombre, dirección, horarios, precios, teléfono, redes y equipo son provisorios