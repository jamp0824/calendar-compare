'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { useCalendarStore } from '@/lib/hooks/use-calendar-store';
import type { CalendarEvent } from '@/lib/types';

export default function ReactDatePickerPage() {
  const { events, addEvent } = useCalendarStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDateRange, endDateRange] = selectedDateRange;
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());

  const handleCreateEvent = () => {
    if (selectedDateTime) {
      const title = window.prompt('Enter event title:');
      if (title) {
        const start = new Date(selectedDateTime);
        const end = new Date(selectedDateTime);
        end.setHours(start.getHours() + 1);
        
        addEvent({
          title,
          start,
          end,
          description: 'Created via React DatePicker',
          color: '#f59e0b',
        });
      }
    }
  };

  const handleCreateRangeEvent = () => {
    if (startDateRange && endDateRange) {
      const title = window.prompt('Enter event title:');
      if (title) {
        addEvent({
          title,
          start: startDateRange,
          end: endDateRange,
          description: 'Range event created via React DatePicker',
          color: '#ef4444',
          allDay: true,
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

  const getDayClassName = (date: Date) => {
    const hasEvents = getEventsForDate(date).length > 0;
    return hasEvents ? 'has-events' : '';
  };

  const recentEvents = events
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">React DatePicker</h1>
          <p className="text-muted-foreground">
            Flexible date and time picker with range selection and customization options.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Date Picker */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Date Picker</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select a date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="w-full p-2 border rounded-md"
                dayClassName={getDayClassName}
                highlightDates={events.map(event => new Date(event.start))}
              />
              {selectedDate && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedDate.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Date Range Picker</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select a date range:</label>
              <DatePicker
                selectsRange={true}
                startDate={startDateRange}
                endDate={endDateRange}
                onChange={(update) => setSelectedDateRange(update)}
                dateFormat="MMMM d, yyyy"
                className="w-full p-2 border rounded-md"
                isClearable={true}
              />
              {startDateRange && endDateRange && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Range: {startDateRange.toLocaleDateString()} - {endDateRange.toLocaleDateString()}
                  </p>
                  <Button onClick={handleCreateRangeEvent} size="sm">
                    Create Range Event
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Time Picker */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Time Picker</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select a time:</label>
              <DatePicker
                selected={selectedTime}
                onChange={(date) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* DateTime Picker */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Date & Time Picker</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select date and time:</label>
              <DatePicker
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 border rounded-md"
              />
              {selectedDateTime && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedDateTime.toLocaleString()}
                  </p>
                  <Button onClick={handleCreateEvent} size="sm">
                    Create Event
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recent Events */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Recent Events</h3>
            {recentEvents.length > 0 ? (
              <div className="space-y-2">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded border-l-4 bg-muted"
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.start.toLocaleDateString()} at {event.start.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events created yet</p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Date selection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Time selection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Date range selection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Timezone support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Custom formatting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Accessibility support</span>
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Instructions</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Click on any date picker to open the calendar</p>
              <p>• Use the date range picker to select multiple dates</p>
              <p>• Time picker allows precise time selection</p>
              <p>• DateTime picker combines both date and time</p>
              <p>• Dates with existing events are highlighted</p>
              <p>• Create events using the buttons after selecting dates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 