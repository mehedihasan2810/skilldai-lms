'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: number;
  title: string;
  progress: number;
  weak: boolean;
}

interface ModuleSelectorProps {
  modules: Module[];
  activeModuleId: number;
  onSelectModule: (id: number) => void;
}

export default function ModuleSelector({
  modules,
  activeModuleId,
  onSelectModule,
}: ModuleSelectorProps) {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card
          key={module.id}
          className={`cursor-pointer transition-colors ${
            activeModuleId === module.id ? 'border-blue-500 bg-black-50' : 'border-black-200'
          }`}
          onClick={() => onSelectModule(module.id)}
        >
          <CardHeader className="p-4">
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-md font-medium text-center">{module.title}</CardTitle>
              {module.weak && (
                <Badge variant="destructive" className="text-xs text-center">
                  Weak Area
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-gray-500">Skill Proficiency: {module.progress}%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}