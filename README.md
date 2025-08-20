# Accionator 📈

> **Transforma tu forma de invertir con inteligencia artificial y datos en tiempo real**

¿Te imaginas tener un asistente financiero que te ayude a tomar decisiones de inversión más inteligentes? ¡Eso es exactamente lo que es Accionator!

Una plataforma moderna de análisis financiero construida con las últimas tecnologías web, diseñada para ayudar a inversores como tú a tomar decisiones basadas en datos a través de screening de acciones, seguimiento de portafolio y planificación de inversiones impulsada por IA.

## ✨ ¿Qué hace Accionator especial?

### 📊 **Stock Screener Inteligente**

¿Cansado de perder tiempo buscando las acciones perfectas? Nuestro screener te permite:

- Filtrar acciones con criterios avanzados y personalizables
- Datos de mercado en tiempo real que se actualizan automáticamente
- Visualizaciones interactivas que te ayudan a entender los datos de un vistazo
- Guardar tus filtros favoritos para uso futuro

### 📈 **Análisis Profundo de Acciones**

Conoce cada acción como si fuera tu mejor amigo:

- Información completa y perfiles detallados de cada empresa
- Noticias en tiempo real que afectan el mercado
- Herramientas de análisis técnico y fundamental
- Gráficos históricos que cuentan la historia completa

### 💼 **Gestión de Operaciones**

Mantén el control total de tu portafolio:

- Registra cada compra y venta con precisión
- Monitorea el rendimiento de tu portafolio en tiempo real
- Organiza tus operaciones con etiquetas personalizadas
- Analiza tu historial para mejorar tus decisiones futuras

### 🎯 **Planificación de Inversiones con IA**

Deja que la inteligencia artificial te ayude a planificar:

- Estrategias de inversión generadas por IA
- Evaluación de riesgos y proyecciones de ganancias/pérdidas
- Recomendaciones personalizadas basadas en tu perfil
- Sugerencias de optimización de portafolio

### 🔍 **Búsqueda y Analytics Inteligentes**

Aprende de tus patrones de búsqueda:

- Seguimiento de búsquedas de acciones y sectores
- Analytics de uso y insights valiosos
- Patrones históricos de búsqueda
- Recomendaciones personalizadas

## 🛠️ Tecnologías que hacen magia

### Frontend (Lo que ves)

- **Next.js 15** - El framework React más moderno con App Router
- **React 19** - React con características concurrentes de última generación
- **TypeScript** - Desarrollo seguro y sin errores de tipos
- **Tailwind CSS 4.1** - Estilos modernos y responsivos
- **shadcn/ui** - Componentes hermosos y accesibles construidos con Radix UI
- **Nivo** - Visualizaciones de datos que enamoran

### Backend (Lo que no ves pero hace todo funcionar)

- **Convex** - Base de datos en tiempo real que se actualiza automáticamente
- **Effect TS** - Programación funcional para lógica robusta
- **Finnhub** - Datos financieros reales y confiables

### Estado y Datos

- **TanStack React Query** - Gestión inteligente del estado del servidor
- **Convex React Query** - Sincronización de datos en tiempo real

### Autenticación e Internacionalización

- **Clerk** - Autenticación segura y fácil de usar
- **Tolgee** - Soporte multiidioma para llegar a más personas

### Herramientas de Desarrollo

- **ESLint** - Código limpio y consistente
- **Prettier** - Formato automático para código hermoso
- **pnpm** - Gestor de paquetes rápido y eficiente

## 🚀 ¡Empecemos la aventura!

### Lo que necesitas

- **Node.js 18+** - El motor de JavaScript
- **pnpm** (recomendado) o npm - Para instalar dependencias
- **Cuenta de Convex** - Para la base de datos en tiempo real
- **Cuenta de Clerk** - Para autenticación de usuarios
- **API key de Finnhub** - Para datos financieros reales

### Instalación paso a paso

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/yourusername/accionator.git
   cd accionator
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env.local` en el directorio raíz:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # Finnhub API
   FINNHUB_API_KEY=your_finnhub_api_key

   # PostHog Analytics (opcional)
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   POSTHOG_SECRET=your_posthog_secret

   # Tolgee i18n (opcional)
   NEXT_PUBLIC_TOLGEE_API_KEY=your_tolgee_api_key
   TOLGEE_API_KEY=your_tolgee_api_key
   ```

4. **Configura Convex**

   ```bash
   npx convex dev
   ```

5. **¡Inicia el servidor de desarrollo!**

   ```bash
   pnpm dev
   ```

6. **Abre tu navegador**
   Ve a [http://localhost:3000](http://localhost:3000) y ¡disfruta!

## 📁 Estructura del proyecto

```
accionator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Rutas internacionalizadas
│   │   │   ├── (protected)/   # Rutas protegidas
│   │   │   │   ├── screener/  # Screening de acciones
│   │   │   │   ├── analysis/  # Análisis de acciones
│   │   │   │   ├── operations/# Operaciones de portafolio
│   │   │   │   └── plan/      # Planificación de inversiones
│   │   │   └── layout.tsx
│   │   ├── api/               # Rutas de API
│   │   └── providers/         # Proveedores de contexto
│   ├── components/            # Componentes reutilizables
│   │   └── ui/               # Biblioteca de componentes UI
│   ├── hooks/                # Hooks personalizados de React
│   ├── lib/                  # Funciones utilitarias
│   ├── queries/              # Hooks de React Query
│   ├── mutations/            # Mutaciones de React Query
│   └── server/               # Utilidades del lado del servidor
├── convex/                   # Backend de Convex
│   ├── schema.ts            # Esquema de la base de datos
│   ├── queries/             # Consultas de la base de datos
│   ├── mutations/           # Mutaciones de la base de datos
│   └── helpers/             # Utilidades compartidas
├── public/                  # Activos estáticos
└── i18n/                   # Archivos de internacionalización
```

## 🗄️ Base de datos inteligente

La aplicación usa Convex con las siguientes tablas principales:

- **tokens** - Seguimiento de uso de tokens y suscripciones
- **historicalUsage** - Analytics de uso y reportes
- **stocksSearched** - Patrones de búsqueda de acciones
- **sectorsSearched** - Patrones de búsqueda de sectores
- **operations** - Operaciones de compra/venta del portafolio
- **operationTags** - Categorización de operaciones

## 🎨 Componentes UI hermosos

La aplicación usa una biblioteca de componentes personalizada construida con:

- **Radix UI** primitivos para accesibilidad
- **Tailwind CSS** para estilos modernos
- **Class Variance Authority** para variantes de componentes
- **Lucide React** para iconos hermosos

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas usando Tolgee:

- Inglés (por defecto)
- Español
- ¡Se pueden agregar más idiomas fácilmente!

## 📊 Visualización de datos que enamora

Los gráficos y visualizaciones están impulsados por Nivo:

- Gráficos de línea para tendencias de precios
- Gráficos de barras para comparaciones
- Gráficos de pastel para asignación de portafolio
- Visualizaciones interactivas personalizadas

## 🔐 Autenticación segura

La autenticación de usuarios está manejada por Clerk:

- Registro y login seguro de usuarios
- Rutas protegidas y middleware
- Gestión de perfiles de usuario
- Control de acceso basado en roles

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. ¡Despliegue automático en cada push a la rama principal!

### Otras plataformas

La aplicación se puede desplegar en cualquier plataforma que soporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 ¡Únete a la comunidad!

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/feature-increible`)
3. Haz commit de tus cambios (`git commit -m 'Agrega feature increíble'`)
4. Haz push a la rama (`git push origin feature/feature-increible`)
5. ¡Abre un Pull Request!

### Guías de desarrollo

- Sigue las mejores prácticas de TypeScript
- Usa ESLint y Prettier para formateo de código
- Escribe mensajes de commit significativos
- Prueba tus cambios exhaustivamente
- Actualiza la documentación según sea necesario

## 📝 Comandos disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo con Turbopack
pnpm build        # Construye para producción
pnpm start        # Inicia servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
pnpm prettier     # Formatea código con Prettier
pnpm check        # Ejecuta linting y formateo

# Internacionalización
pnpm i18n:login   # Login a Tolgee
pnpm i18n:pull    # Obtiene las últimas traducciones
pnpm i18n:push    # Envía nuevas traducciones
```

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - El framework React que hace todo posible
- [Convex](https://convex.dev/) - Backend en tiempo real que mola
- [Clerk](https://clerk.com/) - Autenticación que funciona de maravilla
- [Finnhub](https://finnhub.io/) - Datos financieros reales y confiables
- [Nivo](https://nivo.rocks/) - Visualizaciones que enamoran
- [Tailwind CSS](https://tailwindcss.com/) - CSS que hace la vida más fácil

## 📞 ¿Necesitas ayuda?

Si tienes preguntas o necesitas ayuda:

- Abre un issue en GitHub
- Revisa la documentación
- Únete a nuestras discusiones comunitarias

---

**Accionator** - Haciendo el análisis financiero accesible e inteligente. 📈✨

_¿Listo para transformar tu forma de invertir? ¡Empecemos! 🚀_
