import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calendarLibraries } from '@/lib/calendar-data';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Calendar Library Comparison</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compare and evaluate different React calendar libraries to find the best fit for your project needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calendarLibraries.map((library) => (
          <div
            key={library.id}
            className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{library.name}</h3>
              <p className="text-sm text-muted-foreground">{library.description}</p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(library.features)
                    .filter(([, value]) => value)
                    .slice(0, 4)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Pros</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {library.pros.slice(0, 3).map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Cons</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {library.cons.slice(0, 2).map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button asChild className="flex-1">
                <Link href={`/${library.id}`}>
                  Try Demo
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={library.documentation} target="_blank" rel="noopener noreferrer">
                  Docs
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Feature Comparison Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Library</th>
                <th className="text-center p-3 font-medium">Drag & Drop</th>
                <th className="text-center p-3 font-medium">Multiple Views</th>
                <th className="text-center p-3 font-medium">Event Management</th>
                <th className="text-center p-3 font-medium">Custom Styling</th>
                <th className="text-center p-3 font-medium">Responsive</th>
                <th className="text-center p-3 font-medium">Timezone</th>
                <th className="text-center p-3 font-medium">Recurring</th>
              </tr>
            </thead>
            <tbody>
              {calendarLibraries.map((library) => (
                <tr key={library.id} className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">
                    <Link href={`/${library.id}`} className="hover:underline">
                      {library.name}
                    </Link>
                  </td>
                  <td className="text-center p-3">
                    {library.features.dragAndDrop ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.multipleViews ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.eventCreation && library.features.eventEditing ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.customStyling ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.responsive ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.timezone ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="text-center p-3">
                    {library.features.recurring ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <p className="text-muted-foreground">
          Click on any library above to see it in action with interactive demos and examples.
        </p>
      </div>
    </div>
  );
}
