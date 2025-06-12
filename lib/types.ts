export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
}

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface CalendarLibraryFeatures {
  name: string;
  id: string;
  description: string;
  features: {
    dragAndDrop: boolean;
    multipleViews: boolean;
    eventCreation: boolean;
    eventEditing: boolean;
    eventDeletion: boolean;
    customStyling: boolean;
    responsive: boolean;
    timezone: boolean;
    recurring: boolean;
    resourceView: boolean;
  };
  pros: string[];
  cons: string[];
  documentation: string;
  npmPackage: string;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (id: string, event: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface CalendarTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
} 