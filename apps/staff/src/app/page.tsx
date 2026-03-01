import { Suspense } from 'react';
import { Dashboard } from '@/components/dashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
