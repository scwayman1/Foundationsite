import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

type ProgramAreaCardProps = {
  title: string;
  desc: string;
  stat: string;
  image: string;
  imagePosition?: string;
  statDetail?: string;
  icon?: ReactNode;
  gradient?: string;
  href?: string;
};

export default function ProgramAreaCard({
  title,
  desc,
  stat,
  image,
  imagePosition = "object-center",
  statDetail,
  icon,
  gradient,
  href = "/programs",
}: ProgramAreaCardProps) {
  return (
    <div className="group rounded-[24px] overflow-hidden bg-white border border-sky-100 shadow-sm hover:shadow-xl transition-all duration-500 card-hover">
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/72 via-[#06263a]/18 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-700 ease-out`}
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-[0.04em]">
            {stat}
          </span>
        </div>
        {icon && gradient && (
          <div className="absolute top-4 right-4 z-20">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
              {icon}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 md:p-7">
        <h3 className="text-lg font-bold text-[#08324a] mb-2 group-hover:text-[#0b6fa4] transition-colors duration-300">{title}</h3>
        <p className="text-sm text-slate-600 leading-7 mb-2">{desc}</p>
        {statDetail ? (
          <p className="text-xs text-slate-300 italic">{statDetail}</p>
        ) : (
          <Link href={href}>
            <span className="text-[#0b6fa4] text-sm font-semibold flex items-center cursor-pointer group/link">
              Learn more <ChevronRight size={14} className="ml-0.5 group-hover/link:translate-x-1 transition-transform" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
