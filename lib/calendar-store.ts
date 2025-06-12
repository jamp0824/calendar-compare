'use client';

import type { CalendarEvent } from './types';

// Sample events for demonstration
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(2024, 5, 15, 10, 0),
    end: new Date(2024, 5, 15, 11, 0),
    description: 'Weekly team sync meeting',
    color: '#3b82f6',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date(2024, 5, 20, 9, 0),
    end: new Date(2024, 5, 20, 17, 0),
    description: 'Final project submission',
    color: '#ef4444',
    allDay: true,
  },
  {
    id: '3',
    title: 'Conference Call',
    start: new Date(2024, 5, 18, 14, 30),
    end: new Date(2024, 5, 18, 15, 30),
    description: 'Client presentation',
    color: '#10b981',
  },
  {
    id: '4',
    title: 'Code Review',
    start: new Date(2024, 5, 22, 16, 0),
    end: new Date(2024, 5, 22, 17, 0),
    description: 'Review pull requests',
    color: '#8b5cf6',
  },
];

// Calendar library data is now in lib/calendar-data.ts

class CalendarStore {
  private events: CalendarEvent[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('calendar-events');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.events = parsed.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
      } else {
        this.events = sampleEvents;
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Failed to load events from storage:', error);
      this.events = sampleEvents;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('calendar-events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save events to storage:', error);
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  getEvents(): CalendarEvent[] {
    return [...this.events];
  }

  addEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    this.events.push(newEvent);
    this.saveToStorage();
    this.notify();
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<CalendarEvent>): boolean {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;

    const existingEvent = this.events[index]!;
    // Ensure all required fields are preserved
    const updatedEvent: CalendarEvent = {
      ...existingEvent,
      ...updates,
      id: existingEvent.id // Ensure id is never overwritten
    };

    this.events[index] = updatedEvent;
    this.saveToStorage();
    this.notify();
    return true;
  }

  deleteEvent(id: string): boolean {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;

    this.events.splice(index, 1);
    this.saveToStorage();
    this.notify();
    return true;
  }

  clearAllEvents() {
    this.events = [];
    this.saveToStorage();
    this.notify();
  }

  resetToSampleData() {
    this.events = [...sampleEvents];
    this.saveToStorage();
    this.notify();
  }
}

export const calendarStore = new CalendarStore(); 