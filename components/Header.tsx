import { env } from "@/env";
import { Badge } from "./ui/badge";

type HeaderProps = {};

const mode = env.MOCK ? "mock" : "live";

const Header = ({}: HeaderProps): React.JSX.Element => {
  return (
    <div className="flex p-4 w-full justify-between gap-4 fixed border-b border-gray-700 bg-gray-900 z-20">
      <div>AI React Katas Builder</div>
      <Badge variant="secondary">{mode}</Badge>
    </div>
  );
};

export { Header };
