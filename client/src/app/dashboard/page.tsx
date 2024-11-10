import { Panel } from "@/components/dashboard/panel";
import { Renderer } from "@/components/renderer/renderer";

export default function Page() {
    return (
        <div className="overflow-hidden">
            {/* <Panel /> */}

            <Renderer />
        </div>
    );
}
