'use client';

import React from 'react';

type Locale = 'pt' | 'en' | 'nl';

interface BookedRange {
  start: string | null;
  end: string | null;
  label?: string;
}

interface AvailabilityCalendarProps {
  booked: BookedRange[];
  months?: number;
  locale?: Locale;
}

interface NormalizedRange {
  start: number;
  end: number;
  label?: string;
}

const INTL_LOCALE: Record<Locale, string> = {
  pt: 'pt-PT',
  en: 'en-GB',
  nl: 'nl-NL',
};

const LEGEND_LABEL: Record<Locale, string> = {
  pt: 'Reservado',
  en: 'Booked',
  nl: 'Geboekt',
};

// Weekday header letters, Monday-first (Mon..Sun).
const WEEKDAY_LABELS: Record<Locale, readonly string[]> = {
  pt: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  nl: ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'],
};

/**
 * Build a UTC-midnight timestamp for a Y/M/D. Using UTC everywhere avoids
 * daylight-saving and timezone drift when comparing calendar days.
 */
function dayUTC(year: number, monthIndex: number, day: number): number {
  return Date.UTC(year, monthIndex, day);
}

/**
 * Parse an ISO "YYYY-MM-DD" (or ISO datetime) string into a UTC-midnight
 * timestamp for its calendar day. Returns null when unparseable.
 */
function parseISODay(value: string | null): number | null {
  if (!value) {
    return null;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
    return null;
  }
  const ts = dayUTC(year, monthIndex, day);
  // Guard against overflow like month=01 day=32 rolling forward.
  const check = new Date(ts);
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== monthIndex || check.getUTCDate() !== day) {
    return null;
  }
  return ts;
}

function normalizeRanges(booked: BookedRange[]): NormalizedRange[] {
  const result: NormalizedRange[] = [];
  for (const range of booked) {
    const start = parseISODay(range.start);
    const end = parseISODay(range.end);
    if (start === null || end === null) {
      continue;
    }
    result.push({
      start: Math.min(start, end),
      end: Math.max(start, end),
      label: range.label,
    });
  }
  return result;
}

function isBooked(ts: number, ranges: NormalizedRange[]): boolean {
  for (const range of ranges) {
    if (ts >= range.start && ts <= range.end) {
      return true;
    }
  }
  return false;
}

function bookedLabel(ts: number, ranges: NormalizedRange[]): string | undefined {
  for (const range of ranges) {
    if (ts >= range.start && ts <= range.end) {
      return range.label;
    }
  }
  return undefined;
}

/**
 * Monday-first offset (0..6) for the first day of a month.
 * JS getUTCDay(): Sun=0..Sat=6. Convert so Mon=0..Sun=6.
 */
function mondayFirstOffset(year: number, monthIndex: number): number {
  const jsDay = new Date(dayUTC(year, monthIndex, 1)).getUTCDay();
  return (jsDay + 6) % 7;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(dayUTC(year, monthIndex + 1, 0)).getUTCDate();
}

interface MonthGridProps {
  year: number;
  monthIndex: number;
  ranges: NormalizedRange[];
  todayTs: number;
  locale: Locale;
}

function MonthGrid({ year, monthIndex, ranges, todayTs, locale }: MonthGridProps): JSX.Element {
  const heading = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dayUTC(year, monthIndex, 1)));

  const offset = mondayFirstOffset(year, monthIndex);
  const total = daysInMonth(year, monthIndex);

  const cells: JSX.Element[] = [];

  // Leading blanks for the Monday-first offset.
  for (let i = 0; i < offset; i += 1) {
    cells.push(<div key={`blank-${i}`} className="aspect-square" aria-hidden="true" />);
  }

  for (let day = 1; day <= total; day += 1) {
    const ts = dayUTC(year, monthIndex, day);
    const booked = isBooked(ts, ranges);
    const isToday = ts === todayTs;
    const label = booked ? bookedLabel(ts, ranges) : undefined;

    const classes = [
      'flex aspect-square items-center justify-center rounded-md text-xs tabular-nums select-none',
      booked ? 'bg-brand text-white font-medium shadow-sm' : 'text-slate-700',
      isToday ? 'ring-2 ring-coral' : '',
    ]
      .filter(Boolean)
      .join(' ');

    cells.push(
      <div key={`day-${day}`} className={classes} title={label} aria-label={label}>
        {day}
      </div>,
    );
  }

  return (
    <div className="min-w-0">
      <h3 className="mb-2 text-sm font-semibold capitalize text-brand">{heading}</h3>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS[locale].map((weekday, index) => (
          <div
            key={`wd-${index}`}
            className="flex aspect-square items-center justify-center text-[0.65rem] font-medium uppercase text-slate-400"
          >
            {weekday}
          </div>
        ))}
        {cells}
      </div>
    </div>
  );
}

export default function AvailabilityCalendar({
  booked,
  months = 2,
  locale = 'pt',
}: AvailabilityCalendarProps): JSX.Element {
  const ranges = normalizeRanges(booked);

  const now = new Date();
  const todayTs = dayUTC(now.getFullYear(), now.getMonth(), now.getDate());

  const safeMonths = Number.isFinite(months) && months > 0 ? Math.floor(months) : 1;

  const startYear = now.getFullYear();
  const startMonth = now.getMonth();

  const grids: JSX.Element[] = [];
  for (let i = 0; i < safeMonths; i += 1) {
    const date = new Date(dayUTC(startYear, startMonth + i, 1));
    const year = date.getUTCFullYear();
    const monthIndex = date.getUTCMonth();
    grids.push(
      <MonthGrid
        key={`${year}-${monthIndex}`}
        year={year}
        monthIndex={monthIndex}
        ranges={ranges}
        todayTs={todayTs}
        locale={locale}
      />,
    );
  }

  const legend = LEGEND_LABEL[locale];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">{grids}</div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
        <span className="inline-block h-3 w-3 rounded-sm bg-brand" aria-hidden="true" />
        <span>{legend}</span>
      </div>
    </div>
  );
}
