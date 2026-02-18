'use client';

import { forwardRef, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput, EventClickArg, EventContentArg } from '@fullcalendar/core';
import type { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';
import trLocale from '@fullcalendar/core/locales/tr';
import '@/app/global.css';

type Props = {
  events?: EventInput[];
  initialView?: 'dayGridMonth' | 'timeGridDay' | 'listDay';
  onDateClick?: (arg: DateClickArg) => void;
  onViewChange?: (viewType: string) => void;
  onRangeChange?: (start: Date, end: Date, viewType: string) => void;
  onEventClick?: (arg: EventClickArg) => void;
};

const CalendarShell = forwardRef<FullCalendar, Props>(function CalendarShell(
  { events = [], initialView = 'dayGridMonth', onDateClick, onViewChange, onRangeChange, onEventClick }: Props,
  ref
) {
  const isScrollingRef = useRef(false);
  const scrollTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const downPos = useRef<{ x: number; y: number } | null>(null);
  const DRAG_PX = 5;

  useEffect(() => {
    const fcScroller = document.querySelector('.fc-timeGridDay-view .fc-scroller');
    const wrap = wrapRef.current;

    const markScrolling = () => {
      isScrollingRef.current = true;
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => { isScrollingRef.current = false; }, 150);
    };

    fcScroller?.addEventListener('scroll', markScrolling, { passive: true });
    wrap?.addEventListener('scroll', markScrolling, { passive: true });
    wrap?.addEventListener('wheel', markScrolling, { passive: true });

    return () => {
      fcScroller?.removeEventListener('scroll', markScrolling);
      wrap?.removeEventListener('scroll', markScrolling);
      wrap?.removeEventListener('wheel', markScrolling);
    };
  }, []);

  const badge = (hex: string) => `<span class="evt-badge" style="background:${hex}"></span>`;

  const renderMonthContent = (arg: EventContentArg) => {
    const ext = arg.event.extendedProps || {};
    const title = ext.route_name || ext.type_name || '';
    const color = ext.color ?? '#64748b';
    return { html: `${badge(color)}<span class="evt-title">${title}</span>` };
  };

  const renderDayContent = (arg: EventContentArg) => {
    const ext = arg.event.extendedProps || {};
    const color = ext.color ?? '#64748b';
    // arg.event.start null olabilir, null ise boş string döndür
    const time = arg.event.start
      ? formatDate(arg.event.start, { hour: '2-digit', minute: '2-digit', hour12: false })
      : '';
    const plate = ext.plate ?? ext.device_plate ?? ext.deviceid ?? '';
    const route = ext.route_name || ext.type_name || '';
    const title = plate ? `${time} ${route} (${plate})` : `${time} ${route}`;
    return { html: `${badge(color)}<span class="evt-title" style="color:#000">${title}</span>` };
  };

  return (
    <div
      id="calendar-shell"
      ref={wrapRef}
      className="calendar-wrap"
      onPointerDown={(e) => { downPos.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={(e) => {
        if (!downPos.current) return;
        const dx = Math.abs(e.clientX - downPos.current.x);
        const dy = Math.abs(e.clientY - downPos.current.y);
        if (dx > DRAG_PX || dy > DRAG_PX) {
          isScrollingRef.current = true;
          window.setTimeout(() => (isScrollingRef.current = false), 150);
        }
        downPos.current = null;
      }}
    >
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={initialView}
        events={events}
        firstDay={1}
        locale={trLocale}
        slotDuration="00:10:00"
        slotLabelInterval="00:10:00"
        slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        snapDuration="00:10:00"
        height="auto"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridDay,listDay',
        }}
        views={{
          dayGridMonth: { buttonText: 'Ay', dayMaxEvents: 0, displayEventTime: false },
          timeGridDay: { buttonText: 'Gün' },
          listDay: { buttonText: 'Liste' },
        }}
        eventOrder={['type_name', 'device_plate']}
        eventContent={(arg) => (arg.view.type === 'dayGridMonth' ? renderMonthContent(arg) : renderDayContent(arg))}
        moreLinkContent={(arg) => `${arg.num} adet sefer mevcut.`}
        moreLinkClick="popover"
        eventClick={(info) => onEventClick?.(info)}
        dateClick={(info) => {
          if (isScrollingRef.current) return;
          onDateClick?.(info);
        }}
        datesSet={(arg) => {
          onViewChange?.(arg.view.type);
          onRangeChange?.(arg.start, arg.end, arg.view.type);
        }}
      />
    </div>
  );
});

export default CalendarShell;
