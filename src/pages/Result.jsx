import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center max-w-md">
          <div className="mb-6">
            <svg className="w-16 h-16 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Invalid Access</h2>
          <p className="text-white/70 mb-6">Please analyze a review first to see the results.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const { ruleBased, gpt } = state;

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return 'from-gray-400 to-gray-500';
    const lower = sentiment.toLowerCase();
    if (lower.includes('positive')) return 'from-green-400 to-emerald-500';
    if (lower.includes('negative')) return 'from-red-400 to-red-500';
    return 'from-yellow-400 to-orange-500';
  };

  const getSentimentIcon = (sentiment) => {
    if (!sentiment) return '❓';
    const lower = sentiment.toLowerCase();
    if (lower.includes('positive')) return '😊';
    if (lower.includes('negative')) return '😔';
    return '😐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl">📊</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Analysis
            <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Results
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
            Here's what our AI models discovered about your movie review
          </p>
        </div>

        {/* Results Container */}
        <div className="w-full max-w-5xl space-y-6 sm:space-y-8">
          {/* Rule-Based Analysis */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">✅ Rule-Based Analysis</h2>
                  <p className="text-white/70 text-sm sm:text-base">Traditional sentiment analysis using predefined rules</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Sentiment Display */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className={`bg-gradient-to-r ${getSentimentColor(ruleBased?.sentiment)} p-4 rounded-full shadow-lg`}>
                    <span className="text-2xl">{getSentimentIcon(ruleBased?.sentiment)}</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Sentiment: <span className="capitalize">{ruleBased?.sentiment || 'Unknown'}</span>
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              {ruleBased?.explanation && (
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Analysis Explanation
                  </h4>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">{ruleBased.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* GPT Analysis */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">🤖 GPT-4 Analysis</h2>
                  <p className="text-white/70 text-sm sm:text-base">Advanced AI-powered sentiment analysis with context understanding</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg shadow-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-3">AI Analysis & Insights</h4>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                      {gpt || 'No GPT analysis available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')} 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Analyze Another Review</span>
            </button>
            
            <button 
              onClick={() => {
                const resultText = `Rule-Based Analysis: ${ruleBased?.sentiment || 'N/A'}\n${ruleBased?.explanation || ''}\n\nGPT-4 Analysis:\n${gpt || 'N/A'}`;
                navigator.clipboard.writeText(resultText);
                // You could add a toast notification here
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;