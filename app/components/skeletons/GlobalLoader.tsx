export function GlobalLoader() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-2 animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">HR</span>
          </div>
        </div>
        
        {/* App Name */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">HRMS Lite</h1>
          <p className="text-sm text-muted-foreground">Loading your workspace...</p>
        </div>
        
        {/* Spinner */}
        <div className="flex justify-center pt-2">
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
