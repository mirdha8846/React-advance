import { useState } from "react"
import explorer from "./data/FolderData.js"
import Folder from "./Folder"
import useTraverseTree from "./hook/usetree.jsx"

function App() {
    const [jsondata,setJsonData]=useState(explorer)
    const {insertnode,deletenode,editname}=useTraverseTree()

    const handleInsertNode=(folderId, item, isFolder)=>{
      const newTree=insertnode(jsondata,folderId, item, isFolder)
      setJsonData(newTree)
    }
      const handleDeleteNode=(folderId)=>{
        const newTree=deletenode(jsondata,folderId)
        setJsonData(newTree)
      }
      const handleEditName=(folderId,name)=>{
        const newTree=editname(jsondata,folderId,name)
        setJsonData(newTree)
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
