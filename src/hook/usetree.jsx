const useTraverseTree = () => {
  const insertnode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree
    }
    let latestNode=[]
    latestNode=tree.items.map((subTree)=>{
       return insertnode(subTree,folderId, item, isFolder)

    })
    return{...tree,items:latestNode}
  };
const deletenode = function (tree, folderId) {
    if (!tree.items) return tree;//base case for recursion
    const filteredItems = tree.items
        .filter((item) => item.id !== folderId)//if folderID match with tree.id then usko out krdega array se only remaining items rkhega
        .map((item) => {//map for items 
            if (item.isFolder) {
                return deletenode(item, folderId);
            }
            return item;
        });
    return { ...tree, items: filteredItems };
};
const editname = function(tree, folderId, name) {
    if (tree.id === folderId) {
        return { ...tree, name: name };
    }
    const updatedItems = tree.items.map((subTree) => {
        return editname(subTree, folderId, name);
    });
    return { ...tree, items: updatedItems };
}

  return {insertnode,deletenode,editname}
};
export default useTraverseTree