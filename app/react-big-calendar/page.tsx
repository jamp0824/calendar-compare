'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { useCalendarStore } from '@/lib/hooks/use-calendar-store';
import type { CalendarEvent } from '@/lib/types';

const localizer = momentLocalizer(moment);

export default function ReactBigCalendarPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarStore();
  const [currentView, setCurrentView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      addEvent({
        title,
        start,
        end,
        description: 'Created via React Big Calendar',
        color: '#3b82f6',
      });
    }
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    const action = window.confirm(`Event: ${event.title}\n\nClick OK to delete, Cancel to edit`);
    if (action) {
      deleteEvent(event.id);
    } else {
      const newTitle = window.prompt('Edit event title:', event.title);
      if (newTitle && newTitle !== event.title) {
        updateEvent(event.id, { title: newTitle });
      }
    }
  };

  const viewButtons: { view: View; label: string }[] = [
    { view: 'month', label: 'Month' },
    { view: 'week', label: 'Week' },
    { view: 'day', label: 'Day' },
    { view: 'agenda', label: 'Agenda' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">React Big Calendar</h1>
          <p className="text-muted-foreground">
            Full-featured calendar with multiple views and event management.
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
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={currentView}
            onView={setCurrentView}
            date={currentDate}
            onNavigate={setCurrentDate}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color || '#3b82f6',
                borderColor: event.color || '#3b82f6',
              },
            })}
            messages={{
              next: 'Next',
              previous: 'Previous',
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              agenda: 'Agenda',
              date: 'Date',
              time: 'Time',
              event: 'Event',
              noEventsInRange: 'No events in this range.',
              showMore: (total) => `+${total} more`,
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Multiple view types (month, week, day, agenda)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Click to create events</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Event editing and deletion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Responsive design</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Custom event styling</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Usage Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Click on an empty slot to create a new event</p>
            <p>• Click on an existing event to edit or delete it</p>
            <p>• Use the view buttons to switch between different calendar views</p>
            <p>• Navigate using the toolbar arrows or click Today to return to current date</p>
            <p>• Events are automatically saved to local storage</p>
          </div>
        </div>
      </div>
    </div>
  );
} 