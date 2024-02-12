import { useAppState } from "~/components/state";
import { TreeView } from "~/components/treeview";

export function App() {
  const { state } = useAppState();
  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="flex flex-col items-center">
        <div className="inline-flex bg-slate-400">
          <TreeView currentRoot={state} currentPath={state.id} isFolder={true} />
        </div>
      </div>
    </div>
  );
}
