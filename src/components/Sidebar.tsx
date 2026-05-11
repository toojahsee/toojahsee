import { cn } from "@/lib/utils";
import { Book, Compass, Globe, Info, Menu, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn("w-60 flex-shrink-0 hidden md:block pl-4 pr-6 pt-6 bg-wiki-bg dark:bg-wiki-bgDark min-h-screen border-r border-wiki-header dark:border-wiki-borderDark", className)}>
      <div className="flex items-center space-x-2 mb-8 px-2">
        <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-serif text-2xl font-bold">W</div>
        <span className="font-serif text-xl tracking-tight">WIKIPEDIA<br/><span className="text-xs font-sans text-gray-500 block -mt-1">The Free Encyclopedia</span></span>
      </div>

      <nav className="space-y-6">
        <div>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="flex items-center space-x-2 text-sm text-wiki-text dark:text-wiki-textDark hover:bg-wiki-panel dark:hover:bg-wiki-panelDark px-2 py-1.5 rounded-sm">
                <Globe className="w-4 h-4 opacity-70" />
                <span>Main page</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 text-sm text-wiki-text dark:text-wiki-textDark hover:bg-wiki-panel dark:hover:bg-wiki-panelDark px-2 py-1.5 rounded-sm">
                <Compass className="w-4 h-4 opacity-70" />
                <span>Contents</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 text-sm text-wiki-text dark:text-wiki-textDark hover:bg-wiki-panel dark:hover:bg-wiki-panelDark px-2 py-1.5 rounded-sm">
                <Book className="w-4 h-4 opacity-70" />
                <span>Current events</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 text-sm text-wiki-text dark:text-wiki-textDark hover:bg-wiki-panel dark:hover:bg-wiki-panelDark px-2 py-1.5 rounded-sm">
                <Info className="w-4 h-4 opacity-70" />
                <span>About Wikipedia</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="pt-4 border-t border-wiki-header dark:border-wiki-borderDark">
          <h3 className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider">Interact</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Help
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Learn to edit
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Community portal
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Recent changes
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Upload file
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="pt-4 border-t border-wiki-header dark:border-wiki-borderDark">
          <h3 className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider">Tools</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                What links here
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Related changes
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Special pages
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Permanent link
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-sm text-wiki-link dark:text-wiki-linkDark hover:underline px-2 py-1.5">
                Page information
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
