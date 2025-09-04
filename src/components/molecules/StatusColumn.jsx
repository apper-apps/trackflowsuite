import React from "react";
import { motion } from "framer-motion";
import IssueCard from "@/components/molecules/IssueCard";

const StatusColumn = ({ 
  title, 
  issues, 
  teamMembers, 
  onIssueClick, 
  onDrop, 
  onDragOver, 
  onDragLeave,
  isDragOver = false
}) => {
  const getColumnColor = (title) => {
    switch (title.toLowerCase()) {
      case "backlog":
        return "border-gray-300 bg-gray-50";
      case "in progress":
        return "border-blue-300 bg-blue-50";
      case "review":
        return "border-warning bg-yellow-50";
      case "done":
        return "border-success bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getHeaderGradient = (title) => {
    switch (title.toLowerCase()) {
      case "backlog":
        return "from-gray-500 to-gray-600";
      case "in progress":
        return "from-blue-500 to-blue-600";
      case "review":
        return "from-warning to-orange-600";
      case "done":
        return "from-success to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      className={`flex-1 min-w-[280px] bg-white rounded-lg border-2 transition-all duration-200 ${
        isDragOver 
          ? "border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg" 
          : getColumnColor(title)
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className={`p-4 bg-gradient-to-r ${getHeaderGradient(title)} text-white rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
            {issues.length}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3 min-h-[200px] kanban-column overflow-y-auto max-h-[calc(100vh-300px)]">
        <motion.div layout className="space-y-3">
          {issues.map((issue) => (
            <IssueCard
              key={issue.Id}
              issue={issue}
              teamMembers={teamMembers}
              onClick={() => onIssueClick(issue)}
            />
          ))}
        </motion.div>
        
        {issues.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No issues in {title.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusColumn;