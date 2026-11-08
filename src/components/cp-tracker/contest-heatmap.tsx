'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { subDays, format } from 'date-fns';

const today = new Date();
const data = Array.from({ length: 365 }).map((_, i) => {
  const date = subDays(today, i);
  return {
    date: format(date, 'yyyy-MM-dd'),
    count: Math.floor(Math.random() * 5),
  };
}).reverse();

export function ContestHeatmap() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <TooltipProvider delayDuration={100}>
        <Heatmap data={data} />
      </TooltipProvider>
    </div>
  );
}

function Heatmap({ data }: { data: { date: string; count: number }[] }) {
  const weeks = [];
  let currentWeek = [];
  let firstDayOfWeek = new Date(data[0].date).getDay();

  // Add padding for the first week if it doesn't start on Sunday
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (const day of data) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/40';
    if (count <= 1) return 'bg-primary/25 hover:bg-primary/35';
    if (count <= 2) return 'bg-primary/50 hover:bg-primary/60';
    if (count <= 3) return 'bg-primary/75 hover:bg-primary/85';
    return 'bg-primary hover:bg-primary/90';
  };

  const monthPositions: { [key: string]: number } = {};
  data.forEach((day, index) => {
    const weekIndex = Math.floor((index + firstDayOfWeek) / 7);
    const month = format(new Date(day.date), 'MMM');
    if (monthPositions[month] === undefined) {
      monthPositions[month] = weekIndex;
    }
  });

  return (
    <div className="flex flex-col gap-2 min-w-[700px]">
      <div className="grid grid-flow-col justify-start gap-1">
        {weeks[0].map((_, colIndex) => {
          const matchingMonth = Object.keys(monthPositions).find((m) => monthPositions[m] === colIndex);
          return (
            <div key={colIndex} className="w-4 text-[10px] text-muted-foreground text-center">
              {matchingMonth ? matchingMonth.slice(0, 3) : ''}
            </div>
          );
        })}
      </div>

      <div className="grid grid-flow-col justify-start gap-1">
        <div className="flex flex-col gap-1 pr-1">
          {['', 'M', '', 'W', '', 'F', ''].map((day, i) => (
            <div key={i} className="h-3.5 w-3.5 text-[9px] text-muted-foreground text-center leading-[14px]">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="h-3.5 w-3.5 rounded-sm bg-transparent"
                  />
                );
              }

              return (
                <Tooltip key={day.date}>
                  <TooltipTrigger asChild>
                    <div
                      className={`h-3.5 w-3.5 rounded-sm transition-all duration-150 cursor-pointer ${getColor(
                        day.count
                      )}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs font-mono">
                    <span className="font-semibold text-primary">{day.count} submissions</span> on{' '}
                    {format(new Date(day.date), 'MMM d, yyyy')}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
