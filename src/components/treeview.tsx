import { useState } from "react";

import { FolderType } from "~/types";

export type TreeViewProps = {
  currentRoot: FolderType;
};

export function TreeView({ currentRoot }: TreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 px-2">
        <span>{currentRoot.name}</span>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "collapse" : "expand"}
        </button>
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
