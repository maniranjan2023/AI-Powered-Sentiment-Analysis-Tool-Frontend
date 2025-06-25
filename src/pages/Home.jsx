import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/analyze`, { review });
      navigate('/result', { state: res.data });
    } catch (error) {
      console.error('Error analyzing review:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl">🎬</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            AI-Powered  
            <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Sentiment Analysis Tool
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
            Discover the emotional tone of your movie reviews with AI-powered sentiment analysis
          </p>
          
          {/* Star rating decoration */}
          <div className="flex justify-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Share Your Movie Experience
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              Write your honest movie review and let AI analyze its sentiment
            </p>
          </div>

          {/* Textarea Container */}
          <div className="space-y-3">
            <label htmlFor="review" className="block text-white font-medium text-sm sm:text-base">
              Your Movie Review
            </label>
            <div className="relative">
              <textarea
                id="review"
                rows={6}
                placeholder="I just watched this incredible movie and I have to say... The cinematography was breathtaking, the acting was phenomenal, and the story kept me completely engaged from start to finish!"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-4 sm:p-5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base leading-relaxed shadow-inner"
                required
              />
              {/* Character counter */}
              <div className="absolute bottom-3 right-3 text-white/50 text-xs">
                {review.length} characters
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !review.trim()}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">AI Powered</h3>
              <p className="text-white/70 text-xs sm:text-sm">Advanced machine learning algorithms</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Instant Results</h3>
              <p className="text-white/70 text-xs sm:text-sm">Get immediate sentiment analysis</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Accurate</h3>
              <p className="text-white/70 text-xs sm:text-sm">High precision sentiment detection</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;