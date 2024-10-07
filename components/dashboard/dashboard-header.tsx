import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { MobileSidebar } from './dashboard-mobile-sidebar';
import { UserNav } from '../user-nav';

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full border-b">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-6">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}