export type FileType = {
  id: string;
  name: string;
};

export type FolderType = {
  id: string;
  name: string;
  items: Array<FileType | FolderType>;
};
