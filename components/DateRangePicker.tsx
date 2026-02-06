import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";

type BookedRange = { start: string; end: string; status: string };

function ymdToDate(ymd: string) {
  return new Date(`${ymd}T00:00:00`);
}

function fmt(ymd: string) {
  if (!ymd) return "";
  const [y, m, d] = ymd.split("-");
  return `${d}/${m}/${y}`;
}

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = React.useState(true);
  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isDesktop;
}

export function DateRangePicker({
  value,
  onChange,
  bookedRanges,
  placeholder = "Fecha de llegada — Fecha de salida",
  numberOfMonths,
}: {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  bookedRanges: BookedRange[];
  placeholder?: string;
  numberOfMonths?: number;
}) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const today = new Date();0
  today.setHours(0, 0, 0, 0);
  const acceptedRanges = (bookedRanges || []).filter(
	(r) => r.status === "ACCEPTED" || r.status === "accepted"
  );

  const disabled = React.useMemo(() => {
  return [
    { before: today },
    ...acceptedRanges.map(r => ({
      from: ymdToDate(r.start),
      to: ymdToDate(r.end),
    })),
  ];
}, [acceptedRanges]);

  React.useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const fromYMD = value?.from ? value.from.toISOString().slice(0, 10) : "";
  const toYMD = value?.to ? value.to.toISOString().slice(0, 10) : "";
  const label =
    fromYMD && toYMD ? `${fmt(fromYMD)} — ${fmt(toYMD)}` : placeholder;

  return (
    <div ref={wrapRef} className="relative">
      {/* Input visual */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <span className="material-symbols-outlined text-slate-400">
          calendar_month
        </span>
        <span className={`text-sm ${fromYMD ? "text-slate-900 dark:text-white font-semibold" : "text-slate-400"}`}>
          {label}
        </span>
        <span className="ml-auto material-symbols-outlined text-slate-400">
          expand_more
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 mt-2 w-[min(720px,calc(100vw-2rem))] right-0">
          <div className="rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xl">
            <DayPicker
              mode="range"
              selected={value}
              onSelect={(r) => {
                onChange(r);
                if (r?.from && r?.to) setOpen(false);
              }}
              disabled={disabled}
              numberOfMonths={isDesktop ? 2 : 1}
              showOutsideDays
              fixedWeeks
            />

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>* Fechas ocupadas aparecen deshabilitadas.</span>
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                }}
                className="font-bold text-primary hover:underline"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
