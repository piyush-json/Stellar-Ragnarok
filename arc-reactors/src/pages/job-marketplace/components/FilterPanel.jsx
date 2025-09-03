import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  isMobile = false 
}) => {
  const [budgetRange, setBudgetRange] = useState(filters?.budgetRange || [0, 10000]);
  const [selectedSkills, setSelectedSkills] = useState(filters?.skills || []);
  const [selectedDuration, setSelectedDuration] = useState(filters?.duration || []);
  const [minRating, setMinRating] = useState(filters?.minRating || 0);

  const skillOptions = [
    "React", "JavaScript", "TypeScript", "Node.js", "Python", 
    "UI/UX Design", "Blockchain", "Smart Contracts", "Solidity",
    "Web3", "Mobile Development", "Content Writing", "SEO",
    "Digital Marketing", "Graphic Design", "Video Editing"
  ];

  const durationOptions = [
    { id: 'less-than-week', label: 'Less than a week' },
    { id: '1-4-weeks', label: '1-4 weeks' },
    { id: '1-3-months', label: '1-3 months' },
    { id: '3-6-months', label: '3-6 months' },
    { id: 'more-than-6-months', label: 'More than 6 months' }
  ];

  const handleSkillToggle = (skill) => {
    const updated = selectedSkills?.includes(skill)
      ? selectedSkills?.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
  };

  const handleDurationToggle = (duration) => {
    const updated = selectedDuration?.includes(duration)
      ? selectedDuration?.filter(d => d !== duration)
      : [...selectedDuration, duration];
    setSelectedDuration(updated);
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      budgetRange,
      skills: selectedSkills,
      duration: selectedDuration,
      minRating
    });
    if (isMobile) onClose();
  };

  const handleClearFilters = () => {
    setBudgetRange([0, 10000]);
    setSelectedSkills([]);
    setSelectedDuration([]);
    setMinRating(0);
    onFiltersChange({
      budgetRange: [0, 10000],
      skills: [],
      duration: [],
      minRating: 0
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Budget Range */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center justify-between">
          Budget Range (XLM)
          <Icon name="DollarSign" size={16} className="text-muted-foreground" />
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={budgetRange?.[0]}
            onChange={(e) => setBudgetRange([parseInt(e?.target?.value) || 0, budgetRange?.[1]])}
          />
          <Input
            type="number"
            placeholder="Max"
            value={budgetRange?.[1]}
            onChange={(e) => setBudgetRange([budgetRange?.[0], parseInt(e?.target?.value) || 10000])}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          ${(budgetRange?.[0] * 0.12)?.toFixed(2)} - ${(budgetRange?.[1] * 0.12)?.toFixed(2)} USD
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center justify-between">
          Skills & Technologies
          <Icon name="Code" size={16} className="text-muted-foreground" />
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {skillOptions?.map((skill) => (
            <Checkbox
              key={skill}
              label={skill}
              checked={selectedSkills?.includes(skill)}
              onChange={() => handleSkillToggle(skill)}
            />
          ))}
        </div>
      </div>

      {/* Project Duration */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center justify-between">
          Project Duration
          <Icon name="Clock" size={16} className="text-muted-foreground" />
        </h3>
        <div className="space-y-2">
          {durationOptions?.map((option) => (
            <Checkbox
              key={option?.id}
              label={option?.label}
              checked={selectedDuration?.includes(option?.id)}
              onChange={() => handleDurationToggle(option?.id)}
            />
          ))}
        </div>
      </div>

      {/* Client Rating */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center justify-between">
          Minimum Client Rating
          <Icon name="Star" size={16} className="text-muted-foreground" />
        </h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5]?.map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`p-1 rounded transition-colors ${
                rating <= minRating ? 'text-warning' : 'text-muted-foreground hover:text-warning'
              }`}
            >
              <Icon name="Star" size={20} className={rating <= minRating ? 'fill-current' : ''} />
            </button>
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            {minRating > 0 ? `${minRating}+ stars` : 'Any rating'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="flex-1"
        >
          Clear All
        </Button>
        <Button
          onClick={handleApplyFilters}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white border-r border-border overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="hidden lg:block w-80 bg-white border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Filters</h2>
        <FilterContent />
      </div>
    </div>
  );
};

export default FilterPanel;