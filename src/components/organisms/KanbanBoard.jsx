import React, { useState } from "react";
import { motion } from "framer-motion";
import StatusColumn from "@/components/molecules/StatusColumn";

const KanbanBoard = ({ issues, teamMembers, onIssueClick, onStatusChange }) => {
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [draggedIssue, setDraggedIssue] = useState(null);

  const statuses = ["Backlog", "In Progress", "Review", "Done"];

  const getIssuesByStatus = (status) => {
    return issues.filter(issue => issue.status === status);
  };

  const handleDragStart = (e, issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.setData("text/plain", issue.Id.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const issueId = e.dataTransfer.getData("text/plain");
    
    if (draggedIssue && draggedIssue.status !== status) {
      onStatusChange(parseInt(issueId), status);
    }
    
    setDragOverColumn(null);
    setDraggedIssue(null);
  };

  return (
    <div className="flex-1 p-6 overflow-hidden">
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {statuses.map((status) => (
          <StatusColumn
            key={status}
            title={status}
            issues={getIssuesByStatus(status).map(issue => ({
              ...issue,
              draggable: true,
              onDragStart: (e) => handleDragStart(e, issue)
            }))}
            teamMembers={teamMembers}
            onIssueClick={onIssueClick}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            isDragOver={dragOverColumn === status}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;