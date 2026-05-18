"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
    { href: "/", label: "inicio" },
    { href: "/feelings", label: "feelings" },
    { href: "/lyrics", label: "lyrics" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-40 flex justify-center px-6 pt-6"
        >
            <nav
                className="flex items-center gap-1 rounded-full px-3 py-2"
                style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
                }}
            >
                {links.map(({ href, label }) => {
                    const isActive = pathname === href;

                    return (
                        <Link key={href} href={href} className="relative group">
                            <div
                                className="relative flex flex-col items-center px-5 py-2 rounded-full transition-all duration-300"
                                style={{
                                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                                }}
                            >
                                {/* Indicador activo */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: "rgba(255,255,255,0.10)",
                                            border: "1px solid rgba(255,255,255,0.18)",
                                        }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}

                                {/* Texto japonés — aparece en hover */}
                                <span
                                    className="relative z-10 font-mono transition-all duration-300 group-hover:opacity-60 opacity-0"
                                    style={{
                                        fontSize: 9,
                                        letterSpacing: "0.15em",
                                        color: "rgba(255,255,255,0.5)",
                                        height: 12,
                                        lineHeight: "12px",
                                    }}
                                >
                                </span>

                                {/* Label principal */}
                                <span
                                    className="relative z-10 transition-colors duration-300"
                                    style={{
                                        fontFamily: "var(--font-cormorant), serif",
                                        fontSize: 15,
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        letterSpacing: "0.12em",
                                        color: isActive
                                            ? "rgba(255,255,255,0.95)"
                                            : "rgba(255,255,255,0.45)",
                                    }}
                                >
                                    {label}
                                </span>

                                {/* Punto activo */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-dot"
                                        className="relative z-10 mt-1 rounded-full"
                                        style={{
                                            width: 3,
                                            height: 3,
                                            background: "rgba(249,168,201,0.8)",
                                        }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}

                                {/* Sin punto — espacio reservado para que no salte el layout */}
                                {!isActive && <div style={{ width: 3, height: 3, marginTop: 4 }} />}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </motion.header>
    );
}