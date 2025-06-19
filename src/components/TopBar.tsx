import { NavBar } from "./NavBar";
import { Separator } from "./ui/separator";

export function TopBar() {
  return (
    <div>
      <div className="flex flex-row items-center gap-6 h-16 min-w-full">
        <div className="flex flex-row items-center gap-6 max-w-7xl w-full mx-auto px-4">
          <p className="text-xl font-semibold">ACCIONATOR</p>
          <NavBar />
        </div>
      </div>
      <Separator />
    </div>
  );
}
