import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function DepartmentsSkeleton() {
  return (
    <div className="page-content space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-muted rounded animate-pulse" />
      </div>

      {/* Departments Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <th key={i} className="px-4 py-3">
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b last:border-0">
                    <td className="px-4 py-4">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-8 w-8 bg-muted rounded animate-pulse ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
