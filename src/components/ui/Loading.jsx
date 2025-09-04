import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const shimmer = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header skeleton */}
      <div className="bg-white border-b border-gray-200 shadow-sm mb-6 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded-lg w-28 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 overflow-hidden">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Kanban board skeleton */}
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {[1, 2, 3, 4].map((columnIndex) => (
          <div key={columnIndex} className="flex-1 min-w-[280px] bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
            {/* Column header */}
            <div className="p-4 bg-gradient-to-r from-gray-400 to-gray-500">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-white/30 rounded w-20 animate-pulse"></div>
                <div className="h-6 w-8 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Column content */}
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((cardIndex) => (
                <motion.div
                  key={cardIndex}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent"
                      variants={shimmer}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-5 bg-gray-200 rounded w-8 animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-16 animate-pulse"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                    </div>
                    
                    <div className="h-5 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;