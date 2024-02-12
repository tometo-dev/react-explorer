import { useState } from "react";

import chevronDown from "~/assets/chevron-down.svg";
import chevronUp from "~/assets/chevron-up.svg";
import pencil from "~/assets/pencil.svg";
import { FolderType } from "~/types";
import { cn } from "~/utils";

import { useAppState } from "./state";

export type TreeViewProps = {
  currentRoot: FolderType;
  currentPath: string;
};

const ExpandIcon = ({ className, ...rest }: Omit<React.ComponentProps<"img">, "src">) => (
  <img {...rest} src={chevronUp} className={cn(className, "h-4 w-4")} />
);

const CollapseIcon = ({ className, ...rest }: React.ComponentProps<"img">) => (
  <img {...rest} src={chevronDown} className={cn(className, "h-4 w-4")} />
);

const RenameIcon = ({ className, ...rest }: React.ComponentProps<"img">) => (
  <img {...rest} src={pencil} className={cn(className, "h-4 w-4")} />
);

export function TreeView({ currentRoot, currentPath }: TreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { renameFileOrFolder } = useAppState();

  console.log({ currentRoot, currentPath });

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

          <button
            onClick={() => {
              renameFileOrFolder(currentPath, "new name");
            }}
          >
            <RenameIcon />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="pl-4">
          {currentRoot.items.map((item, index) => {
            if ("items" in item) {
              return (
                <TreeView
                  key={item.id}
                  currentRoot={item}
                  currentPath={`${currentPath}/items/[${index}]`}
                />
              );
            }
            return (
              <div className="flex gap-1 px-2" key={item.id}>
                <span>{item.name}</span>
                <div id="button-panel" className="flex gap-1">
                  <button
                    onClick={() => {
                      renameFileOrFolder(`${currentPath}/items/[${index}]`, "new name");
                    }}
                  >
                    <RenameIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
