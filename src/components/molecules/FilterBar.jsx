import React from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";

const FilterBar = ({ selectedPriority, onPriorityChange, selectedAssignee, onAssigneeChange, teamMembers }) => {
  const priorities = ["All", "Critical", "High", "Medium", "Low"];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Priority:</span>
        <div className="flex gap-1">
          {priorities.map((priority) => (
            <Button
              key={priority}
              variant={selectedPriority === priority ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPriorityChange(priority)}
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Assignee:</span>
        <Select
          value={selectedAssignee}
          onChange={(e) => onAssigneeChange(e.target.value)}
          className="w-48"
        >
          <option value="">All assignees</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;