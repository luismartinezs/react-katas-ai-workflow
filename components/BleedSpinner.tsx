import { Spinner } from "./spinner";

type BleedSpinnerProps = {

}

const BleedSpinner = ({}: BleedSpinnerProps): React.JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center min-h-[100px]">
      <Spinner className="h-10 w-10 animate-spin-slow" />
    </div>
  );
};

export { BleedSpinner }
