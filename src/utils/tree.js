

/**
 * 将list装换成tree
 * @param {Object} myId  数据主键id
 * @param {Object} pId     数据关联的父级id
 * @param {Object} list list集合
 */
// export const listToTree = function (myId,pId,list){
//     let trees = [];
//
//     for (let i = 0,len = list.length;i<len;) {
//         let treeNode = list[i];
//         if (parentId.equals(treeNode[pId])) {
//             trees.add(treeNode);
//         }
//
//         for (it : list) {
//             if (it.getParentId().equals(treeNode.getId())) {
//                 if (treeNode.getChildren() == null) {
//                     treeNode.setChildren(new ArrayList<>());
//                 }
//                 treeNode.getChildren().add(it);
//             }
//         }
//     }
//     return trees;
//
//     /**
//      * 两层循环实现建树
//      *
//      * @param treeNodes 传入的树节点列表
//      * @return
//      */
//     public static List<TreeNode> bulid(List<TreeNode> treeNodes,String parentId) {
//
//         List<TreeNode> trees = new ArrayList<>();
//
//
//     }
//
//
//
//     function exists(list, parentId){
//         for(let i=0; i<list.length; i++){
//             if (list[i][myId] == parentId) return true;
//         }
//         return false;
//     }
//
//     let nodes = [];
//     // get the top level nodes
//     for(let i=0; i<list.length; i++){
//         let row = list[i];
//         if (!exists(list, row[pId])){
//             nodes.push(row);
//         }
//     }
//
//     let toDo = [];
//     for(let i=0; i<nodes.length; i++){
//         toDo.push(nodes[i]);
//     }
//     while(toDo.length){
//         let node = toDo.shift();    // the parent node
//         // get the children nodes
//         for(let i=0; i<list.length; i++){
//             let row = list[i];
//             if (row[pId] == node[myId]){
//                 //let child = {id:row.id,text:row.name};
//                 if (node.children){
//                     node.children.push(row);
//                 } else {
//                     node.children = [row];
//                 }
//                 toDo.push(row);
//             }
//         }
//     }
//     return nodes;
// };
export const listToTree = function (myId,pId,list){
    function exists(list, parentId){
        for(let i=0; i<list.length; i++){
            if (list[i][myId] == parentId) return true;
        }
        return false;
    }

    let nodes = [];
    // get the top level nodes
    for(let i=0; i<list.length; i++){
        let row = list[i];
        if (!exists(list, row[pId])){
            nodes.push(row);
        }
    }

    let toDo = [];
    for(let i=0; i<nodes.length; i++){
        toDo.push(nodes[i]);
    }
    while(toDo.length){
        let node = toDo.shift();    // the parent node
        // get the children nodes
        for(let i=0; i<list.length; i++){
            let row = list[i];
            if (row[pId] == node[myId]){
                //let child = {id:row.id,text:row.name};
                if (node.children){
                    let has = node.children.find( item=> item[myId]==row[myId]);
                    if (!has){
                        node.children.push(row);
                    }

                } else {
                    node.children = [row];
                }
                toDo.push(row);
            }
        }
    }
    return nodes;
};


//
// console.log(JSON.stringify(listToTree("ids","parentId",list)));
// console.log(listToTree("ids","parentId",list));