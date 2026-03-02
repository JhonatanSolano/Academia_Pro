# 🧱 MVP Landing — Estructura y Contenido

> **Propósito:** Validar si el usuario hace clic, se registra, consume y paga. No valida diseño.

---

## 🦸 Hero Section

### Título principal
> **"Refuerza Matemáticas para el Preunal con práctica estratégica"**

### Subtítulo
> Banco de preguntas, simulacros y soluciones detalladas creadas por profesor experto.

### CTAs
| Acción | Tipo |
|---|---|
| `Acceder gratis` | Primario — visible, alto contraste |
| `Ver contenido premium` | Secundario — texto o outline |

---

## ❗ Sección: El Problema

**¿Te pasa esto?**

- Entiendes el tema pero fallas en el examen
- Te quedas sin tiempo en los simulacros
- No sabes cómo abordar ciertos tipos de pregunta

---

## ✅ Sección: Qué Incluye

- ✔ Módulos por tema
- ✔ Ejercicios tipo examen
- ✔ Soluciones paso a paso
- ✔ Simulacros estratégicos
- ✔ Acceso online 24/7

---

## ⚙️ Sección: Cómo Funciona

1. Accedes **gratis** a un módulo completo
2. Practicas con preguntas de examen real
3. Si quieres más contenido, desbloqueas **premium**

---

## 💰 Sección: Precio

**Acceso Premium por 90 días**

```
$XX.000 COP
```

- ✅ Sin permanencia
- ✅ Sin pagos recurrentes
- ✅ Pago único

---

## 🤝 Sección: Confianza

- Profesor con X años de experiencia en preparación Preunal
- Estudiantes que han ingresado a la Universidad Nacional
- Testimonios reales *(agregar cuando existan)*

---

## 🚀 CTA Final

> **[Acceder al módulo gratuito]** ← botón grande, centrado, color primario

---

## 🎨 Principios UX

### No necesitas
- Animaciones pesadas
- Efectos de scroll complejos
- Diseño ultra elaborado

### Sí necesitas
- **Claridad** — el usuario entiende en 5 segundos qué ofreces
- **Botón visible** — CTA presente en hero y al final
- **Mobile-first** — el 80%+ del tráfico es móvil
- **Carga rápida** — menos de 3 segundos

---
# Sistema Visual MVP — Pódium Académico

## Objetivo del Sistema de Diseño

Crear una identidad:

- Académica pero moderna
- Clara y confiable
- Alta legibilidad para estudio prolongado
- Coherente entre landing pública y módulos internos
- Fácil de mantener en MVP

---

# 1️⃣ Evaluación de la Paleta Actual

## Lo que está bien

- Base slate oscuro (#0f172a) transmite seriedad
- Accent cyan (#06b6d4) es moderno
- Secondary índigo (#6366f1) funciona bien para educación
- Fondo claro (#f1f5f9) favorece lectura
- Tipografía Plus Jakarta Sans es excelente elección

## Lo que ajustaría

- Reducir cantidad de colores funcionales
- Separar mejor colores de marca vs colores de estado
- Evitar que el cyan domine demasiado (puede verse tech, no académico)
- Simplificar jerarquía visual

---

# 2️⃣ Paleta Optimizada (MVP)

## 🎨 Colores Principales

| Token | Hex | Uso |
|--------|--------|----------------|
| --primary | #0f172a | Navbar, footer, fondo oscuro |
| --brand | #4f46e5 | Color principal de marca (botones, CTA) |
| --accent | #06b6d4 | Links, detalles secundarios |
| --bg | #f8fafc | Fondo general |
| --card | #ffffff | Tarjetas |
| --text | #1e293b | Texto principal |
| --muted | #64748b | Texto secundario |

---

## 🎯 Colores de Estado

| Uso | Hex |
|--------|--------|
| Correcto | #16a34a |
| Error | #dc2626 |
| Advertencia | #f59e0b |
| Premium Badge | #fbbf24 |

Separar estados evita mezclar marca con funcionalidad.

---

# 3️⃣ Gradiente Hero Mejorado

En vez de radial intenso, usar algo más controlado:
´´´
    background: linear-gradient(
    135deg,
    #4f46e5 0%,
    #1e293b 100%
    );
´´´

Motivo:
- Más limpio
- Más profesional
- Más estable visualmente
- No distrae del mensaje

---

# 4️⃣ Estructura Visual Landing

## Hero

- Fondo gradiente suave
- Título grande (800)
- Subtítulo 400
- CTA primario en --brand
- CTA secundario outline

---

## Secciones

Alternar:

- Fondo blanco
- Fondo #f8fafc

No usar demasiados bloques oscuros.

---

# 5️⃣ Diseño de Módulos (Zona de Estudio)

Aquí es donde debes cambiar ligeramente la energía visual.

## Fondo del área de estudio

Usar:

--bg (#f8fafc)

No usar fondo oscuro para estudio prolongado.

---

## Tarjeta de módulo

- Fondo blanco
- Border: 1px #e2e8f0
- Hover: sombra suave
- Sin exceso de color

---

## Preguntas

Estructura clara:

- Fondo blanco
- Border izquierda 4px en color neutro
- Correcta: borde verde
- Incorrecta: borde rojo

No usar fondos verdes/rojos completos.
Solo borde o ícono.

---

# 6️⃣ Tipografía

## Fuente

Plus Jakarta Sans (Excelente elección)

Pesos recomendados:

| Peso | Uso |
|------|------|
| 300 | Subtítulos largos |
| 400 | Texto base |
| 600 | Botones y labels |
| 800 | Títulos |

---

## Ajustes recomendados

### Tamaños base

- Texto cuerpo: 16px
- Interlineado: 1.6
- Títulos H1: 36–42px
- H2: 28px
- H3: 22px

Evitar texto pequeño para estudio.

---

# 7️⃣ Jerarquía Visual Clave

En educación:

Claridad > estética

Por eso:

- Espaciado generoso
- Márgenes amplios
- No más de 2 colores fuertes por sección
- Nada de animaciones innecesarias

---

# 8️⃣ Consistencia Landing + App

Landing:
- Más expresiva
- Uso moderado de gradiente

App:
- Más limpia
- Más blanca
- Menos color
- Enfoque en lectura

---

# 9️⃣ Errores a Evitar

- Demasiado cyan (parece fintech)
- Demasiado dark mode (cansa para estudiar)
- Demasiadas sombras
- Badges brillantes en todas partes
- 5 colores compitiendo

---

# 🔟 Resumen Estratégico

La paleta actual es buena base.

Con estos ajustes:

- Se siente más académica.
- Más confiable.
- Más clara para estudiar.
- Más alineada con objetivo MVP.
- Más sostenible visualmente.

---

# 11️⃣ Identidad Final Recomendada

Base: Slate oscuro + Indigo como marca  
Apoyo: Cyan sutil  
Énfasis: Amarillo solo para premium  
Estudio: Blanco y gris suave  

Minimalismo inteligente.

---

## 📏 Métricas de Validación MVP

La landing **no valida diseño**. Valida:

| Métrica | Señal positiva |
|---|---|
| Clic en CTA | > 5% del tráfico |
| Registro | > 2% del tráfico |
| Consumo de contenido free | > 60% de registrados |
| Conversión a pago | > 3% de registrados |

---

## 📦 Inventario de Contenido Estático Existente (Academia Pro)

> Datos disponibles en `_data/preicfes.yml` y `_data/preunal.yml` del proyecto Jekyll actual.
> Este contenido puede migrarse directamente al MVP como semilla de datos.

### 📁 `_data/preicfes.yml` — Módulo ICFES Matemáticas

| Unidad | Tema | Recursos disponibles | Uso en MVP |
|---|---|---|---|
| **Unidad 1:** Interpretación y Representación | Tema 1.1: Tipos de gráficos | Teoría HTML, ejemplos con imágenes, ejercicio con respuesta oculta | → Módulo gratuito de demostración |
| **Unidad 1:** Interpretación y Representación | Tema 1.2: Conjuntos y Diagramas de Venn | Teoría HTML, ejemplo algebraico, ejercicio abierto | → Segundo tema del módulo free |
| **Unidad 1:** Interpretación y Representación | Tema 1.3: Gráficas de funciones | Teoría HTML, ejemplos con fórmulas LaTeX, ejercicio cuadrático resuelto | → Primer tema de bloqueo premium |

### 📁 `_data/preunal.yml` — Módulo Preunal Matemáticas

| Unidad | Tema | Recursos disponibles | Uso en MVP |
|---|---|---|---|
| **Unidad 1:** Conjuntos y Sistemas numéricos | Tema 1.1: Operaciones entre conjuntos / Ecuación de la Recta | Teoría con fórmula punto-pendiente, ejemplo resuelto, ejercicio perpendicular con respuesta | → Módulo gratuito Preunal |

### 🖼️ Imágenes estáticas disponibles (`/img/`)

| Archivo | Contenido | Uso en MVP |
|---|---|---|
| `graficos.png` | Diagrama de barras, polígono y torta | Ilustración Tema 1.1 ICFES |
| `barras.jpg` | Gráfico de barras (gastos empresa) | Ejemplo visual Tema 1.1 |
| `torta.jpg` | Gráfico de torta (porcentajes) | Ejemplo visual Tema 1.1 |
| `poligono.png` | Polígono de frecuencias | Ejemplo visual Tema 1.1 |
| `recta.png` | Gráfica pendiente positiva | Ilustración Tema Preunal |

### 📊 Resumen del inventario

| Recurso | Cantidad |
|---|---|
| Archivos YAML con contenido | 2 |
| Unidades de contenido | 2 |
| Temas con teoría + ejemplos + ejercicios | 4 |
| Imágenes de apoyo | 5 |
| **Temas aptos para módulo gratuito** | **2 (uno por examen)** |
| **Temas aptos para bloqueo premium** | **2** |

> 💡 **Conclusión:** Hay contenido suficiente para construir un módulo gratuito funcional (1 tema por examen) y al menos 1 tema de preview premium. Es suficiente para validar si el usuario paga antes de producir más contenido.