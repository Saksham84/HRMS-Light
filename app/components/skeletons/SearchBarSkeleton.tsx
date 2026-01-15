import { Card, CardContent } from '@/app/components/ui/card';

export function SearchBarSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="h-10 bg-muted rounded-md animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
