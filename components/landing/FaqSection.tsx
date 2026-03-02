"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Necesito pagar para empezar a practicar?",
    answer:
      "No. Puedes acceder a un módulo completo por examen de forma totalmente gratuita, con teoría, ejercicios y soluciones.",
  },
  {
    question: "¿Qué incluye el plan Premium?",
    answer:
      "Acceso a todos los módulos disponibles, simulacros completos y soluciones detalladas paso a paso durante 90 días con un único pago.",
  },
  {
    question: "¿El pago es recurrente o de suscripción?",
    answer:
      "No. Es un pago único. No hay suscripciones, permanencias ni cobros automáticos. Pagas una vez y tienes acceso por 90 días.",
  },
  {
    question: "¿Cómo me registro?",
    answer:
      "Solo necesitas una cuenta de Google. Haces clic en 'Acceder gratis', inicias sesión con Google y listo.",
  },
  {
    question: "¿Puedo acceder desde el celular?",
    answer:
      "Sí. La plataforma es 100% responsive y está optimizada para móviles. Solo necesitas conexión a internet.",
  },
  {
    question: "¿Quién crea el contenido?",
    answer:
      "Todo el contenido es creado por un profesor con amplia experiencia en preparación para Preunal y Preicfes.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = `faq-${index}`;
  return (
    <div className="border-b border-border">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-text transition-colors hover:text-brand"
        >
          {faq.question}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-text-muted">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-bg-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-brand uppercase"
          >
            Preguntas frecuentes
          </motion.span>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            ¿Tienes dudas?
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          {faqs.map((faq, idx) => (
            <FaqItem
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() =>
                setOpenIndex(openIndex === idx ? null : idx)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
