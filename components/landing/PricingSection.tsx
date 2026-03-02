"use client";

import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "$0",
    period: "para siempre",
    description: "Empieza a practicar ahora sin ningún compromiso.",
    features: [
      "1 módulo completo por examen",
      "Teoría + ejemplos resueltos",
      "Ejercicios tipo examen",
      "Soluciones detalladas",
    ],
    cta: "Acceder gratis",
    ctaHref: "/login",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$XX.000",
    period: "COP · Pago único · 90 días",
    description: "Desbloquea todo el contenido y maximiza tu preparación.",
    features: [
      "Todos los módulos incluidos",
      "Simulacros completos",
      "Soluciones paso a paso",
      "Acceso 24/7 por 90 días",
      "Sin pagos recurrentes",
      "Sin permanencia",
    ],
    cta: "Desbloquear Premium",
    ctaHref: "/login",
    highlighted: true,
  },
];

export default function PricingSection() {
  return (
    <section
      id="precio"
      aria-labelledby="pricing-heading"
      className="bg-bg-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-brand uppercase"
          >
            Planes
          </motion.span>
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            Elige tu plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-text-muted"
          >
            Accede gratis o desbloquea todo con un único pago.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md ${
                plan.highlighted
                  ? "border-brand bg-card ring-2 ring-brand/20"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white">
                    <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                    Recomendado
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-text">{plan.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-text">
                  {plan.price}
                </span>
                <span className="text-sm text-text-muted">{plan.period}</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3" role="list">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm text-text"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand-light"
                    : "border border-border bg-bg text-text hover:bg-bg-alt"
                }`}
                aria-label={`${plan.cta} — Plan ${plan.name}`}
              >
                {plan.cta}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
