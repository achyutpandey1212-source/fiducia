import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-bento border-[0.54px] border-bentoBorder rounded-2xl p-6 md:p-8 ${className}`}
  >
    {children}
  </div>
);

interface CreamSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const CreamSection: React.FC<CreamSectionProps> = ({ children, className = '', id }) => (
  <section
    id={id}
    className={`bg-cream text-inkOnCream rounded-3xl p-8 md:p-12 shadow-sm ${className}`}
  >
    {children}
  </section>
);

interface ReelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'white' | 'outline';
}

export const ReelButton: React.FC<ReelButtonProps> = ({
  label,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    variant === 'primary'
      ? 'bg-vermilion-500 hover:bg-vermilion-600 text-white'
      : variant === 'white'
      ? 'bg-white text-black hover:bg-zinc-200'
      : 'bg-transparent border border-bentoBorder text-white hover:border-vermilion-500';

  return (
    <button
      className={`group relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold overflow-hidden transition-colors ${baseStyles} ${className}`}
      {...props}
    >
      <span className="relative flex flex-col h-5 overflow-hidden">
        <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
      </span>
    </button>
  );
};

interface MetricDisplayProps {
  value: string;
  label: string;
  annotation?: string;
  accentColor?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  annotation,
  accentColor = 'text-white',
}) => (
  <div>
    <div className={`font-machina text-3xl md:text-4xl font-bold ${accentColor}`}>{value}</div>
    <div className="text-sm text-zinc-400 mt-1">{label}</div>
    {annotation && (
      <div className="font-caveat text-base text-vermilion-400 mt-1">{annotation}</div>
    )}
  </div>
);

interface CitationBadgeProps {
  docId: string;
  pageNumber: number;
  schemeName?: string;
}

export const CitationBadge: React.FC<CitationBadgeProps> = ({
  docId,
  pageNumber,
  schemeName,
}) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b9811f] border border-[#10b98140] text-fiduciarySafe text-xs font-medium">
    <span className="h-1.5 w-1.5 rounded-full bg-fiduciarySafe" />
    [{schemeName || docId}, Page {pageNumber}]
  </span>
);
