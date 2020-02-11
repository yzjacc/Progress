const oContainer = document.getElementById('container');
const oButton = document.getElementById('button');
const patch = snabbdom.init([]);
const h = snabbdom.h;
let vNode = null;
const dataList = [
    {
        name: 'shan',
        age: 18,
        profession: '讲师'
    },
    {
        name: 'jc',
        age: 22,
        profession: '自称华语最帅男讲师'
    },
    {
        name: 'cst',
        age: 20,
        profession: '从前是高瘦帅的，现在是胖讲师'
    },
    {
        name: 'dxm',
        age: 88,
        profession: '渡一教具，哪都有他'
    }
];

function getData (dataList) {
    const liArr = [];
    let newVNode = null;

    dataList.forEach( item => {
        const li = h('li', {}, [
            h('span', {}, [item.name]),
            h('span', {}, [item.age]),
            h('span', {}, [item.profession])
        ])
        liArr.push(li);
    })
    
    newVNode = h('ul#container', {}, liArr)

    if (vNode) {
        patch(vNode, newVNode);
    } else {
        patch(oContainer, newVNode)
    }
    vNode = newVNode;
}

oButton.onclick = function () {
    dataList[0].profession = '可能是宇宙最美讲师了';
    dataList[1].profession = '杉杉的擦桌工';
    dataList[2].profession = '杉杉的倒水工';
    dataList[3].profession = '杉杉的擦鞋工';
    getData(dataList)
}

getData (dataList)