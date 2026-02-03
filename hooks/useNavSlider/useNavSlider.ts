import { useState } from "react";

export const useNavSlider = (
  defaultActive?: string
) => {
  const [active, setActive] = useState(defaultActive);

  const isActive = (name: string) => active === name;

  return {
    active,
    setActive,
    isActive,
  };
};
