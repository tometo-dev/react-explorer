import { useReducer } from "react";

import type { FolderType } from "~/types";

import { TreeView } from "./components/treeview";

const ACTIONS = {
  RENAME: "RENAME",
  ADD_FILE: "ADD_FILE",
  DELETE_FILE: "DELETE_FILE",
  ADD_FOLDER: "ADD_FOLDER",
  DELETE_FOLDER: "DELETE_FOLDER",
} as const;

type Action = {
  type: (typeof ACTIONS)[keyof typeof ACTIONS];
  payload: unknown;
};

type State = FolderType;

const INITIAL_STATE: State = {
  id: "_root",
  name: "root",
  items: [
    {
      id: "2",
      name: "public",
      items: [],
    },
    {
      id: "7",
      name: "src",
      items: [
        {
          id: "8",
          name: "App.js",
        },
        {
          id: "9",
          name: "Index.js",
        },
        {
          id: "10",
          name: "styles.css",
        },
      ],
    },
  ],
};

function stateReducer(state: State, _action: Action): State {
  return state;
}

export function App() {
  const [state, _dispatch] = useReducer(stateReducer, INITIAL_STATE);
  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="flex flex-col items-center">
        <div className="inline-flex bg-slate-400">
          <TreeView currentRoot={state} />
        </div>
      </div>
    </div>
  );
}
