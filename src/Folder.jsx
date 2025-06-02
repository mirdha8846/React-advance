import { useState } from "react";

function Folder({handleInsertNode=()=>{} ,handleDeleteNode=()=>{},handleEditName=()=>{},explorer }) {
  const [expand, setExpand] = useState(false);
  const [showinput,setShowInput]=useState({
    visible:false,
    isFolder:false
  })

  const addfolder=(isFolder)=>{
    setExpand(true)
    setShowInput({
        visible:true,
        isFolder
    })
  }
  const onAddFolder=(e)=>{
    if(e.keyCode===13&&e.target.value){
        handleInsertNode(explorer.id,e.target.value,showinput.isFolder)
        setShowInput({ ...showinput, visible: false });
    }
}
const deleteFodler=()=>{
      console.log("folderID==",explorer.id)
      handleDeleteNode(explorer.id)
      setShowInput({ ...showinput, visible: false });
  }
  const editname=(e)=>{
    const value = prompt("enter value");
alert(value);
console.log(value)
    handleEditName(explorer.id,value)
    setShowInput({ ...showinput, visible: false });
  }
  if (explorer.isFolder) {
    return (
      <div>
        <span
          onClick={() => setExpand(!expand)}
          style={{ marginRight: 10, cursor: "pointer" }}
        >
          {expand ? "📂" : "📁"} {explorer.name}
        </span>
        <span >
  <button style={{marginRight:5}} onClick={() => addfolder(true)}>+📁</button>
  <button onClick={() => addfolder(false)} style={{marginRight:5}}>+📄</button>
  <button onClick={() => deleteFodler()} style={{marginRight:5}}>♻️</button>
  <button onClick={() => editname()}>edit</button>
</span>

        <div
          style={{
            marginTop: 5,
            marginLeft: 20,
            display: expand ? "block" : "none",
          }}
        >
            {showinput.visible&&(
                <div>
                    <span>{showinput.isFolder? "📁" : "📄"}</span>
                    <input 
                    autoFocus
                    type="text"
                    onBlur={()=>setShowInput({...showinput,visible:false})}
                    onKeyDown={onAddFolder}
                    />
                </div>
    )}

          {explorer.items &&
            explorer.items.map((item) => (
              <Folder explorer={item} key={item.id} handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditName={handleEditName} />
            ))}
        </div>
      </div>
    );
  } else {
    // return <div className="file">📄 {explorer.name}</div>;
    return <div>
      <span>
        📄 {explorer.name}
  <button onClick={() => deleteFodler()} style={{marginRight:5,marginLeft:5}}>♻️</button>
  <button onClick={() => editname()}>edit</button>
      </span>
    </div>
  }
}

export default Folder;
