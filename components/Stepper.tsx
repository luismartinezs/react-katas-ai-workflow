"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";

type StepperProps = {};

const Stepper = ({}: StepperProps): React.JSX.Element => {
  const goToStep = (step: "docs" | "outline" | "idea" | "kata") => {
    console.log(step);
    // navigate to given step, keep current content in-memory and override if regenerate
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button variant="link" size="link" onClick={() => goToStep("docs")}>
              Documentation
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Button
            variant="link"
            size="link"
            onClick={() => goToStep("outline")}
          >
            Outline
          </Button>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Button
            variant="link"
            size="link"
            onClick={() => goToStep("outline")}
          >
            Outline
          </Button>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button variant="link" size="link" onClick={() => goToStep("idea")}>
            Ideas
          </Button>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Button variant="link" size="link" onClick={() => goToStep("kata")}>
            Kata
          </Button>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Stepper };
