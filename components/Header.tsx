import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps): React.JSX.Element => {
  return (
    <header
      className={cn(
        className,
        "fixed z-20 flex w-full justify-between gap-4 border-b border-gray-700 bg-gray-900 p-4",
      )}
    >
      <div>AI React Katas Builder</div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/play">Play</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
