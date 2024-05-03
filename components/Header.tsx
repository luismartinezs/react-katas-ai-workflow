import { cn } from "@/lib/utils";
import { Nav } from "./Nav";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps): React.JSX.Element => {
  return (
    <header
      className={cn(
        className,
        "fixed z-20 flex w-full justify-between items-center gap-4 border-b border-gray-700 bg-gray-900 p-4",
      )}
    >
      <div>React Katas AI Maker</div>
      <Nav />
    </header>
  );
};

export { Header };
