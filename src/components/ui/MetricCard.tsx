import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | React.ReactNode;
  barColor?: string;
  valueColor?: string;
  unit?: string;
  prefix?: string;
}

export function MetricCard({ title, value, barColor = 'bg-outline/50', valueColor = 'text-on-surface-variant', unit, prefix }: MetricCardProps) {
  return (
    <div className="bg-surface-container-high/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[116px] border border-white/5">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${barColor}`}></div>
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{title}</span>
      <div className="flex items-baseline gap-2 mt-3">
        <span className={`font-display-lg text-display-lg ${valueColor}`}>
          {prefix}{value}{unit}
        </span>
      </div>
    </div>
  );
}
