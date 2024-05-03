"use client";

import { useAIState, useActions, useUIState } from "ai/rsc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { AI, Step } from "@/app/play/action";
import { getLastStep } from "@/lib/utils";
import { Fragment } from "react";
import { CircleAlert } from "lucide-react";

type StepperProps = {};

const steps: Step[] = ["docs", "outline", "ideas", "kata"];

const Stepper = ({}: StepperProps): React.JSX.Element => {
  const { goToStep } = useActions();
  const [ai] = useAIState<typeof AI>();
  const [_, setUi] = useUIState<typeof AI>();

  const isEnabled = (step: Step) => {
    return steps.indexOf(getLastStep(ai)) >= steps.indexOf(step);
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step, index) => {
            const disabled = !isEnabled(step);
            const active = getLastStep(ai) === step;
            const label = step.charAt(0).toUpperCase() + step.slice(1);

            return (
              <Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {active ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Button
                        disabled={disabled}
                        variant="link"
                        size="link"
                        onClick={async () => {
                          const result = await goToStep(step);
                          setUi([result]);
                        }}
                      >
                        {label}
                      </Button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-1">
        <CircleAlert size={16} className="text-gray-500" />
        <p className="text-sm text-gray-500">
          Clicking on a step will reset progress
        </p>
      </div>
    </div>
  );
};

export { Stepper };
