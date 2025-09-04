import React, { useState } from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";

const CreateIssueModal = ({ isOpen, onClose, onSubmit, teamMembers }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
    status: "Backlog"
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      assignee: "",
      status: "Backlog"
    });
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      assignee: "",
      status: "Backlog"
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Issue"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter issue title..."
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              id="assignee"
              value={formData.assignee}
              onChange={(e) => handleChange("assignee", e.target.value)}
            >
              <option value="">Unassigned</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Initial Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Backlog">Backlog</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!formData.title.trim()}
          >
            Create Issue
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateIssueModal;