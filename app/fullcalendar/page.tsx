'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { useCalendarStore } from '@/lib/hooks/use-calendar-store';
import type { CalendarEvent } from '@/lib/types';

export default function FullCalendarPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarStore();
  const [currentView, setCurrentView] = useState('dayGridMonth');

  // Convert our events to FullCalendar format
  const fullCalendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay || false,
    backgroundColor: event.color || '#3b82f6',
    borderColor: event.color || '#3b82f6',
    extendedProps: {
      description: event.description,
    },
  }));

  const handleDateSelect = (selectInfo: any) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      addEvent({
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        description: 'Created via FullCalendar',
        color: '#8b5cf6',
        allDay: selectInfo.allDay,
      });
      selectInfo.view.calendar.unselect();
    }
  };

  const handleEventClick = (clickInfo: any) => {
    const action = window.confirm(`Event: ${clickInfo.event.title}\n\nClick OK to delete, Cancel to edit`);
    if (action) {
      deleteEvent(clickInfo.event.id);
    } else {
      const newTitle = window.prompt('Edit event title:', clickInfo.event.title);
      if (newTitle && newTitle !== clickInfo.event.title) {
        updateEvent(clickInfo.event.id, { title: newTitle });
      }
    }
  };

  const handleEventDrop = (dropInfo: any) => {
    updateEvent(dropInfo.event.id, {
      start: dropInfo.event.start,
      end: dropInfo.event.end,
      allDay: dropInfo.event.allDay,
    });
  };

  const handleEventResize = (resizeInfo: any) => {
    updateEvent(resizeInfo.event.id, {
      start: resizeInfo.event.start,
      end: resizeInfo.event.end,
    });
  };

  const viewButtons = [
    { view: 'dayGridMonth', label: 'Month' },
    { view: 'timeGridWeek', label: 'Week' },
    { view: 'timeGridDay', label: 'Day' },
    { view: 'listWeek', label: 'List' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FullCalendar</h1>
          <p className="text-muted-foreground">
            Feature-complete calendar with drag & drop, multiple views, and professional appearance.
          </p>
        </div>
        <div className="flex gap-2">
          {viewButtons.map(({ view, label }) => (
            <Button
              key={view}
              variant={currentView === view ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView(view)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="calendar-container">
        <div className="p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView={currentView}
            events={fullCalendarEvents}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            editable={true}
            droppable={true}
            height={600}
            viewDidMount={(info) => setCurrentView(info.view.type)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Drag and drop events</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Event resizing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Multiple view types (month, week, day, list)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Professional appearance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Timezone support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Extensive customization</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Usage Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Click and drag to select a time range and create an event</p>
            <p>• Click on an existing event to edit or delete it</p>
            <p>• Drag events to move them to different times</p>
            <p>• Drag the edges of events to resize them</p>
            <p>• Use the toolbar buttons to switch between views</p>
            <p>• Navigate using the prev/next buttons or click today to return</p>
          </div>
        </div>
      </div>
    </div>
  );
} 