import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { format, isAfter } from "date-fns";

const IssueCard = ({ issue, teamMembers, labels = [], onClick, isDragging = false }) => {
  const assignee = teamMembers.find(member => member.id === issue.assignee);
  
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "critical";
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
className={`bg-white rounded-lg p-4 border shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group ${
        isDragging ? "opacity-60 rotate-2 scale-105 shadow-2xl z-50" : ""
      } ${
        issue.dueDate && isAfter(new Date(), new Date(issue.dueDate)) 
          ? "border-red-500 border-2" 
          : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
            #{issue.Id}
          </span>
          <Badge variant={getPriorityVariant(issue.priority)}>
            {issue.priority}
          </Badge>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ApperIcon name="MoreVertical" size={16} className="text-gray-400" />
        </div>
</div>

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {issue.labels.slice(0, 3).map((labelId) => {
            const label = labels.find(l => l.Id === labelId);
            if (!label) return null;
            return (
              <Badge key={labelId} variant={`label-${label.color}`} className="text-xs">
                {label.name}
              </Badge>
            );
          })}
          {issue.labels.length > 3 && (
            <Badge variant="default" className="text-xs">
              +{issue.labels.length - 3}
            </Badge>
          )}
        </div>
      )}
      
      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
        {issue.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
        {issue.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {assignee && (
            <Avatar
              src={assignee.avatar}
              alt={assignee.name}
              size="sm"
              fallback={assignee.name}
            />
          )}
          <span className="text-xs text-gray-500">
            {assignee ? assignee.name : "Unassigned"}
          </span>
        </div>
        
<div className="flex items-center gap-1 text-xs text-gray-400">
          <ApperIcon name="Calendar" size={12} />
          {issue.dueDate ? (
            <span className={isAfter(new Date(), new Date(issue.dueDate)) ? "text-red-600 font-medium" : ""}>
              Due: {format(new Date(issue.dueDate), "MMM d")}
            </span>
          ) : (
            format(new Date(issue.createdAt), "MMM d")
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCard;