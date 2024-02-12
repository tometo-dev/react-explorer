import set from "lodash/set";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

import { FolderType } from "~/types";

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

type ContextValueType = {
  state: FolderType;
  renameFileOrFolder: (path: string, newName: string) => void;
};

const StateContext = createContext<ContextValueType | null>(null);

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
  switch (_action.type) {
    case ACTIONS.RENAME: {
      const oldState = { ...state };

      const { path, newName } = _action.payload as { path: string; newName: string };

      // replace `/` with `.`
      let objectPath = path.replace(/\//g, ".");

      // replace "_root" with ""
      objectPath = objectPath.replace(/^_root/, "");

      // remove leading `.`
      objectPath = objectPath.replace(/^\./, "");

      const namePath = objectPath === "" ? "name" : `${objectPath}.name`;

      const updatedState = set(oldState, namePath, newName);
      return updatedState;
    }
  }
  return state;
}

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, _dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const renameFileOrFolder = useCallback((path: string, newName: string) => {
    _dispatch({ type: ACTIONS.RENAME, payload: { path, newName } });
  }, []);

  const value = useMemo(() => ({ state, renameFileOrFolder }), [state, renameFileOrFolder]);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState() {
  const context = useContext(StateContext);
  if (context === null) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
