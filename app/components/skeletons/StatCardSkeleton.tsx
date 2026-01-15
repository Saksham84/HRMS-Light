import { Card, CardContent } from '@/app/components/ui/card';

export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-16"></div>
          </div>
          <div className="w-12 h-12 bg-muted rounded-lg animate-pulse"></div>
        </div>
        <div className="mt-4 h-3 bg-muted rounded animate-pulse w-32"></div>
      </CardContent>
    </Card>
  );
}
