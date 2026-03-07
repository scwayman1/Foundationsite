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
    <div className="group rounded-2xl overflow-hidden bg-white border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-500 card-hover">
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${imagePosition} group-hover:scale-105 transition-transform duration-700 ease-out`}
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.15] text-white text-xs font-medium">
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
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-2">{desc}</p>
        {statDetail ? (
          <p className="text-xs text-slate-300 italic">{statDetail}</p>
        ) : (
          <Link href={href}>
            <span className="text-blue-600 text-sm font-semibold flex items-center cursor-pointer group/link">
              Learn more <ChevronRight size={14} className="ml-0.5 group-hover/link:translate-x-1 transition-transform" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
