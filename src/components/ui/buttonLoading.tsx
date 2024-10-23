
import { Loader2 } from "lucide-react";

export function ButtonLoading() {
    return (
      <div className="bg-slate-50 text-black">
        <Loader2 className="mr-2 h-4 animate-spin" />
        Please wait...
      </div>
    );
  };