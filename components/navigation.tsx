'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { calendarLibraries } from '@/lib/calendar-data';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', id: 'dashboard' },
    ...calendarLibraries.map(lib => ({
      href: `/${lib.id}`,
      label: lib.name,
      id: lib.id,
    })),
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4 overflow-x-auto">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-lg"
          >
            <span className="text-2xl">📅</span>
            <span>Calendar Comparison</span>
          </Link>
          
          <div className="flex ml-6 space-x-4">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 