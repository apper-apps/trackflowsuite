import { issues } from "@/services/mockData/issues.json";
import { teamMembers } from "@/services/mockData/teamMembers.json";

// Create copies to prevent mutations
let issuesData = [...issues];

// Add delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const issueService = {
  async getAll() {
    await delay(300);
    return [...issuesData];
  },

  async getById(id) {
    await delay(200);
    const issue = issuesData.find(item => item.Id === parseInt(id));
    return issue ? { ...issue } : null;
  },

async create(issueData) {
    await delay(400);
    const highestId = Math.max(...issuesData.map(item => item.Id), 0);
    const newIssue = {
      Id: highestId + 1,
      title: issueData.title,
      description: issueData.description,
      priority: issueData.priority,
      status: issueData.status || "Backlog",
      assignee: issueData.assignee || "",
      dueDate: issueData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        action: "Created",
        timestamp: new Date().toISOString(),
        details: "Issue created"
      }]
    };
    issuesData.push(newIssue);
    return { ...newIssue };
  },

  async update(id, updateData) {
    await delay(300);
    const index = issuesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) return null;
    
    const oldIssue = { ...issuesData[index] };
    const updatedIssue = {
      ...oldIssue,
      ...updateData,
      updatedAt: new Date().toISOString(),
      history: [
        ...oldIssue.history,
        {
          action: "Updated",
          timestamp: new Date().toISOString(),
          details: `Updated: ${Object.keys(updateData).join(", ")}`
        }
      ]
    };
    
    issuesData[index] = updatedIssue;
    return { ...updatedIssue };
  },

  async delete(id) {
    await delay(250);
    const index = issuesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) return false;
    
    issuesData.splice(index, 1);
    return true;
  },

  async getTeamMembers() {
    await delay(200);
    return [...teamMembers];
  },

  async updateStatus(id, newStatus) {
    await delay(200);
    return this.update(id, { status: newStatus });
  }
};