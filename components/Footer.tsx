import { env } from "@/env";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

const mode = env.MOCK ? "mock" : "live";

const Footer = ({ className }: FooterProps): React.JSX.Element => {
  return (
    <footer className={cn(className, "font-medium border-t border-gray-700")}>
      <div className="container mx-auto flex max-w-7xl justify-between px-2 py-2 xl:px-0">
        <div className="text-sm text-stone-400">Luis Martinez @2024</div>
        <Badge variant="secondary">{mode}</Badge>
      </div>
    </footer>
  );
};

export { Footer };
