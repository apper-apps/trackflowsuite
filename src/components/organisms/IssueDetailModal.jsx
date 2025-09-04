import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Modal from "@/components/molecules/Modal";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Avatar from "@/components/atoms/Avatar";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { labelService } from "@/services/api/labelService";
const IssueDetailModal = ({ isOpen, onClose, issue, teamMembers, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [allLabels, setAllLabels] = useState([]);
  const [issueLabels, setIssueLabels] = useState([]);
  useEffect(() => {
    if (issue) {
      setEditData({
title: issue.title,
        description: issue.description,
        priority: issue.priority,
        status: issue.status,
        assignee: issue.assignee,
        dueDate: issue.dueDate || "",
        labels: issue.labels || []
      });
      loadIssueLabels();
    }
  }, [issue]);

  const loadAllLabels = async () => {
    try {
      const labels = await labelService.getAll();
      setAllLabels(labels);
    } catch (error) {
      console.error("Error loading labels:", error);
    }
  };

  const loadIssueLabels = async () => {
    if (issue?.labels?.length > 0) {
      try {
        const labels = await labelService.getByIds(issue.labels);
        setIssueLabels(labels);
      } catch (error) {
        console.error("Error loading issue labels:", error);
        setIssueLabels([]);
      }
    } else {
      setIssueLabels([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllLabels();
    }
  }, [isOpen]);

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
      assignee: issue.assignee,
      dueDate: issue.dueDate || "",
      labels: issue.labels || []
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

            {/* Labels */}
            <div>
              <Label>Labels</Label>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {allLabels.map((label) => {
                      const isSelected = editData.labels.includes(label.Id);
                      return (
                        <button
                          key={label.Id}
                          type="button"
                          onClick={() => {
                            const newLabels = isSelected
                              ? editData.labels.filter(id => id !== label.Id)
                              : [...editData.labels, label.Id];
                            setEditData({...editData, labels: newLabels});
                          }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            isSelected
                              ? 'ring-2 ring-primary ring-offset-2'
                              : 'hover:ring-1 hover:ring-gray-300'
                          }`}
                        >
                          <Badge variant={`label-${label.color}`} className="cursor-pointer">
                            {label.name}
                            {isSelected && <ApperIcon name="Check" size={12} className="ml-1" />}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                  {editData.labels.length === 0 && (
                    <p className="text-sm text-gray-500">No labels selected</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {issueLabels.length > 0 ? (
                    issueLabels.map((label) => (
                      <Badge key={label.Id} variant={`label-${label.color}`}>
                        {label.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No labels assigned</span>
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

            <div>
              <Label>Due Date</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editData.dueDate}
                  onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
                />
              ) : (
                <p className="text-sm text-gray-600 mt-2">
                  {issue.dueDate ? format(new Date(issue.dueDate), "PP") : "No due date set"}
                </p>
              )}
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