// 解构

let obj = {
    name: 'cst',
    age: 18,
    sex: 'female'
};

// let name, age;

// ({name, age} = obj);
// console.log(name, age);


// let {name, age} = obj;

// console.log(name, age);

// 默认赋值
// let {name: oName, age: oAge, sex = 'male'} = obj;
// console.log(oName, oAge, sex);


// function sum (a = 10, b = 20) {
//     return a + b;
// }
// console.log( sum(1) );


// 解构数组

// let arr = [1,2,3];

// // let {0: x, 1: y, 2: z} = arr;

// let [x, y, z] = arr;
// console.log(x, y, z);
// console.log(x, y, z);

// let {length} = arr;
// console.log(length)

// let arr = [1, 2, 3, {name: 'cst'}];

// let [,,,{name: oName}] = arr;
// console.log(oName);

// 复杂数据里面我要分开操作时候
// 解构很有用

// var res = '{"name":"海王 Aquaman","poster":"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541280047.webp","direct":"温子仁","screenwriter":["大卫·莱斯利·约翰逊-麦戈德里克","威尔·比尔","乔夫·琼斯","温子仁","莫尔特·魏辛格","保罗·诺里斯"],"mainActor":["杰森·莫玛","艾梅柏·希尔德","妮可·基德曼","帕特里克·威尔森","威廉·达福","叶海亚·阿卜杜勒-迈丁","杜夫·龙格尔","兰道尔·朴"],"gut":"华纳兄弟影片公司与导演温子仁联手为您呈现波澜壮阔的动作冒险电影——《海王》！横跨七大洋的广阔海底世界徐徐展开，给观众带来震撼十足的视觉奇观。本片由杰森·莫玛领衔主演，讲述半人半亚特兰蒂斯血统的亚瑟·库瑞踏上永生难忘的征途——他不但需要直面自己的特殊身世，更不得不面对生而为王的考验：自己究竟能否配得上“海王”之名。"}'

// var oRes = JSON.parse(res);
// // console.log(oRes);

// let {direct, gut, mainActor, screenwriter} = oRes;
// console.log(direct, gut, mainActor, screenwriter)