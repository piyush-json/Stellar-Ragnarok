import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsSection = ({ skills }) => {
  const getSkillLevel = (level) => {
    const levels = {
      beginner: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: 'Star' },
      intermediate: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'Star' },
      advanced: { color: 'bg-green-100 text-green-800 border-green-200', icon: 'Star' },
      expert: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: 'Crown' }
    };
    return levels?.[level] || levels?.intermediate;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Required Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills?.map((skill, index) => {
          const skillStyle = getSkillLevel(skill?.level);
          return (
            <div
              key={index}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium ${skillStyle?.color}`}
            >
              <Icon name={skillStyle?.icon} size={14} />
              <span>{skill?.name}</span>
              <span className="text-xs opacity-75 capitalize">({skill?.level})</span>
            </div>
          );
        })}
      </div>
      {/* Skill Level Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Skill Level Guide</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-yellow-200"></div>
            <span className="text-muted-foreground">Beginner</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-blue-200"></div>
            <span className="text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-green-200"></div>
            <span className="text-muted-foreground">Advanced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-purple-200"></div>
            <span className="text-muted-foreground">Expert</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;