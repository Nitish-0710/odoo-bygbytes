import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
  rightPanel?: ReactNode;
}

const PageLayout = ({ children, rightPanel }: PageLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
        {rightPanel && (
          <aside className="w-72 border-l border-border bg-card p-5 overflow-auto hidden xl:block">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
