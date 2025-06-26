import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Users } from 'lucide-react';

interface TrafficDataPoint {
  date: string;
  visitors: number;
  pageViews: number;
  sessions: number;
}

const VisitorTrafficChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Sample traffic data for the last 7 days
  const generateTrafficData = (period: string): TrafficDataPoint[] => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const data: TrafficDataPoint[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic data with some randomness
      const baseVisitors = 50 + Math.random() * 100;
      const visitors = Math.floor(baseVisitors + Math.sin(i * 0.5) * 20);
      const pageViews = Math.floor(visitors * (2 + Math.random()));
      const sessions = Math.floor(visitors * (0.8 + Math.random() * 0.4));
      
      data.push({
        date: date.toISOString().split('T')[0],
        visitors,
        pageViews,
        sessions
      });
    }
    
    return data;
  };

  const [trafficData, setTrafficData] = useState<TrafficDataPoint[]>([]);

  useEffect(() => {
    setTrafficData(generateTrafficData(selectedPeriod));
  }, [selectedPeriod]);

  // Calculate chart dimensions and scales
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 40;
  // const maxVisitors = Math.max(...trafficData.map(d => d.visitors));
  // const minVisitors = Math.min(...trafficData.map(d => d.visitors));

  // Create SVG path for the line chart
  const createPath = (data: TrafficDataPoint[], key: keyof TrafficDataPoint) => {
    if (data.length === 0) return '';
    
    const maxValue = Math.max(...data.map(d => d[key] as number));
    const minValue = Math.min(...data.map(d => d[key] as number));
    const range = maxValue - minValue || 1;
    
    return data.map((point, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
      const y = chartHeight - padding - ((point[key] as number - minValue) / range) * (chartHeight - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Create points for hover interaction
  const createPoints = (data: TrafficDataPoint[]) => {
    if (data.length === 0) return [];
    
    const maxValue = Math.max(...data.map(d => d.visitors));
    const minValue = Math.min(...data.map(d => d.visitors));
    const range = maxValue - minValue || 1;
    
    return data.map((point, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
      const y = chartHeight - padding - ((point.visitors - minValue) / range) * (chartHeight - 2 * padding);
      return { x, y, ...point, index };
    });
  };

  const points = createPoints(trafficData);
  const visitorsPath = createPath(trafficData, 'visitors');

  // Calculate totals and growth
  const totalVisitors = trafficData.reduce((sum, d) => sum + d.visitors, 0);
  const avgVisitors = Math.round(totalVisitors / trafficData.length);
  const growth = trafficData.length > 1 ? 
    ((trafficData[trafficData.length - 1].visitors - trafficData[0].visitors) / trafficData[0].visitors * 100) : 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-400" />
          Visitor Traffic
        </h3>
        
        {/* Period Selector */}
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative mb-4">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Area under the curve */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {visitorsPath && (
            <path
              d={`${visitorsPath} L ${chartWidth - padding} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
              fill="url(#areaGradient)"
            />
          )}

          {/* Main line */}
          {visitorsPath && (
            <path
              d={visitorsPath}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "6" : "4"}
              fill="#3B82F6"
              stroke="#1F2937"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Hover tooltip */}
          {hoveredPoint !== null && points[hoveredPoint] && (
            <g>
              <rect
                x={points[hoveredPoint].x - 60}
                y={points[hoveredPoint].y - 70}
                width="120"
                height="50"
                fill="#1F2937"
                stroke="#374151"
                strokeWidth="1"
                rx="6"
                opacity="0.95"
              />
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 50}
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="12"
                fontWeight="bold"
              >
                {formatDate(points[hoveredPoint].date)}
              </text>
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 35}
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="14"
                fontWeight="bold"
              >
                {points[hoveredPoint].visitors} visitors
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-400">
            <Users size={14} />
            <span>Total: {totalVisitors}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar size={14} />
            <span>Avg: {avgVisitors}/day</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <TrendingUp size={14} className={growth >= 0 ? 'text-green-400' : 'text-red-400'} />
          <span className={`font-medium ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}% vs last period
          </span>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-2">📊 Quick Insights</h4>
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
          <div>
            <span className="text-gray-400">Peak Traffic:</span>
            <br />
            <span className="text-white font-medium">2:00 PM - 4:00 PM</span>
          </div>
          <div>
            <span className="text-gray-400">Best Day:</span>
            <br />
            <span className="text-white font-medium">Tuesday</span>
          </div>
          <div>
            <span className="text-gray-400">Top Source:</span>
            <br />
            <span className="text-white font-medium">LinkedIn (42%)</span>
          </div>
          <div>
            <span className="text-gray-400">Bounce Rate:</span>
            <br />
            <span className="text-white font-medium">32% (Good)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorTrafficChart;