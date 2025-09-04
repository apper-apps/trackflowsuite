import React from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/atoms/ApperIcon";
const FilterBar = ({ selectedPriority, onPriorityChange, selectedAssignee, onAssigneeChange, selectedLabels, onLabelChange, teamMembers, labels }) => {
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

      {/* Labels Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Labels:</span>
        <div className="relative">
          <Select
            value=""
            onChange={(e) => {
              if (e.target.value && !selectedLabels.includes(parseInt(e.target.value))) {
                onLabelChange([...selectedLabels, parseInt(e.target.value)]);
              }
            }}
            className="min-w-[120px]"
          >
            <option value="">Add Label...</option>
            {labels.filter(label => !selectedLabels.includes(label.Id)).map((label) => (
              <option key={label.Id} value={label.Id}>
                {label.name}
              </option>
            ))}
          </Select>
        </div>
        {selectedLabels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedLabels.map((labelId) => {
              const label = labels.find(l => l.Id === labelId);
              if (!label) return null;
              return (
                <div key={labelId} className="flex items-center">
                  <Badge variant={`label-${label.color}`} className="text-xs">
                    {label.name}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLabelChange(selectedLabels.filter(id => id !== labelId))}
                    className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                  >
                    <ApperIcon name="X" size={10} className="text-gray-500 hover:text-red-600" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;