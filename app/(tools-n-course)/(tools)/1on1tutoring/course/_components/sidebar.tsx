import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ModuleSelector from './moduleselector';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  progress: number;
  weak: boolean;
}

interface SidebarProps {
  modules: Module[];
  activeModuleId: number;
  onSelectModule: (id: number) => void;
}

export default function Sidebar({ modules, activeModuleId, onSelectModule }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full max-w-xs border-r p-6">
        <h2 className="text-lg font-semibold mb-6">Modules</h2>
        <ModuleSelector
          modules={modules}
          activeModuleId={activeModuleId}
          onSelectModule={onSelectModule}
        />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 p-6">
            <h2 className="text-lg font-semibold mb-6">Modules</h2>
            <ModuleSelector
              modules={modules}
              activeModuleId={activeModuleId}
              onSelectModule={onSelectModule}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}