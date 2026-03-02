# Pódium Académico  Plataforma MVP de Matemáticas

> **Preparación estratégica para Preunal y Preicfes**
> Modelo Freemium  Next.js + Firebase + Vercel

---

## Stack Tecnológico

| Capa | Tecnología | Costo |
|---|---|---|
| Frontend | Next.js (App Router) + Tailwind CSS | $0  Vercel plan gratuito |
| Auth | Firebase Auth (Google Login) | $0  Plan Spark |
| Base de Datos | Firebase Firestore | $0  bajo tráfico |
| Storage | Firebase Storage | $0  dentro de límites gratuitos |
| Videos | YouTube no listado | $0 |
| Pagos | Wompi (pago único) | $0 costo fijo  comisión por transacción |

---

## Estructura del Proyecto

```
mvp_learning/                           Raíz del proyecto Next.js

 app/                                App Router de Next.js
    (landing)/                      Landing pública (route group sin layout propio)
       page.tsx                    /  Hero, Problema, Precio, Confianza, CTA
   
    (auth)/                         Rutas de autenticación
       login/
          page.tsx                /login  Google Sign-In
       register/
           page.tsx                /register  Registro inicial
   
    (student)/                      Rutas protegidas para estudiantes
       modulos/
          [slug]/
              page.tsx            /modulos/:slug  Visualizador free/premium
       dashboard/
           page.tsx                /dashboard  Progreso del estudiante
   
    (admin)/                        Rutas protegidas para el profesor
       modulos/
          nuevo/
             page.tsx            /admin/modulos/nuevo  Crear módulo
          [id]/
              editar/
                  page.tsx        /admin/modulos/:id/editar  Editar módulo
       dashboard/
           page.tsx                /admin/dashboard  Métricas y estadísticas
   
    api/                            API Routes internas
       auth/                       Callbacks de Firebase Auth
       webhooks/
           wompi/                  Webhook de confirmación de pago Wompi
   
    layout.tsx                      Layout raíz (fuentes, providers)
    globals.css                     Estilos globales + Tailwind
    page.tsx                        Página de entrada (redirige a landing)

 components/                         Componentes reutilizables
    landing/                        Secciones de la landing page
                                        HeroSection, ProblemSection, HowItWorks
                                        PricingSection, TrustSection, CtaSection
    modules/                        Visualización de contenido académico
                                        ModuleCard, ContentViewer, QuestionBlock
                                        PremiumLock, VideoEmbed, SolutionReveal
    admin/                          Panel del profesor
                                        ModuleForm, MetricsCard, StatsChart
                                        StudentTable, ConversionRate
    auth/                           Autenticación
                                        GoogleLoginButton, AuthGuard
    ui/                             Componentes UI base compartidos
                                         Button, Card, Badge, Spinner, Modal

 lib/                                Lógica de negocio y servicios
    firebase/                       Configuración e instancias de Firebase
                                        config.ts, auth.ts, firestore.ts, storage.ts
    hooks/                          Custom React Hooks
                                        useAuth.ts, useModule.ts, useMetrics.ts
    utils/                          Funciones utilitarias
                                         formatDate.ts, trackEvent.ts, slugify.ts

 types/                              Definiciones TypeScript
                                         module.ts, user.ts, metrics.ts, payment.ts

 data/                               Datos estáticos (semilla migrada desde Jekyll)
    preicfes/                       Módulos ICFES Matemáticas
                                        tema-1-1-graficos.ts       free
                                        tema-1-2-conjuntos.ts      free
                                        tema-1-3-funciones.ts      premium preview
    preunal/                        Módulos Preunal Matemáticas
                                         tema-1-1-conjuntos-recta.ts  free

 public/
     img/                            Imágenes migradas desde Jekyll /img/
                                          graficos.png, barras.jpg, torta.jpg
                                          poligono.png, recta.png
```

---

## Rutas de la Aplicación

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing page completa con CTAs |
| `/login` | Público | Autenticación con Google |
| `/register` | Público | Registro inicial |
| `/modulos/:slug` | Estudiante | Visualizador de módulo (free o premium) |
| `/dashboard` | Estudiante | Progreso y módulos desbloqueados |
| `/admin/modulos/nuevo` | Profesor | Crear nuevo módulo (CRUD) |
| `/admin/modulos/:id/editar` | Profesor | Editar módulo existente |
| `/admin/dashboard` | Profesor | Métricas: registros, conversión, ingresos |

---

## Módulos de Contenido Disponibles (Semilla inicial)

Cada módulo incluye: teoría  ejemplo resuelto  510 preguntas tipo examen  solución detallada.

### ICFES Matemáticas

| Módulo | Tipo | Slug |
|---|---|---|
| Tema 1.1  Tipos de gráficos | **Gratuito** | `icfes-graficos` |
| Tema 1.2  Conjuntos y Diagramas de Venn | **Gratuito** | `icfes-conjuntos` |
| Tema 1.3  Gráficas de funciones | **Premium** | `icfes-funciones` |

### Preunal Matemáticas

| Módulo | Tipo | Slug |
|---|---|---|
| Tema 1.1  Conjuntos / Ecuación de la Recta | **Gratuito** | `preunal-conjuntos-recta` |

---

## Métricas MVP a Validar (60 días)

| Métrica | Señal positiva |
|---|---|
| Usuarios registrados | > 50 en 60 días |
| Clic en "Ver Premium" | > 5% de registrados |
| Consumo módulo gratuito | > 60% de registrados |
| Conversión a pago | > 3% de registrados |
| Ingresos confirmados |  35 pagos |

Eventos rastreados en Firestore: `user_registered`, `module_viewed`, `premium_clicked`, `payment_confirmed`.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Deploy

Deploy automático con [Vercel](https://vercel.com/new) conectando el repositorio. Plan gratuito suficiente para el MVP.
