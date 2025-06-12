'use client';

import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';
import { calendarStore } from '../calendar-store';

export function useCalendarStore() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Initial load
    setEvents(calendarStore.getEvents());

    // Subscribe to changes
    const unsubscribe = calendarStore.subscribe(() => {
      setEvents(calendarStore.getEvents());
    });

    return unsubscribe;
  }, []);

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    return calendarStore.addEvent(event);
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    return calendarStore.updateEvent(id, updates);
  };

  const deleteEvent = (id: string) => {
    return calendarStore.deleteEvent(id);
  };

  const clearAllEvents = () => {
    calendarStore.clearAllEvents();
  };

  const resetToSampleData = () => {
    calendarStore.resetToSampleData();
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    clearAllEvents,
    resetToSampleData,
  };
} 