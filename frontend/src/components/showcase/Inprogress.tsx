const InProgressIndicator = ({ text = 'In Progress' }) => (
  <div className="fixed top-4 right-4 z-50">
    <div className="flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-full px-3 py-1.5 shadow-lg">
      <div className="relative">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <span className="text-xs font-medium text-gray-300">{text}</span>
      <div className="flex space-x-0.5">
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
    </div>
  </div>
);
export default InProgressIndicator;