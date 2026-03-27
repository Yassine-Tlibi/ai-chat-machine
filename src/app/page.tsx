import { BoltStyleChat } from "@/components/ui/bolt-style-chat";
import { Sidebar } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-[#fdfaf5] overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full overflow-y-auto">
        <BoltStyleChat />
      </div>
    </div>
  );
}
