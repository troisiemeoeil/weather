
import Header from "./(Header)/Header/page";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto p-3">
      <Header />
      <Dashboard  />
    </div>
  );
}
