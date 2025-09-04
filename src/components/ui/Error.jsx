import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
          
          <div className="space-y-3">
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <ApperIcon name="RefreshCw" size={16} />
                Try Again
              </Button>
            )}
            
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              Refresh Page
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;