import { ModeToggle } from "@/components/mode-switcher";
import Header from "./(Header)/Header/page";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto  min-w-screen">
      <Header />
      <Dashboard  />
    </div>
  );
}
