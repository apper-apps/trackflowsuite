import React from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onCreateIssue, searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
                  TrackFlow
                </h1>
                <p className="text-sm text-gray-500">Issue Tracking System</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search issues by title or description..."
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={onCreateIssue} className="flex items-center gap-2">
              <ApperIcon name="Plus" size={16} />
              New Issue
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;