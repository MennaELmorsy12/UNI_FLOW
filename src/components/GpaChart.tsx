import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { GpaPoint } from '../types/portal';

export function GpaChart({ data }: { data: GpaPoint[] }) {
  const gradientId = `chart-${useId().replace(/:/g, '')}`;
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  if (!data || data.length === 0) {
    return (
      <div className="empty-gpa-state" style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--muted)' }}>
        <p>No GPA records available.</p>
      </div>
    );
  }

  const points = data.map((item, index) => ({
    x: 42 + index * (544 / Math.max(data.length - 1, 1)),
    y: 140 - (item.value - 3) * 113,
  }));
  const path = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const previous = points[index - 1];
      const midpoint = (previous.x + point.x) / 2;
      return `C ${midpoint} ${previous.y} ${midpoint} ${point.y} ${point.x} ${point.y}`;
    })
    .join(' ');

  return (
    <figure className="gpa-chart" aria-label="Cumulative GPA trend by semester">
      <svg viewBox="0 0 618 178" role="group" aria-label="Interactive GPA chart" onMouseLeave={() => setActive(null)}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        {[3, 3.5, 4].map((value) => {
          const y = 140 - (value - 3) * 113;
          return (
            <g key={value}>
              <line x1="40" x2="589" y1={y} y2={y} stroke="var(--border)" strokeDasharray="4 5" />
              <text x="7" y={y + 4} className="chart-axis">
                {value.toFixed(1)}
              </text>
            </g>
          );
        })}
        <path d={`${path} L 586 140 L 42 140 Z`} fill={`url(#${gradientId})`} />
        <motion.path
          key={data.length}
          d={path}
          fill="none"
          stroke="var(--green)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: 'easeOut' }}
        />
        {points.map((point, index) => (
          <g
            key={data[index].semester}
            className="chart-point"
            tabIndex={0}
            role="button"
            aria-label={`${data[index].semester}: ${data[index].value.toFixed(2)} GPA`}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(active === index ? null : index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActive(active === index ? null : index);
              }
            }}
          >
            <circle cx={point.x} cy={point.y} r="15" fill="transparent" />
            <circle
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 || active === index ? 4.5 : 3}
              fill="var(--surface)"
              stroke="var(--green)"
              strokeWidth="2"
            />
            <text x={point.x} y="166" textAnchor="middle" className="chart-axis">
              {data[index].shortLabel}
            </text>
          </g>
        ))}
        {active !== null && points[active] && (
          <g className="chart-tooltip">
            <rect
              x={Math.min(Math.max(points[active].x - 36, 20), 536)}
              y={Math.max(points[active].y - 37, 0)}
              width="72"
              height="26"
              rx="5"
              fill="var(--text)"
            />
            <text
              x={Math.min(Math.max(points[active].x, 56), 572)}
              y={Math.max(points[active].y - 20, 17)}
              textAnchor="middle"
              fill="var(--surface)"
              fontSize="11"
              fontWeight="600"
            >
              {data[active].value.toFixed(2)} GPA
            </text>
          </g>
        )}
      </svg>
      <figcaption className="sr-only">
        {data.map((item) => `${item.semester}: ${item.value.toFixed(2)}`).join('; ')}. Maximum GPA: 4.0.
      </figcaption>
    </figure>
  );
}