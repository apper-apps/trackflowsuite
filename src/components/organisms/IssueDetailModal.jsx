import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";

const IssueDetailModal = ({ isOpen, onClose, issue, teamMembers, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (issue) {
      setEditData({
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        status: issue.status,
        assignee: issue.assignee
      });
    }
  }, [issue]);

  if (!issue) return null;

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

  const handleSave = () => {
    onUpdate(issue.Id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
      assignee: issue.assignee
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      onDelete(issue.Id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Issue #${issue.Id}`}
      size="xl"
    >
      <div className="p-6 space-y-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Badge variant={getPriorityVariant(issue.priority)}>
              {issue.priority}
            </Badge>
            <Badge variant="status">{issue.status}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <ApperIcon name="Edit2" size={16} />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                >
                  <ApperIcon name="Trash2" size={16} />
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleSave}
                >
                  <ApperIcon name="Check" size={16} />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Issue content */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label>Title</Label>
            {isEditing ? (
              <Input
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="Issue title..."
              />
            ) : (
              <h2 className="text-lg font-semibold text-gray-900">{issue.title}</h2>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            {isEditing ? (
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                placeholder="Issue description..."
                rows={4}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {issue.description || "No description provided."}
              </p>
            )}
          </div>

          {/* Issue details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Priority</Label>
              {isEditing ? (
                <Select
                  value={editData.priority}
                  onChange={(e) => setEditData({...editData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </Select>
              ) : (
                <div className="mt-2">
                  <Badge variant={getPriorityVariant(issue.priority)}>
                    {issue.priority}
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <Label>Status</Label>
              {isEditing ? (
                <Select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Done">Done</option>
                </Select>
              ) : (
                <div className="mt-2">
                  <Badge variant="status">{issue.status}</Badge>
                </div>
              )}
            </div>

            <div>
              <Label>Assignee</Label>
              {isEditing ? (
                <Select
                  value={editData.assignee}
                  onChange={(e) => setEditData({...editData, assignee: e.target.value})}
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </Select>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  {assignee ? (
                    <>
                      <Avatar
                        src={assignee.avatar}
                        alt={assignee.name}
                        size="sm"
                        fallback={assignee.name}
                      />
                      <span className="text-sm text-gray-700">{assignee.name}</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <Label>Created</Label>
              <p className="text-sm text-gray-600 mt-2">
                {format(new Date(issue.createdAt), "PPpp")}
              </p>
            </div>
          </div>

          {/* History */}
          {issue.history && issue.history.length > 0 && (
            <div>
              <Label>History</Label>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-4">
                {issue.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{entry.action}</span>
                        <span className="text-gray-500">
                          {format(new Date(entry.timestamp), "MMM d, h:mm a")}
                        </span>
                      </div>
                      {entry.details && (
                        <p className="text-gray-600 mt-1">{entry.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default IssueDetailModal;