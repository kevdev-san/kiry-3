import Link from "next/link";

export default function Boton() {
  return (
<div className="mt-10 flex justify-center">
          <Link
            href="/lyrics"
            className="
              group
              relative
              overflow-hidden
              rounded-full
              border
              border-white/20
              bg-black/60
              px-8
              py-3
              text-sm
              uppercase
              tracking-[0.25em]
              text-white
              backdrop-blur-md
              transition-all
              duration-500
              hover:scale-105
              hover:bg-white/20
              hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
            "
          >
            <span className="relative z-10">
              dedicado para ti
            </span>

            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
                bg-gradient-to-r
                from-pink-300/10
                to-white/10
              "
            />
          </Link>
        </div>
        );
      }