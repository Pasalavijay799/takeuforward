"use client";

import Image, { type StaticImageData } from "next/image";
import {
  startTransition,
  type CSSProperties,
  useEffect,
  type PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";
import {
  addMonths,
  buildCalendarDays,
  countRangeDays,
  formatDateLabel,
  formatMonthName,
  formatRangeLabel,
  getMonthKey,
  isDayWithinRange,
  normalizeRange,
  startOfMonth,
} from "@/lib/calendar";
import { getDailyWeather } from "@/lib/dayWeather";
import winterHeroPhoto from "../alexandra-diaconu-x0jdZ03NsSc-unsplash.jpg";
import springHeroPhoto from "../gettyimages-108310740-612x612.jpg";
import autumnHeroPhoto from "../premium_photo-1664300548468-f83f7927c7f7.webp";
import summerHeroPhoto from "../phillips-jacobe-3Oq0jNYLp28-unsplash.jpg";
import { getMonthHero } from "./MonthHeroArtwork";
import styles from "./WallCalendar.module.css";

const STORAGE_KEY = "wall-calendar-notes-v1";
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const SWIPE_ACTIVATION_PX = 12;
const SWIPE_TRIGGER_PX = 86;
const SWIPE_MAX_PX = 160;

type NotesStore = Record<string, string>;
type MonthMotion = "next" | "prev";
type MobileView = "calendar" | "notes";
type HeroPhotoAsset = {
  position: string;
  scale: string;
  src: StaticImageData;
};
type SwipeGesture = {
  dragging: boolean;
  pointerId: number;
  startX: number;
  startY: number;
};

function getHeroPhotoAsset(monthIndex: number): HeroPhotoAsset {
  if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) {
    return {
      src: winterHeroPhoto,
      position: "center 46%",
      scale: "scale(1.03)",
    };
  }

  if (monthIndex >= 2 && monthIndex <= 4) {
    return {
      src: springHeroPhoto,
      position: "center 34%",
      scale: "scale(1.02)",
    };
  }

  if (monthIndex >= 5 && monthIndex <= 7) {
    return {
      src: summerHeroPhoto,
      position: "center 44%",
      scale: "scale(1.04)",
    };
  }

  return {
    src: autumnHeroPhoto,
    position: "center 38%",
    scale: "scale(1.03)",
  };
}

function buildSelectionMeta(rangeStart: string | null, rangeEnd: string | null) {
  if (rangeStart && rangeEnd) {
    const totalDays = countRangeDays(rangeStart, rangeEnd);
    return `${totalDays} ${totalDays === 1 ? "day" : "days"} selected`;
  }

  if (rangeStart) {
    return `Starting on ${formatDateLabel(rangeStart)}`;
  }

  return "Pick a start and end date to attach a note.";
}

export function WallCalendar() {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [notesByKey, setNotesByKey] = useState<NotesStore>({});
  const [notesReady, setNotesReady] = useState(false);
  const [monthMotion, setMonthMotion] = useState<MonthMotion>("next");
  const [mobileView, setMobileView] = useState<MobileView>("calendar");
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingMonth, setIsDraggingMonth] = useState(false);
  const swipeGestureRef = useRef<SwipeGesture | null>(null);
  const blockDayClickRef = useRef(false);

  const days = buildCalendarDays(visibleMonth);
  const visibleMonthName = formatMonthName(visibleMonth);
  const visibleMonthKey = getMonthKey(visibleMonth);
  const heroPhotoAsset = getHeroPhotoAsset(visibleMonth.getMonth());
  const heroTheme = getMonthHero(visibleMonth.getMonth());
  const sheetMotionClass =
    monthMotion === "prev" ? styles.sheetMotionPrev : styles.sheetMotionNext;
  const monthMotionClass =
    monthMotion === "prev" ? styles.monthMotionPrev : styles.monthMotionNext;
  const heroArtMotionClass =
    monthMotion === "prev" ? styles.heroArtPrev : styles.heroArtNext;
  const heroStyles = {
    "--hero-accent": heroTheme.accentEnd,
    "--hero-accent-soft": heroTheme.accentStart,
    "--hero-glow": heroTheme.glowColor,
  } as CSSProperties;
  const sheetGestureStyles = {
    "--sheet-drag-x": `${dragOffset}px`,
  } as CSSProperties;
  const heroPhotoStyles = {
    objectPosition: heroPhotoAsset.position,
    transform: heroPhotoAsset.scale,
  } as CSSProperties;
  const selectionMeta = buildSelectionMeta(rangeStart, rangeEnd);
  const previewRange =
    rangeStart && !rangeEnd && hoveredDay
      ? normalizeRange(rangeStart, hoveredDay)
      : null;
  const activeRange =
    rangeStart && rangeEnd
      ? { start: rangeStart, end: rangeEnd }
      : previewRange ??
        (rangeStart ? { start: rangeStart, end: rangeStart } : null);
  const activeNoteKey = rangeStart
    ? `selection:${rangeStart}:${rangeEnd ?? rangeStart}`
    : `month:${visibleMonthKey}`;
  const activeNoteValue = notesByKey[activeNoteKey] ?? "";
  const notesTitle = rangeStart
    ? rangeEnd
      ? `Notes for ${formatRangeLabel(rangeStart, rangeEnd)}`
      : `Notes for ${formatRangeLabel(rangeStart)}`
    : `${visibleMonthName} notes`;
  const notesScopeLabel = rangeStart
    ? rangeEnd
      ? formatRangeLabel(rangeStart, rangeEnd)
      : formatRangeLabel(rangeStart)
    : `${visibleMonthName} ${visibleMonth.getFullYear()}`;
  const notesModeLabel = rangeStart
    ? rangeEnd
      ? "Range note"
      : "Day note"
    : "Monthly memo";
  const notesHint = rangeStart
    ? rangeEnd
      ? "This note stays attached to the selected range."
      : "Select an end date, or keep this as a single-day note."
    : "Monthly notes follow the visible month and are stored locally.";
  const notesPanelClassName = [
    styles.notesPanel,
    mobileView === "calendar" ? styles.mobilePanelHidden : "",
  ]
    .filter(Boolean)
    .join(" ");
  const calendarPanelClassName = [
    styles.calendarPanel,
    mobileView === "notes" ? styles.mobilePanelHidden : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    try {
      const storedNotes = window.localStorage.getItem(STORAGE_KEY);

      if (storedNotes) {
        setNotesByKey(JSON.parse(storedNotes) as NotesStore);
      }
    } catch {
      setNotesByKey({});
    } finally {
      setNotesReady(true);
    }
  }, []);

  useEffect(() => {
    if (!notesReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notesByKey));
  }, [notesByKey, notesReady]);

  function updateVisibleMonth(nextMonth: Date, motion: MonthMotion) {
    setMonthMotion(motion);
    startTransition(() => {
      setVisibleMonth(nextMonth);
    });
  }

  function changeMonth(offset: number) {
    updateVisibleMonth(
      addMonths(visibleMonth, offset),
      offset < 0 ? "prev" : "next",
    );
  }

  function jumpToToday() {
    const todayMonth = startOfMonth(new Date());

    if (todayMonth.getTime() === visibleMonth.getTime()) {
      return;
    }

    updateVisibleMonth(
      todayMonth,
      todayMonth.getTime() < visibleMonth.getTime() ? "prev" : "next",
    );
  }

  function armBlockedDayClick() {
    blockDayClickRef.current = true;
    window.setTimeout(() => {
      blockDayClickRef.current = false;
    }, 0);
  }

  function resetMonthSwipe() {
    swipeGestureRef.current = null;
    setDragOffset(0);
    setIsDraggingMonth(false);
  }

  function handleMonthSwipeStart(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    const isDayCellButton = Boolean(target.closest("[data-day-cell='true']"));

    if (target.closest("textarea")) {
      return;
    }

    if (isDayCellButton) {
      return;
    }

    if (target.closest("button") && !isDayCellButton) {
      return;
    }

    swipeGestureRef.current = {
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  }

  function handleMonthSwipeMove(event: ReactPointerEvent<HTMLElement>) {
    const swipeGesture = swipeGestureRef.current;

    if (!swipeGesture || swipeGesture.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - swipeGesture.startX;
    const deltaY = event.clientY - swipeGesture.startY;

    if (!swipeGesture.dragging) {
      if (Math.abs(deltaX) < SWIPE_ACTIVATION_PX) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        swipeGestureRef.current = null;
        return;
      }

      swipeGesture.dragging = true;
      setIsDraggingMonth(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }

    event.preventDefault();
    setDragOffset(Math.max(-SWIPE_MAX_PX, Math.min(SWIPE_MAX_PX, deltaX)));
  }

  function handleMonthSwipeEnd(event: ReactPointerEvent<HTMLElement>) {
    const swipeGesture = swipeGestureRef.current;

    if (!swipeGesture || swipeGesture.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - swipeGesture.startX;
    const shouldChangeMonth =
      swipeGesture.dragging && Math.abs(deltaX) > SWIPE_TRIGGER_PX;

    if (swipeGesture.dragging) {
      event.preventDefault();
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    resetMonthSwipe();

    if (shouldChangeMonth) {
      armBlockedDayClick();
      changeMonth(deltaX < 0 ? 1 : -1);
    }
  }

  function handleDayClick(dayKey: string, date: Date) {
    if (blockDayClickRef.current) {
      return;
    }

    if (
      rangeStart === dayKey &&
      (!rangeEnd || rangeEnd === rangeStart)
    ) {
      clearSelection();
      return;
    }

    if (!rangeStart || rangeEnd) {
      setRangeStart(dayKey);
      setRangeEnd(null);
      setHoveredDay(null);
    } else {
      const normalized = normalizeRange(rangeStart, dayKey);
      const previousSingleKey = `selection:${rangeStart}:${rangeStart}`;
      const nextRangeKey = `selection:${normalized.start}:${normalized.end}`;

      if (
        previousSingleKey !== nextRangeKey &&
        notesByKey[previousSingleKey] &&
        !notesByKey[nextRangeKey]
      ) {
        setNotesByKey((current) => {
          const next = { ...current };
          next[nextRangeKey] = current[previousSingleKey];
          delete next[previousSingleKey];
          return next;
        });
      }

      setRangeStart(normalized.start);
      setRangeEnd(normalized.end);
      setHoveredDay(null);
    }

    if (
      date.getMonth() !== visibleMonth.getMonth() ||
      date.getFullYear() !== visibleMonth.getFullYear()
    ) {
      const nextMonth = startOfMonth(date);
      updateVisibleMonth(
        nextMonth,
        nextMonth.getTime() < visibleMonth.getTime() ? "prev" : "next",
      );
    }
  }

  function handleNoteChange(nextValue: string) {
    setNotesByKey((current) => {
      const next = { ...current };

      if (nextValue) {
        next[activeNoteKey] = nextValue;
      } else {
        delete next[activeNoteKey];
      }

      return next;
    });
  }

  function clearSelection() {
    setRangeStart(null);
    setRangeEnd(null);
    setHoveredDay(null);
  }

  function clearNote() {
    setNotesByKey((current) => {
      const next = { ...current };
      delete next[activeNoteKey];
      return next;
    });
  }

  return (
    <section className={styles.wrapper} aria-label="Interactive wall calendar">
      <div className={styles.hookAnchor} aria-hidden="true">
        <span className={styles.hook} />
      </div>

      <div className={styles.hanger}>
        <div className={styles.binding} aria-hidden="true">
        <div className={styles.coils}>
          {Array.from({ length: 29 }, (_, index) => (
            <span key={index} className={styles.coil} />
          ))}
        </div>
        </div>

        <div className={styles.sheetFrame}>
          <div
            key={`sheet-${visibleMonthKey}-${monthMotion}`}
            className={`${styles.sheetMotionLayer} ${sheetMotionClass}`}
          >
            <div
              className={`${styles.sheetGestureLayer} ${
                isDraggingMonth ? styles.sheetGestureActive : ""
              }`}
              style={sheetGestureStyles}
            >
              <div className={styles.sheetShadow} aria-hidden="true" />
              <div className={styles.sheet}>
        <header className={styles.hero}>
          <div
            className={styles.heroImage}
            style={heroStyles}
          >
            <div
              key={`art-${visibleMonthKey}-${monthMotion}`}
              className={`${styles.heroArtMotion} ${heroArtMotionClass}`}
            >
              <Image
                alt={heroTheme.alt}
                className={styles.heroPhoto}
                fill
                priority
                sizes="(max-width: 859px) 100vw, 58rem"
                src={heroPhotoAsset.src}
                style={heroPhotoStyles}
              />
            </div>
            <div className={styles.heroShade} />
            <div
              key={`hero-${visibleMonthKey}-${monthMotion}`}
              className={`${styles.heroMotion} ${monthMotionClass}`}
            >
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeYear}>
                  {visibleMonth.getFullYear()}
                </span>
                <h2>{visibleMonthName.toUpperCase()}</h2>
              </div>
              <div className={styles.heroSummary}>
                <p className={styles.heroEyebrow}>{heroTheme.edition}</p>
                <p className={styles.heroCopy}>{selectionMeta}</p>
              </div>
            </div>
            <div className={styles.heroFold} aria-hidden="true">
              <span className={styles.heroFoldLeft} />
              <span className={styles.heroFoldMiddle} />
              <span className={styles.heroFoldRight} />
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.mobileToggle} aria-label="Switch view">
            <button
              type="button"
              className={`${styles.mobileToggleButton} ${
                mobileView === "calendar" ? styles.mobileToggleButtonActive : ""
              }`}
              onClick={() => setMobileView("calendar")}
              aria-pressed={mobileView === "calendar"}
            >
              Calendar
            </button>
            <button
              type="button"
              className={`${styles.mobileToggleButton} ${
                mobileView === "notes" ? styles.mobileToggleButtonActive : ""
              }`}
              onClick={() => setMobileView("notes")}
              aria-pressed={mobileView === "notes"}
            >
              Notes
            </button>
          </div>

          <aside className={notesPanelClassName}>
            <div className={styles.notesHeader}>
              <div className={styles.notesHeading}>
                <p className={styles.notesLabel}>Notes</p>
                <div className={styles.notesHeadingActions}>
                  {rangeStart ? (
                    <button
                      type="button"
                      className={`${styles.textAction} ${styles.notesHeaderAction}`}
                      onClick={clearSelection}
                    >
                      Month note
                    </button>
                  ) : null}
                  <p className={styles.notesMeta}>{notesModeLabel}</p>
                </div>
              </div>
              <p className={styles.notesScope}>{notesScopeLabel}</p>
            </div>

            <div
              className={`${styles.notesPad} ${
                rangeStart ? styles.notesPadActive : ""
              }`}
            >
              <div className={styles.notesRuling} aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                  <span key={index} className={styles.notesRule} />
                ))}
              </div>
              <textarea
                className={styles.notesField}
                value={activeNoteValue}
                onChange={(event) => handleNoteChange(event.target.value)}
                placeholder={
                  rangeStart
                    ? "Add a reminder for this selected date range."
                    : "Add a clean monthly memo for the calendar."
                }
                rows={8}
                aria-label={notesTitle}
              />
            </div>

            <div className={styles.notesFooter}>
              <p className={styles.notesHint}>{notesHint}</p>
              <div className={styles.notesActions}>
                {rangeStart ? (
                  <button
                    type="button"
                    className={styles.textAction}
                    onClick={clearSelection}
                  >
                    Use month note
                  </button>
                ) : null}
                <button
                  type="button"
                  className={styles.textAction}
                  onClick={clearNote}
                  disabled={!activeNoteValue}
                >
                  Clear note
                </button>
              </div>
            </div>
          </aside>

          <section
            className={calendarPanelClassName}
          >
            <div className={styles.toolbar}>
              <div className={styles.toolbarCopy}>
                <p className={styles.toolbarEyebrow}>Month view</p>
                <div
                  key={`title-${visibleMonthKey}-${monthMotion}`}
                  className={`${styles.toolbarMotion} ${monthMotionClass}`}
                >
                  <h3 className={styles.toolbarTitle}>
                    {visibleMonthName} {visibleMonth.getFullYear()}
                  </h3>
                </div>
              </div>
              <div className={styles.toolbarActions}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => changeMonth(-1)}
                  aria-label="Show previous month"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={jumpToToday}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => changeMonth(1)}
                  aria-label="Show next month"
                >
                  &rarr;
                </button>
              </div>
            </div>

            <div
              key={`grid-${visibleMonthKey}-${monthMotion}`}
              className={`${styles.calendarMotion} ${monthMotionClass}`}
              onPointerDown={handleMonthSwipeStart}
              onPointerMove={handleMonthSwipeMove}
              onPointerUp={handleMonthSwipeEnd}
              onPointerCancel={resetMonthSwipe}
            >
              <div className={styles.weekdayRow} role="presentation">
                {WEEKDAYS.map((day) => (
                  <span
                    key={day}
                    className={`${styles.weekday} ${
                      day === "SAT" || day === "SUN"
                        ? styles.weekendLabel
                        : ""
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className={styles.dayGrid}>
                {days.map((day) => {
                  const dayWeather = day.isToday ? getDailyWeather(day.date) : null;
                  const isRangeStart = activeRange
                    ? day.key === activeRange.start
                    : false;
                  const isRangeEnd = activeRange ? day.key === activeRange.end : false;
                  const isBoundary = isRangeStart || isRangeEnd;
                  const isInRange = Boolean(
                    activeRange &&
                      isDayWithinRange(day.key, activeRange.start, activeRange.end),
                  );
                  const isSingleDayRange = Boolean(
                    activeRange && isRangeStart && isRangeEnd,
                  );
                  const isRangeMiddle = Boolean(
                    activeRange && isInRange && !isRangeStart && !isRangeEnd,
                  );
                  const isDimmed = !day.isCurrentMonth;

                  return (
                    <button
                      key={day.key}
                      type="button"
                      data-day-cell="true"
                      className={[
                        styles.dayCell,
                        isDimmed ? styles.dayMuted : "",
                        day.isWeekend ? styles.dayWeekend : "",
                        isInRange ? styles.dayInRange : "",
                        isBoundary ? styles.dayBoundary : "",
                        isRangeStart ? styles.dayRangeStart : "",
                        isRangeEnd ? styles.dayRangeEnd : "",
                        isRangeMiddle ? styles.dayRangeMiddle : "",
                        isSingleDayRange ? styles.dayRangeSingle : "",
                        day.isToday ? styles.dayToday : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={
                        dayWeather
                          ? ({
                              "--day-weather-color": dayWeather.color,
                            } as CSSProperties)
                          : undefined
                      }
                      onClick={() => handleDayClick(day.key, day.date)}
                      onMouseEnter={() => {
                        if (rangeStart && !rangeEnd) {
                          setHoveredDay(day.key);
                        }
                      }}
                      onFocus={() => {
                        if (rangeStart && !rangeEnd) {
                          setHoveredDay(day.key);
                        }
                      }}
                      onMouseLeave={() => {
                        if (rangeStart && !rangeEnd) {
                          setHoveredDay(null);
                        }
                      }}
                      aria-pressed={isBoundary || isInRange}
                      aria-label={formatDateLabel(day.key)}
                    >
                      <span className={styles.daySurface} aria-hidden="true" />
                      <span className={styles.dayContent}>
                        <span className={styles.dayHeader}>
                          {day.isToday ? (
                            <span className={styles.todayDot} aria-hidden="true" />
                          ) : null}
                          <span className={styles.dayLabel}>{day.label}</span>
                        </span>
                        {dayWeather ? (
                          <span className={styles.dayWeather}>
                            <span className={styles.dayWeatherTemp}>
                              {dayWeather.temperatureLabel}
                            </span>
                            <span className={styles.dayWeatherLabel}>
                              {dayWeather.condition}
                            </span>
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
