import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface WorkExperience {
  id: number;
  title: string;
  type: string;
  period: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
}

interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: WorkExperience | null;
}

export default function WorkExperienceModal({
  isOpen,
  onClose,
  experience,
}: WorkExperienceModalProps) {
  if (!experience) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-bold">{experience.title}</DialogTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-normal">
                {experience.type}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {experience.company} • {experience.period}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{experience.location}</span>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <DialogDescription className="text-base">
            {experience.description}
          </DialogDescription>

          <div className="space-y-2">
            <h4 className="font-medium">Key Achievements</h4>
            <ul className="list-disc pl-5 space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="text-sm">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}