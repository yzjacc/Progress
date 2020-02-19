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

var root = getTree("abcde", "cbdae")
console.log(root)
console.log(getDeep(root));

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

// LRD(a);