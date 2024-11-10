import { AppSidebar } from "@/components/app-sidebar";
import { Renderer } from "@/components/renderer/renderer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <Renderer />
            </SidebarInset>
        </SidebarProvider>
    );
}
