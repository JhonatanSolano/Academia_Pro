import { GraduationCap } from "lucide-react";

const links = [
  { href: "#problema", label: "¿Por qué?" },
  { href: "#incluye", label: "Qué incluye" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#precio", label: "Precio" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-primary"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-base font-bold text-text-inverse"
          aria-label="Pódium Académico — Inicio"
        >
          <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
          Pódium Académico
        </a>

        {/* Nav */}
        <nav aria-label="Navegación del pie de página">
          <ul className="flex flex-wrap justify-center gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Pódium Académico. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
