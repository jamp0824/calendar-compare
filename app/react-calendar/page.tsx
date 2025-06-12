'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { Button } from '@/components/ui/button';
import { useCalendarStore } from '@/lib/hooks/use-calendar-store';
import type { CalendarEvent } from '@/lib/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReactCalendarPage() {
  const { events, addEvent } = useCalendarStore();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'year' | 'decade' | 'century'>('month');

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  const handleCreateEvent = () => {
    if (selectedDate && selectedDate instanceof Date) {
      const title = window.prompt('Enter event title:');
      if (title) {
        const start = new Date(selectedDate);
        const end = new Date(selectedDate);
        end.setHours(start.getHours() + 1);
        
        addEvent({
          title,
          start,
          end,
          description: 'Created via React Calendar',
          color: '#10b981',
        });
      }
    }
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length > 0) {
      return (
        <div className="flex justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.length > 0 ? 'has-events' : '';
  };

  const viewButtons = [
    { view: 'month' as const, label: 'Month' },
    { view: 'year' as const, label: 'Year' },
    { view: 'decade' as const, label: 'Decade' },
    { view: 'century' as const, label: 'Century' },
  ];

  const selectedDateEvents = selectedDate instanceof Date ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">React Calendar</h1>
          <p className="text-muted-foreground">
            Simple and lightweight calendar for date selection and basic event display.
          </p>
        </div>
        <div className="flex gap-2">
          {viewButtons.map(({ view, label }) => (
            <Button
              key={view}
              variant={calendarView === view ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCalendarView(view)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="calendar-container">
          <div className="p-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              view={calendarView}
              onViewChange={({ view }) => setCalendarView(view)}
              tileContent={tileContent}
              tileClassName={tileClassName}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Selected Date</h3>
            {selectedDate instanceof Date ? (
              <div className="space-y-3">
                <p className="text-sm">
                  <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                </p>
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event for This Date
                </Button>
                
                {selectedDateEvents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Events on this date:</h4>
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-2 rounded border-l-4 bg-muted"
                        style={{ borderLeftColor: event.color }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Select a date to view details</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Lightweight and fast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Multiple view types (month, year, decade)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Date selection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Custom tile content</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Accessible design</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Usage Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Click on any date to select it</p>
            <p>• Use the view buttons to switch between month, year, and decade views</p>
            <p>• Dates with events show a small indicator dot</p>
            <p>• Create events for selected dates using the button</p>
            <p>• Navigate using the navigation controls at the top</p>
          </div>
        </div>
      </div>
    </div>
  );
} 