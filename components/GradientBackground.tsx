import React from "react";

type GradientProps = {
  xPosition: number;
  yPosition: number;
  from: string;
  to: string;
  opacity: number;
  radius: number;
};

export function GradientBackground({
  xPosition,
  yPosition,
  from,
  to,
  opacity,
  radius,
}: GradientProps) {
  return (
    <div
      style={{
        background: `radial-gradient(circle ${radius}px at ${xPosition}% ${yPosition}%, ${from}, ${to})`,
        opacity: opacity,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
      }}
    ></div>
  );
}

export default GradientBackground;
