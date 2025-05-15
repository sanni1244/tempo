'use client';

import { useEffect, useState } from 'react';
import { getAnalyticsStats } from '@/lib/api';

interface AnalyticsStats {
  totalVisits: number;
  uniqueUsers: number;
  averageSessionTime: number;
  totalSubmissions: number;
  formViews: number;
  [key: string]: any; // fallback for unknown fields
}

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await getAnalyticsStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load analytics stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p className="p-6">Loading analytics...</p>;
  if (!stats) return <p className="p-6 text-red-500">Failed to load analytics.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="border p-4 rounded shadow">
            <h2 className="text-lg font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
            <p className="text-xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

