import { useState } from "react";

import { FolderType } from "~/types";
import { cn } from "~/utils";

export type TreeViewProps = {
  currentRoot: FolderType;
};

const ExpandIcon = ({ className, ...rest }: React.ComponentProps<"div">) => (
  <div {...rest} className={cn(className, "min-w-0 max-w-min rotate-90 pt-1 text-center")}>
    {">"}
  </div>
);

const CollapseIcon = ({ className, ...rest }: React.ComponentProps<"div">) => (
  <div {...rest} className={cn(className, "grid min-w-0 max-w-min -rotate-90 pt-1 text-center")}>
    {">"}
  </div>
);

export function TreeView({ currentRoot }: TreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 px-2">
        <span>{currentRoot.name}</span>
        <div id="button-panel" className="flex gap-1">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="pl-4">
          {currentRoot.items.map((item) => {
            if ("items" in item) {
              return <TreeView key={item.id} currentRoot={item} />;
            }
            return <div key={item.id}>{item.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}
