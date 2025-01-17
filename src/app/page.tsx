import NavBar from "@/components/NavBar";
import { AppSidebar } from "@/components/SideBar";
import TaskList from "@/components/TaskList";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex flex-1 flex-col w-full ">
            <NavBar />
            <TaskList />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
