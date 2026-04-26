import { useState } from "react";
import { DropdownTrigger } from "./DropDownTrigger";

import { DropdownContent } from "./DropdownContent";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className="pt-22 px-15.25 mb-2.5">
      <div className="flex flex-col">
        <DropdownTrigger isOpen={isOpen} onClick={toggle} />
        <DropdownContent isOpen={isOpen} />
      </div>
    </div>
  );
}