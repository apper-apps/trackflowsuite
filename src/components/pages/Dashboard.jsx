import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { issueService } from "@/services/api/issueService";
import { labelService } from "@/services/api/labelService";
import IssueDetailModal from "@/components/organisms/IssueDetailModal";
import Header from "@/components/organisms/Header";
import CreateIssueModal from "@/components/organisms/CreateIssueModal";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import FilterBar from "@/components/molecules/FilterBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedAssignee, setSelectedAssignee] = useState("");
const [labels, setLabels] = useState([]);
// Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Filter states  
  const [selectedLabels, setSelectedLabels] = useState([]);
  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      
const [issuesData, membersData, labelsData] = await Promise.all([
        issueService.getAll(),
        issueService.getTeamMembers(),
        labelService.getAll()
      ]);
      
      setIssues(issuesData);
      setTeamMembers(membersData);
      setLabels(labelsData);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter issues based on search query, priority, and assignee
// Filter issues based on search, priority, assignee, and labels
  useEffect(() => {
    let filtered = [...issues];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (selectedPriority !== "All") {
      filtered = filtered.filter(issue => issue.priority === selectedPriority);
    }

    // Assignee filter
    if (selectedAssignee) {
      filtered = filtered.filter(issue => issue.assignee === selectedAssignee);
    }

// Filter by labels
    if (selectedLabels.length > 0) {
      filtered = filtered.filter(issue => 
        issue.labels && issue.labels.some(labelId => selectedLabels.includes(labelId))
      );
    }

setFilteredIssues(filtered);
  }, [issues, searchQuery, selectedPriority, selectedAssignee, selectedLabels]);
  const handleCreateIssue = async (issueData) => {
    try {
      const newIssue = await issueService.create(issueData);
      setIssues(prev => [...prev, newIssue]);
      setShowCreateModal(false);
      toast.success("Issue created successfully!");
    } catch (err) {
      toast.error("Failed to create issue. Please try again.");
      console.error("Error creating issue:", err);
    }
  };

  const handleUpdateIssue = async (id, updateData) => {
    try {
      const updatedIssue = await issueService.update(id, updateData);
      if (updatedIssue) {
        setIssues(prev => 
          prev.map(issue => issue.Id === id ? updatedIssue : issue)
        );
        setSelectedIssue(updatedIssue);
        toast.success("Issue updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update issue. Please try again.");
      console.error("Error updating issue:", err);
}
  };
  const handleDeleteIssue = async (id) => {
    try {
      const success = await issueService.delete(id);
      if (success) {
        setIssues(prev => prev.filter(issue => issue.Id !== id));
        toast.success("Issue deleted successfully!");
      }
    } catch (err) {
      toast.error("Failed to delete issue. Please try again.");
      console.error("Error deleting issue:", err);
    }
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      const updatedIssue = await issueService.updateStatus(issueId, newStatus);
      if (updatedIssue) {
        setIssues(prev => 
          prev.map(issue => issue.Id === issueId ? updatedIssue : issue)
        );
        toast.success(`Issue moved to ${newStatus}!`);
      }
    } catch (err) {
      toast.error("Failed to update issue status. Please try again.");
      console.error("Error updating issue status:", err);
    }
};

  const handleLabelChange = (newSelectedLabels) => {
    setSelectedLabels(newSelectedLabels);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setShowDetailModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCreateIssue={() => setShowCreateModal(true)}
        searchQuery={searchQuery}
onSearchChange={setSearchQuery}
      />
      
      <div className="p-6 space-y-6">
        <FilterBar
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedAssignee={selectedAssignee}
          onAssigneeChange={setSelectedAssignee}
          teamMembers={teamMembers}
        />
        
        {filteredIssues.length === 0 && !loading ? (
          <Empty
            title="No issues found"
            description="Create your first issue or adjust your filters to see results."
            actionText="Create Issue"
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
<KanbanBoard
            issues={filteredIssues}
            teamMembers={teamMembers}
            labels={labels}
            selectedLabels={selectedLabels}
            onLabelChange={handleLabelChange}
            onIssueClick={handleIssueClick}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <CreateIssueModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateIssue}
teamMembers={teamMembers}
        labels={labels}
      />
      <IssueDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedIssue(null);
        }}
        issue={selectedIssue}
        teamMembers={teamMembers}
onUpdate={handleUpdateIssue}
        onDelete={handleDeleteIssue}
        labels={labels}
      />
    </div>
  );
};

export default Dashboard;