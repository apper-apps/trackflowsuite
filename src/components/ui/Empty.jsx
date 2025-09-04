import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing here yet. Create your first item to get started.",
  actionText = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
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
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg"
        >
          <ApperIcon name={icon} size={32} className="text-white" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
          
          {onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              className="flex items-center justify-center gap-2"
            >
              <ApperIcon name="Plus" size={16} />
              {actionText}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Empty;