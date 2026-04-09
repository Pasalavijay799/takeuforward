export type CalendarDay = {
  date: Date;
  key: string;
  label: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function toDayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function fromDayKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getMonthKey(date: Date) {
  return toDayKey(startOfMonth(date)).slice(0, 7);
}

export function compareDayKeys(left: string, right: string) {
  return left.localeCompare(right);
}

export function buildCalendarDays(anchorDate: Date) {
  const monthStart = startOfMonth(anchorDate);
  const mondayIndex = (monthStart.getDay() + 6) % 7;
  const gridStart = addDays(monthStart, -mondayIndex);
  const todayKey = toDayKey(new Date());

  return Array.from({ length: 42 }, (_, offset): CalendarDay => {
    const date = addDays(gridStart, offset);

    return {
      date,
      key: toDayKey(date),
      label: date.getDate(),
      isCurrentMonth: date.getMonth() === anchorDate.getMonth(),
      isToday: toDayKey(date) === todayKey,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    };
  });
}

export function normalizeRange(start: string, end: string) {
  return compareDayKeys(start, end) <= 0
    ? { start, end }
    : { start: end, end: start };
}

export function isDayWithinRange(dayKey: string, start: string, end: string) {
  return compareDayKeys(dayKey, start) >= 0 && compareDayKeys(dayKey, end) <= 0;
}

export function countRangeDays(start: string, end: string) {
  const startDate = fromDayKey(start);
  const endDate = fromDayKey(end);
  const dayMs = 1000 * 60 * 60 * 24;

  return Math.round((endDate.getTime() - startDate.getTime()) / dayMs) + 1;
}

export function formatMonthName(date: Date) {
  return monthFormatter.format(date);
}

export function formatDateLabel(dayKey: string) {
  return longDateFormatter.format(fromDayKey(dayKey));
}

export function formatRangeLabel(start: string, end?: string | null) {
  if (!end || start === end) {
    return formatDateLabel(start);
  }

  const startDate = fromDayKey(start);
  const endDate = fromDayKey(end);

  if (startDate.getFullYear() === endDate.getFullYear()) {
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${shortDateFormatter.format(startDate)} - ${endDate.getDate()}, ${endDate.getFullYear()}`;
    }

    return `${shortDateFormatter.format(startDate)} - ${shortDateFormatter.format(endDate)}, ${endDate.getFullYear()}`;
  }

  return `${longDateFormatter.format(startDate)} - ${longDateFormatter.format(endDate)}`;
}
