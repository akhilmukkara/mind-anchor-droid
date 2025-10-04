import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { HabitTracker } from "@/components/HabitTracker";
import { FocusTimer } from "@/components/FocusTimer";
import { AppBlocker } from "@/components/AppBlocker";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "habits":
        return <HabitTracker />;
      case "timer":
        return <FocusTimer />;
      case "blocker":
        return <AppBlocker />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="pb-20">
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
};

export default Index;
