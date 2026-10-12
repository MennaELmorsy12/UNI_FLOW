import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Panel, PanelHeader } from '../ui/Panel';
import { Badge } from '../ui/Badge';
import { TextLink } from '../ui/Button';
import { GpaChart } from '../GpaChart';
import type { GpaPoint } from '../../types/portal';

export interface PerformanceWidgetProps {
  gpa: number;
  gpaHistory: GpaPoint[];
  diff?: number;
}

export function PerformanceWidget({
  gpa,
  gpaHistory,
  diff = 0.12,
}: PerformanceWidgetProps) {
  const { openDialog } = usePortal();
  const [chartRange, setChartRange] = useState('all');

  return (
    <Panel className="performance-panel">
      <PanelHeader
        title="Academic performance"
        aside={
          <select
            className="compact-select"
            aria-label="GPA chart range"
            value={chartRange}
            onChange={(event) => setChartRange(event.target.value)}
          >
            <option value="all">All semesters</option>
            <option value="recent">Last 3 semesters</option>
          </select>
        }
      />
      <div className="gpa-summary">
        <div>
          <strong>{gpa.toFixed(2)}</strong>
          <span>/ 4.00</span>
          <Badge tone="green">
            <TrendingUp size={11} />+{diff > 0 ? diff.toFixed(2) : '0.00'}
          </Badge>
        </div>
        <span>Small steps. Steady progress.</span>
      </div>
      <GpaChart data={chartRange === 'all' ? gpaHistory : gpaHistory.slice(-3)} />
      <div className="chart-bottom">
        <span>
          <i />
          Cumulative GPA
        </span>
        <TextLink onClick={() => openDialog({ type: 'grades' })}>View grades</TextLink>
      </div>
    </Panel>
  );
}
