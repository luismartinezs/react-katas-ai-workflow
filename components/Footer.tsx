import { env } from "@/env";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

const mode = env.MOCK ? "mock" : "live";

const Footer = ({ className }: FooterProps): React.JSX.Element => {
  return (
    <footer
      className={cn(
        className,
        "container mx-auto max-w-7xl px-2 py-2 font-medium xl:px-0",
      )}
    >
      <div className="flex justify-between">
        <div className="text-sm text-stone-400">Luis Martinez @2024</div>
        <Badge variant="secondary">{mode}</Badge>
      </div>
    </footer>
  );
};

export { Footer };
