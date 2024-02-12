import { useState } from "react";

import chevronDown from "~/assets/chevron-down.svg";
import chevronUp from "~/assets/chevron-up.svg";
import pencil from "~/assets/pencil.svg";
import { FileType, FolderType } from "~/types";
import { cn } from "~/utils";

import { useAppState } from "./state";

export type TreeViewProps =
  | {
      currentRoot: FolderType;
      currentPath: string;
      isFolder: true;
    }
  | {
      currentRoot: FileType;
      currentPath: string;
      isFolder?: false;
    };

const CollapseIcon = ({ className, ...rest }: Omit<React.ComponentProps<"img">, "src">) => (
  <img {...rest} src={chevronUp} className={cn(className, "h-4 w-4")} />
);

const ExpandIcon = ({ className, ...rest }: React.ComponentProps<"img">) => (
  <img {...rest} src={chevronDown} className={cn(className, "h-4 w-4")} />
);

const RenameIcon = ({ className, ...rest }: React.ComponentProps<"img">) => (
  <img {...rest} src={pencil} className={cn(className, "h-4 w-4")} />
);

export function TreeView(props: TreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const { renameFileOrFolder } = useAppState();

  return (
    <div className="flex min-w-44 flex-col gap-2">
      <div className="flex w-full gap-1 px-2">
        {isRenaming ? (
          <input
            type="text"
            defaultValue={props.currentRoot.name}
            onBlur={(e) => {
              setIsRenaming(false);
              if (!e.target.value) return;
              renameFileOrFolder(props.currentPath, e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsRenaming(false);
                if (!e.currentTarget.value) return;
                renameFileOrFolder(props.currentPath, e.currentTarget.value);
              }
              if (e.key === "Escape") {
                setIsRenaming(false);
              }
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            autoFocus={true}
            className="max-w-min overflow-x-auto border-transparent"
          />
        ) : (
          <span className="w-full">{props.currentRoot.name}</span>
        )}
        <div id="button-panel" className="flex gap-1">
          {props.isFolder && (
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
            </button>
          )}

          {!isRenaming && (
            <button
              onClick={() => {
                setIsRenaming(true);
              }}
            >
              <RenameIcon />
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="pl-4">
          {props.isFolder ? (
            props.currentRoot.items.map((item, index) => {
              if ("items" in item) {
                return (
                  <TreeView
                    key={item.id}
                    currentRoot={item}
                    currentPath={`${props.currentPath}/items/[${index}]`}
                    isFolder={true}
                  />
                );
              }
              return (
                <TreeView
                  key={item.id}
                  currentRoot={item}
                  currentPath={`${props.currentPath}/items/[${index}]`}
                />
              );
            })
          ) : (
            <TreeView currentRoot={props.currentRoot} currentPath={props.currentPath} />
          )}
        </div>
      )}
    </div>
  );
}
