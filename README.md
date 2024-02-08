# Explorer

---

### Problem Statement

You are given an initial structure for the file system. Write a react application to support the following features:

- Add a file/folder
- Rename a file/folder
- Delete a file/folder

#### Input

```js
{
  id:"1",
  name: "root",
  items: [
    {
      id:"2",
      name: "public",
      items: []
    },
    {
      id:"7",
      name: "src",
      items: [
        {
          id:"8",
          name: "App.js",
        },
        {
          id:"9",
          name: "Index.js",
        },
        {
          id:"10",
          name: "styles.css",
        }
      ]
    },
  ]
};
```
