import { useMemo } from 'react';
import { getMostSeverePerDay, severityRank } from '../../helpers';
import type { Diagnostic } from '../../types';
import { toKey } from './helpers';

export const useFusionTrendData = (diagnostics: Diagnostic[], selectedDate: Date | null) => {
  return useMemo(() => {
    const allDays = getMostSeverePerDay(diagnostics);

    let start: Date;
    let end: Date;

    if (selectedDate) {
      start = new Date(selectedDate);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 13);
      end.setHours(23, 59, 59, 999);
    } else {
      end = new Date();
      end.setHours(23, 59, 59, 999);
      start = new Date(end);
      start.setDate(end.getDate() - 13);
      start.setHours(0, 0, 0, 0);
    }

    const dayMap = new Map<string, Diagnostic>();
    allDays.forEach((d) => {
      const key = toKey(d.created_at); // ✅ now uses local time
      dayMap.set(key, d);
    });

    // Always create exactly 14 days
    const daysToShow = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const points = daysToShow.map((day) => {
      const key = toKey(day);
      const diagnostic = dayMap.get(key);
      if (diagnostic) {
        return {
          x: day,
          y: severityRank[diagnostic.severity],
          severity: diagnostic.severity,
          type: diagnostic.type,
        };
      } else {
        return {
          x: day,
          y: null,
          severity: 'none',
          type: '',
        };
      }
    });

    return { points, startDate: start };
  }, [diagnostics, selectedDate]);
};
