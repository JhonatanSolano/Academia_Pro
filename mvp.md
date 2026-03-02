# MVP – Plataforma Premium de Matemáticas (Modelo Freemium)

## Proyecto: (Nombre sugerido)

### 🥇 Pódium Académico
_Subtítulo: Preparación estratégica para Preunal y Preicfes_

Alternativas:
- Vector 11
- Punto Crítico
- Exacta Prep
- Modo Examen

---

# 1️⃣ Objetivo del MVP

Validar en 60 días:

1. ¿Los estudiantes consumen contenido online?
2. ¿Algunos están dispuestos a pagar?
3. ¿El profesor puede operar la plataforma sin depender del desarrollador?
4. ¿El modelo es viable con bajo costo operativo?

Este MVP NO busca:
- Escalabilidad masiva
- LMS completo
- Suscripciones automáticas
- Gamificación avanzada

---

# 2️⃣ Stack Tecnológico (100% Gratuito para MVP)

## 🔹 Frontend
Next.js (React) + Vercel (plan gratuito)

Motivo:
- SEO
- SSR/SSG híbrido
- Despliegue sencillo
- Escalable si crece

Costo: $0

---

## 🔹 Autenticación
Firebase Auth (Google Login)

- Login con Google
- Manejo seguro de sesiones
- Sin backend complejo

Costo: $0 (Plan Spark)

---

## 🔹 Base de Datos
Firebase Firestore

Se usará para:
- Usuarios
- Estado (free / premium)
- Registro de actividad
- Eventos de métricas

Costo: $0 (para bajo tráfico)

---

## 🔹 Storage
Firebase Storage

Para:
- PDFs protegidos
- Recursos descargables

Costo: $0 (dentro de límites gratuitos)

---

## 🔹 Videos
YouTube no listado

- Gratis
- Fácil de usar
- Sin infraestructura propia

Costo: $0

---

## 🔹 Pagos
Wompi (pago único)

- Sin costo fijo
- Comisión por transacción
- Activación manual en MVP

Costo fijo: $0

---

# 3️⃣ Funcionalidades MVP

## 👨‍🎓 Estudiante

- Registro/Login (Google)
- Acceso a módulo gratuito
- Visualización de módulo premium bloqueado
- Pago único para desbloquear
- Acceso por 90 días

---

## 👨‍🏫 Profesor (Panel Básico)

CRUD mínimo:

- Crear módulo
- Editar título
- Subir PDF
- Pegar link de video
- Marcar como:
  - Gratis
  - Premium

Nada más.

---

# 4️⃣ Estructura del Módulo MVP

Cada módulo incluye:

1. Explicación breve
2. Ejemplo resuelto
3. 5–10 preguntas tipo examen
4. Solución detallada

Formato único para simplificar operación.

---

# 5️⃣ Sistema de Métricas (Validación Real)

La métrica es más importante que la arquitectura.

---

## 📊 Métricas Clave de Negocio

### 1. Registro
- Total usuarios registrados
- Nuevos registros por semana

### 2. Activación
- % que ingresan a un módulo después de registrarse

### 3. Consumo
- % que completan módulo gratuito
- Tiempo promedio en módulo

### 4. Intención de Pago
- % que hacen clic en “Ver Premium”
- % que inician proceso de pago

### 5. Conversión
- % que pagan
- Total ingresos

### 6. Retención
- % que regresan en la semana
- Número promedio de sesiones por usuario

---

# 6️⃣ Implementación de Métricas (Sin Herramientas Pagas)

## 🔹 Opción 1: Firebase Events Manuales

Registrar eventos en Firestore:

- user_registered
- module_viewed
- premium_clicked
- payment_confirmed

Cada evento guarda:
- userId
- fecha
- módulo
- tipo

---

## 🔹 Opción 2: Google Analytics (Gratis)

Para:
- Sesiones
- Tiempo en página
- Páginas vistas
- Flujo de navegación

Complementa Firestore.

---

# 7️⃣ Dashboard de Estadísticas (Profesor)

Crear un panel simple dentro del sistema:

## 📈 Dashboard MVP incluye:

1. Total estudiantes registrados
2. Total estudiantes premium
3. Ingresos totales
4. Módulo más visto
5. Tasa de conversión
6. Retención semanal básica

Visualización simple:
- Tarjetas con números
- Gráfica básica (Recharts o similar)
- Tabla simple

No necesitas BI avanzado.

---

# 8️⃣ Validación en 60 Días

El MVP es exitoso si:

- 3–5 estudiantes pagan
- Al menos 50% consumen módulo gratuito
- Hay interacción recurrente
- El profesor puede subir contenido solo

---

# 9️⃣ Roadmap de Construcción (6–8 semanas)

Semana 1–2:
- Branding
- Diseño UI
- Estructura de módulos

Semana 3–4:
- Next.js + Firebase Auth
- CRUD módulos
- Protección básica de contenido

Semana 5:
- Integración Wompi
- Activación manual premium

Semana 6:
- Sistema de eventos
- Dashboard básico

Semana 7–8:
- Pruebas
- Lanzamiento beta

---

# 🔟 Regla de Oro

No escalar infraestructura antes de validar pago.

Si no hay pagos:
- No se añaden features
- No se aumenta complejidad
- No se suben costos

---

# 11️⃣ Riesgos Principales

1. El profesor no produce contenido constante.
2. Precio mal calibrado.
3. Falta de promoción.
4. Baja percepción de valor frente al preu presencial.

---

# Conclusión Estratégica

Este MVP:

- Es técnicamente ligero
- Es casi gratuito
- Es validable
- Genera experiencia real en SaaS
- Puede escalar si hay mercado

El foco no es construir una gran plataforma.
El foco es validar que alguien paga.