import React, { useState, useEffect } from 'react';
import { 
  Users, MessageCircle, Clock, 
  Smartphone, Monitor, Tablet, Eye, Download, 
  Mail, 
  ArrowUp, ArrowDown, Circle
} from 'lucide-react';
import VisitorTrafficChart from './VisitorTrafficChart';
import InProgressIndicator from './inprogress';

// Types
interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface PopularQuestion {
  question: string;
  percentage: number;
  count: number;
}

// interface ActivityItem {
//   id: number;
//   type: 'visitor' | 'chat' | 'contact' | 'download';
//   description: string;
//   location?: string;
//   time: string;
//   icon: React.ReactNode;
// }

const AnalyticsShowcase: React.FC = () => {
  // const [activeTimeRange, setActiveTimeRange] = useState('7d');
  const [liveCount, setLiveCount] = useState(12);

  // Sample metrics data
  const metrics: Metric[] = [
    {
      label: 'Total Visitors',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: <Users size={24} />,
      color: 'blue'
    },
    {
      label: 'AI Conversations',
      value: '156',
      change: '+28%',
      trend: 'up',
      icon: <MessageCircle size={24} />,
      color: 'green'
    },
    {
      label: 'Avg Session Time',
      value: '4:32',
      change: '+8%',
      trend: 'up',
      icon: <Clock size={24} />,
      color: 'purple'
    },
    {
      label: 'Contact Inquiries',
      value: '23',
      change: '+15%',
      trend: 'up',
      icon: <Mail size={24} />,
      color: 'orange'
    },
    {
      label: 'Resume Downloads',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: <Download size={24} />,
      color: 'pink'
    },
    {
      label: 'Project Views',
      value: '1,234',
      change: '+18%',
      trend: 'up',
      icon: <Eye size={24} />,
      color: 'indigo'
    }
  ];

  // Popular questions data
  const popularQuestions: PopularQuestion[] = [
    { question: "Tell me about your experience", percentage: 28, count: 44 },
    { question: "What technologies do you use?", percentage: 22, count: 34 },
    { question: "Show me your projects", percentage: 18, count: 28 },
    { question: "How can I contact you?", percentage: 15, count: 23 },
    { question: "What's your background in AI?", percentage: 12, count: 19 },
    { question: "Are you available for hire?", percentage: 5, count: 8 }
  ];

  // Live activity data
  const deviceData = [
    { name: 'Desktop', percentage: 65, color: 'bg-blue-500' },
    { name: 'Mobile', percentage: 30, color: 'bg-green-500' },
    { name: 'Tablet', percentage: 5, color: 'bg-purple-500' }
  ];


  // Simulate live count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={16} className="text-green-500" />;
      case 'down':
        return <ArrowDown size={16} className="text-red-500" />;
      default:
        return <Circle size={16} className="text-gray-500" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      purple: 'bg-purple-600 text-white',
      orange: 'bg-orange-600 text-white',
      pink: 'bg-pink-600 text-white',
      indigo: 'bg-indigo-600 text-white'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-600 text-white';
  };

  return (
    <div className="w-full bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <InProgressIndicator  />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Analytics <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
            </h2>
            <p className="text-gray-400">Real-time insights into your portfolio performance</p>
          </div>
          
          {/* Live Indicator */}
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live</span>
            <span className="text-xs text-gray-400">({liveCount} active)</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="flex justify-between flex-wrap  mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
                  {metric.icon}
                </div>
               
              </div>
              <div className="text-white flex" ><span className='text-2xl text-white mb-1'> {metric.value}  </span> 
                <span style={{fontSize:"10px"}} className="flex items-center text-small gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.change}
                  </span>
                </span></div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Visitor Traffic Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
             <VisitorTrafficChart />
            </h3>
            {/* <div className="h-48 bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <TrendingUp size={48} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Interactive chart will be here</p>
                <p className="text-sm text-gray-500">Line chart showing visitor trends</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Peak: 2:00 PM - 4:00 PM</span>
              <span>+12% vs last week</span>
            </div> */}
          </div>

          {/* Device Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Monitor size={20} />
              Device Distribution
            </h3>
            <div className="space-y-4">
              {deviceData.map(device => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {device.name === 'Desktop' && <Monitor size={16} className="text-blue-400" />}
                      {device.name === 'Mobile' && <Smartphone size={16} className="text-green-400" />}
                      {device.name === 'Tablet' && <Tablet size={16} className="text-purple-400" />}
                      <span className="text-gray-300">{device.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${device.color} transition-all duration-1000`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm min-w-[3rem]">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Popular Questions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={20} />
              Popular AI Questions
            </h3>
            <div className="space-y-3">
              {popularQuestions.map((question) => (
                <div key={question.question} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-gray-300 text-sm">{question.question}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000"
                          style={{ width: `${question.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-xs">{question.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe size={20} />
              Top Countries
            </h3>
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">#{index + 1}</span>
                    <span className="text-gray-300">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">{country.visitors}</span>
                    <span className="text-gray-500 text-xs">({country.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={20} />
              Live Activity
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">{activity.description}</p>
                    {activity.location && (
                      <p className="text-xs text-gray-500">{activity.location}</p>
                    )}
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">📊 Performance Summary</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">92%</div>
              <div className="text-sm text-gray-400">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">68%</div>
              <div className="text-sm text-gray-400">Return Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">3.2</div>
              <div className="text-sm text-gray-400">Pages/Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">2.4%</div>
              <div className="text-sm text-gray-400">Conversion Rate</div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsShowcase;