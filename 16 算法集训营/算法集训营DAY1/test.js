/**
 * 构造函数，表示链表的一个节点
 */
function Node(value) {
    this.value = value; //节点的数据
    this.next = null; //下一个节点的地址
}

/**
 * 遍历一个链表，打印每个节点的数据
 * @param root 链表的根节点
 */
function print(root) {
    // var node = root;
    // while (node) {
    //     //如果node有值，打印
    //     console.log(node.value);
    //     node = node.next;
    // }

    // 分治法
    if (root) {
        console.log(root.value); //打印自己
        print(root.next);
    }
}

/**
 * 计算链表的长度
 * @param {*} root 
 */
function count(root) {
    if (!root) return 0; //链表没有节点
    return 1 + count(root.next); //1表示根节点占用一个数量
}

/**
 * 得到链表某个下标的数据
 * @param {*} root 
 * @param {*} index 
 */
function getNode(root, index) {
    /**
     * 判断某个节点是否是我要查找的节点
     * @param {*} node 表示某个节点
     * @param {*} i 该节点是第几个节点
     */
    function _getValue(node, i) {
        if (!node) return null;
        if (i === index) return node;
        return _getValue(node.next, i + 1);
    }
    return _getValue(root, 0);
}

/**
 * 设置链表某个位置的数据
 */
function setValue(root, index, value) {
    function _setValue(node, i) {
        if (!node) return;
        if (i === index) {
            node.value = value
        }
        else {
            _setValue(node.next, i + 1);
        }
    }
    _setValue(root, 0);
}

/**
 * 在某个链表节点之后加入一个新节点
 * @param node 在哪个节点之后加入
 * @param newValue 新节点的数据
 */
function insertAfter(node, newValue) {
    var newNode = new Node(newValue); //构建新节点

    node.next = newNode;
    newNode.next = node.next;
}

/**
 * 在链表的末尾加入新节点
 */
function push(root, newValue) {
    //判断root是不是最后一个节点
    if (!root.next) {
        //最后一个节点
        var newNode = new Node(newValue);
        root.next = newNode;
    }
    else {
        push(root.next, newValue); //自己不是最后一个，看下一个
    }
}

/**
 * 根据给定的链表，和 给定的要删除的值，删除对应节点
 * @param {*} root 
 * @param {*} nodeValue 
 */
function removeNode(root, nodeValue) {
    if (!root || !root.next) return; //无法删除的情况
    if (root.next.value === nodeValue) {
        //下一个节点就是要找的节点
        root.next = root.next.next;
    }
    else {
        //下一个节点还不是
        removeNode(root.next, nodeValue);
    }
}

/**
 * 给定一个链表，返回一个倒序后的根节点
 * @param {*} root 
 */
function reverse(root) {
    if (!root || !root.next) return root;
    if (!root.next.next) {
        var temp = root.next; //保存返回的节点
        //有两个节点的链表
        root.next.next = root;
        root.next = null;
        return temp;
    }
    else {
        var temp = reverse(root.next); //后续节点倒序
        root.next.next = root;
        root.next = null;
        return temp;
    }
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");

a.next = b;
b.next = c;

// insertAfter(b, "d");

var temp = reverse(a);

print(temp);