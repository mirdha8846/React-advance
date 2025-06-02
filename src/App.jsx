import { useState } from "react"
import explorer from "./data/FolderData.js"
import Folder from "./Folder"
import useTraverseTree from "./hook/usetree.jsx"

function App() {
  const getInitialTree = () => {
  const savedTree = localStorage.getItem("fileTree");
  if (savedTree) {
    return JSON.parse(savedTree); // localStorage me tree hai, use karo
  }
  // Nahi hai to empty root tree return karo
  return {
    id: 1,
    name: "root",
    isFolder: true,
    items: []
  };
};
    const [jsondata,setJsonData]=useState(getInitialTree)
    const {insertnode,deletenode,editname}=useTraverseTree()

    const handleInsertNode=(folderId, item, isFolder)=>{
      const newTree=insertnode(jsondata,folderId, item, isFolder)
      setJsonData(newTree)
       localStorage.setItem("fileTree", JSON.stringify(newTree));
    }
      const handleDeleteNode=(folderId)=>{
        const newTree=deletenode(jsondata,folderId)
        setJsonData(newTree)
         localStorage.setItem("fileTree", JSON.stringify(newTree));
      }
      const handleEditName=(folderId,name)=>{
        const newTree=editname(jsondata,folderId,name)
        setJsonData(newTree)
         localStorage.setItem("fileTree", JSON.stringify(newTree));
      }
  return (
    <>
      <div>
        <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditName={handleEditName} explorer={jsondata}/>
      </div>
    </>
  )
}

export default App
