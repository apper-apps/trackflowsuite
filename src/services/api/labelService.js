import labelData from '@/services/mockData/labels.json';

const { labels } = labelData;
let labelStorage = [...labels];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const labelService = {
  async getAll() {
    await delay(100);
    return labelStorage.map(label => ({ ...label }));
  },

  async getById(id) {
    await delay(50);
    const label = labelStorage.find(l => l.Id === parseInt(id));
    if (!label) {
      throw new Error(`Label with ID ${id} not found`);
    }
    return { ...label };
  },

  async create(labelData) {
    await delay(200);
    
    const newLabel = {
      Id: Math.max(...labelStorage.map(l => l.Id), 0) + 1,
      name: labelData.name,
      color: labelData.color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    labelStorage.push(newLabel);
    return { ...newLabel };
  },

  async update(id, updateData) {
    await delay(200);
    
    const labelIndex = labelStorage.findIndex(l => l.Id === parseInt(id));
    if (labelIndex === -1) {
      throw new Error(`Label with ID ${id} not found`);
    }
    
    const updatedLabel = {
      ...labelStorage[labelIndex],
      ...updateData,
      Id: labelStorage[labelIndex].Id,
      updatedAt: new Date().toISOString()
    };
    
    labelStorage[labelIndex] = updatedLabel;
    return { ...updatedLabel };
  },

  async delete(id) {
    await delay(100);
    
    const labelIndex = labelStorage.findIndex(l => l.Id === parseInt(id));
    if (labelIndex === -1) {
      throw new Error(`Label with ID ${id} not found`);
    }
    
    const deletedLabel = { ...labelStorage[labelIndex] };
    labelStorage.splice(labelIndex, 1);
    return deletedLabel;
  },

  async getByIds(ids) {
    await delay(50);
    const labelIds = ids.map(id => parseInt(id));
    return labelStorage.filter(label => labelIds.includes(label.Id)).map(label => ({ ...label }));
  },

  // Utility methods for common operations
  async searchByName(query) {
    await delay(100);
    const searchTerm = query.toLowerCase();
    return labelStorage
      .filter(label => label.name.toLowerCase().includes(searchTerm))
      .map(label => ({ ...label }));
  },

  async getByColor(color) {
    await delay(50);
    return labelStorage
      .filter(label => label.color === color)
      .map(label => ({ ...label }));
  }
};