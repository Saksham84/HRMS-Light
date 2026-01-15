import { Card, CardContent, CardHeader } from '@/app/components/ui/card';

interface CardSkeletonProps {
  showHeader?: boolean;
}

export function CardSkeleton({ showHeader = true }: CardSkeletonProps) {
  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="h-6 bg-muted rounded animate-pulse w-32"></div>
        </CardHeader>
      )}
      <CardContent className={showHeader ? '' : 'p-6'}>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-4/6"></div>
        </div>
      </CardContent>
    </Card>
  );
}
