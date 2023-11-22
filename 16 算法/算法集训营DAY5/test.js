function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

/**
 * 前序遍历
 * @param {*} root 
 */
function DLR(root) {
    if (!root) return;// 没有节点
    console.log(root.value);
    DLR(root.left);
    DLR(root.right);
}

/**
 * 中序遍历
 * @param {*} root 
 */
function LDR(root) {
    if (!root) return;// 没有节点
    LDR(root.left);
    console.log(root.value);
    LDR(root.right);
}

/**
 * 后序遍历
 * @param {*} root 
 */
function LRD(root) {
    if (!root) return;// 没有节点
    LRD(root.left);
    LRD(root.right);
    console.log(root.value);
}

/**
 * 根据前序遍历，和 中序遍历，得到一棵树的根节点
 * @param {*} dlr 
 * @param {*} ldr 
 */
function getTree(dlr, ldr) {
    dlr = dlr.split("");
    ldr = ldr.split("");
    if (dlr.length !== ldr.length) throw new Error("无效的遍历值");
    if (dlr.length === 0) return null;

    var rootValue = dlr[0]; //取出根节点的值 
    var root = new Node(rootValue);

    var index = ldr.indexOf(rootValue); //找到根节点的值在中序遍历中的位置
    var leftLDR = ldr.slice(0, index).join(""); //左边的中序遍历结果
    var leftDLR = dlr.slice(1, leftLDR.length + 1).join(""); //左边的前序遍历结果
    root.left = getTree(leftDLR, leftLDR);

    var rightLDR = ldr.slice(index + 1).join(""); //右边的中序遍历结果
    var rightDLR = dlr.slice(leftLDR.length + 1).join(""); //右边的前序遍历结果
    root.right = getTree(rightDLR, rightLDR);

    return root;
}

/**
 * 得到一棵树的深度
 * @param {*} root 
 */
function getDeep(root) {
    if (!root) return 0;
    var left = getDeep(root.left);
    var right = getDeep(root.right);
    return Math.max(left, right) + 1;
}

// var root = getTree("abcde", "cbdae")
// console.log(root)
// console.log(getDeep(root));

/**
 * 根据要查找的值，判断树中是否找到
 * @param {*} root 
 * @param {*} targetValue 
 */
function deepFirstSearch(root, targetValue) {
    if (!root) return false;
    console.log(root.value);
    if (root.value === targetValue) return true;
    //自己是一个节点，但是节点的值不是要找的值
    var resultLeft = deepFirstSearch(root.left, targetValue);
    var resultRight = deepFirstSearch(root.right, targetValue);
    return resultLeft || resultRight;
}

/**
 * 广度优先搜索
 * @param {*} nodes 数组，某一层的所有结点 
 * @param {*} targetValue 
 */
function breadthFirstSearch(nodes, targetValue) {
    if (nodes.length === 0) return false;//搜不到
    var nexts = []; //下一层的结点
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].value === targetValue) {
            return true;
        }
        else {
            if (nodes[i].left) {
                nexts.push(nodes[i].left)
            }
            if (nodes[i].right) {
                nexts.push(nodes[i].right)
            }
        }
    }
    console.log(nexts)
    //这一层找不到了，找下一层
    return breadthFirstSearch(nexts, targetValue);
}

// var a = new Node("a");
// var b = new Node("b");
// var c = new Node("c");
// var d = new Node("d");
// var e = new Node("e");
// var f = new Node("f");

// a.left = b;
// a.right = e;

// b.left = c;
// b.right = d;

// e.left = f;

// var result = breadthFirstSearch([a], "n");
// console.log(result)

/**
 * 得到两棵树的差异
 * @param {*} originRoot 
 * @param {*} newRoot 
 */
function diff(originRoot, newRoot) {
    var results = []; //记录所有的差异

    if (!originRoot && !newRoot) {
        return [];//两个结点没东西，无差异
    }
    else if (!originRoot && newRoot) {
        //属于新增
        results.push({
            type: "新增",
            originNode: originRoot,
            newNode: newRoot
        })
    }
    else if (originRoot && !newRoot) {
        //属于删除
        results.push({
            type: "删除",
            originNode: originRoot,
            newNode: newRoot
        })
    }
    else if (originRoot.value !== newRoot.value) {
        //属于修改
        results.push({
            type: "修改",
            originNode: originRoot,
            newNode: newRoot
        })

        var results1 = diff(originRoot.left, newRoot.left)
        var results2 = diff(originRoot.right, newRoot.right);
        //将后续的差异汇总到当前的差异数组中
        results = results.concat(results1).concat(results2)
    }
    else {
        //两个结点一样，继续向后比较
        var results1 = diff(originRoot.left, newRoot.left)
        var results2 = diff(originRoot.right, newRoot.right);
        //将后续的差异汇总到当前的差异数组中
        results = results.concat(results1).concat(results2)
    }

    return results;
}

var root1 = getTree("abcd", "cbda");

var root2 = getTree("afkes", "kfase");

var results = diff(root1, root2);
console.log(results);