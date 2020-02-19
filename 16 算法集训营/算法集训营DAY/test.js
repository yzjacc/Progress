function Node(value) {
    this.value = value;
    this.neighbors = [];
}

/**
 * 深度优先遍历
 * @param {*} node 
 * @param {*} targetValue 
 * @param finded 已经找过的结点
 */
function deepFirstSearch(node, targetValue, finded) {
    //如果finded数组中包含了node，说明，当前结点已经被看过了，直接返回
    if (finded.includes(node)) return false;
    if (node.value === targetValue) return true;
    finded.push(node); //将当前结点加入到已找过的结点
    //自己不是要找到，看相邻结点
    for (var i = 0; i < node.neighbors.length; i++) {
        if (deepFirstSearch(node.neighbors[i], targetValue, finded)) {
            //在其中一个相邻结点的深搜过程中找到了
            return true;
        }
    }
    return false; //所有相邻的结点的深搜过程中都找不到
}

/**
 * 图的广搜
 * @param {*} nodes 要找的某一群结点，该数组中的结点都是没有找过的
 * @param {*} targetValue 
 * @param finded 已经找过的结点
 */
function breadthFirstSearch(nodes, targetValue, finded) {
    if (nodes.length === 0) return false;
    var nexts = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].value === targetValue) {
            return true;
        }
        //说明该结点已找过
        finded.push(nodes[i]);
        //直接将该结点的相邻结点加入到数组nexts
        for (var j = 0; j < nodes[i].neighbors.length; j++) {
            var n = nodes[i].neighbors[j]; //第j个邻居
            if (!nexts.includes(n)) {
                nexts.push(n);
            }
        }
    }
    //重新对nexts进行处理
    for (var i = 0; i < nexts.length; i++) {
        if (finded.includes(nexts[i])) {
            nexts.splice(i, 1);
            i--;
        }
    }

    console.log(nexts);
    return breadthFirstSearch(nexts, targetValue, finded);
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");


/**
 * 使用Prim算法根据点的集合，和边的集合，链接结点
 * @param {*} nodes 
 * @param {*} sides 
 */
function Prim(nodes, sides) {
    //先做一个验证
    if (nodes.length !== sides.length || nodes.length <= 1) return;

    var horde = [nodes[0]]; //已连接的点形成的部落

    while (horde.length < nodes.length) {
        //添加一个点到部落horde
        //找到一个到这个部落最短的点
        var result = { //求的最短的点
            dis: Infinity, //距离默认无穷大
            to: null, //连接到部落的哪个点，部落的点
            from: null //从哪个点连接到部落,新的点
        }
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i]; //一个点一个点拿出来比较
            if (horde.includes(node)) {
                //部落中已经有这个点了
                continue; //进行下一次循环
            }
            //这个点没有在部落中
            var info = getMinDistance(node); //得到该点到部落的距离信息
            if (info.dis < result.dis) {
                result.dis = info.dis;
                result.to = info.connect;
                result.from = node;
            }
        }
        //将点和部落中对应的点进行连接
        result.to.neighbors.push(result.from);
        result.from.neighbors.push(result.to);
        //将该点加入到部落中
        horde.push(result.from);
    }

    /**
     * 查找指定的结点到当前部落最短的距离和要连接的点
     * @param {*} node 
     */
    function getMinDistance(node) {
        var result = { //求的结果
            dis: Infinity, //距离默认无穷大
            connect: null //连接到部落的哪个点
        }
        for (var i = 0; i < horde.length; i++) {
            var target = horde[i]; //部落中的某个结点
            var dis = getDistance(node, target);
            if (dis < result.dis) {
                result.dis = dis;
                result.connect = target;
            }
        }
        return result;
    }

    /**
     * 得到两个点的距离
     * @param {*} node1 
     * @param {*} node2 
     */
    function getDistance(node1, node2) {
        var i1 = nodes.indexOf(node1); //第一个点的下标
        var i2 = nodes.indexOf(node2);//第二个点的下标
        return sides[i1][i2];
    }
}



//点的集合
var nodes = [a, b, c, d, e];
//边的集合
var sides = [
    [0, 8, 3, Infinity, 4],//a点到其他结点的距离
    [8, 0, 4, 10, Infinity], //b到其他点的距离
    [3, 4, 0, 3, Infinity], //c到其他点的距离
    [Infinity, 10, 3, 0, 6], //d到其他点的距离
    [4, Infinity, Infinity, 6, 0], //e到其他点的距离
];

Prim(nodes, sides);

console.log(a)