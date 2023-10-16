let readline = require("readline-sync"); // 引入输入模块
// 清屏函数
let clear = () =>
  process.stdout.write(
    process.platform === "win32" ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H"
  );
// 管理员信息
let adminInfo = [
  { adminID: "xiejie", adminPWD: "123" },
  { adminID: "song", adminPWD: "321" },
];
// 初始化3个班级的学生信息 使用2维数组来存储
let stuInfo = [
  [
    {
      stuID: "1",
      stuName: "bdy",
      stuAge: "18",
      stuGender: "male",
      stuScore: "100",
      className: "1班",
    },
    {
      stuID: "2",
      stuName: "luc",
      stuAge: "23",
      stuGender: "female",
      stuScore: "89",
      className: "1班",
    },
    {
      stuID: "3",
      stuName: "lc",
      stuAge: "17",
      stuGender: "male",
      stuScore: "93",
      className: "1班",
    },
    {
      stuID: "4",
      stuName: "xu",
      stuAge: "19",
      stuGender: "female",
      stuScore: "91",
      className: "1班",
    },
    {
      stuID: "5",
      stuName: "chao",
      stuAge: "20",
      stuGender: "male",
      stuScore: "95",
      className: "1班",
    },
  ],
  [
    {
      stuID: "1",
      stuName: "wf",
      stuAge: "18",
      stuGender: "female",
      stuScore: "85",
      className: "2班",
    },
    {
      stuID: "2",
      stuName: "xtf",
      stuAge: "19",
      stuGender: "female",
      stuScore: "91",
      className: "2班",
    },
    {
      stuID: "3",
      stuName: "xj",
      stuAge: "19",
      stuGender: "male",
      stuScore: "92",
      className: "2班",
    },
    {
      stuID: "4",
      stuName: "ls",
      stuAge: "21",
      stuGender: "male",
      stuScore: "94",
      className: "2班",
    },
    {
      stuID: "5",
      stuName: "xjs",
      stuAge: "22",
      stuGender: "female",
      stuScore: "89",
      className: "2班",
    },
  ],
  [
    {
      stuID: "1",
      stuName: "yaj",
      stuAge: "22",
      stuGender: "male",
      stuScore: "86",
      className: "3班",
    },
    {
      stuID: "2",
      stuName: "xj",
      stuAge: "25",
      stuGender: "female",
      stuScore: "89",
      className: "3班",
    },
    {
      stuID: "3",
      stuName: "xiz",
      stuAge: "24",
      stuGender: "female",
      stuScore: "80",
      className: "3班",
    },
    {
      stuID: "4",
      stuName: "yhq",
      stuAge: "26",
      stuGender: "female",
      stuScore: "92",
      className: "3班",
    },
    {
      stuID: "5",
      stuName: "npa",
      stuAge: "19",
      stuGender: "male",
      stuScore: "96",
      className: "3班",
    },
  ],
];
// 管理员登录验证函数 账号密码能匹配上返回true 不能匹配上返回false
let adminLogin = function (adminID, adminPWD) {
  for (let i = 0; i < adminInfo.length; i++) {
    if (
      adminID === adminInfo[i].adminID &&
      adminPWD === adminInfo[i].adminPWD
    ) {
      return true;
    }
  }
  return false;
};
// 班级选择函数 用于打印出用户可选的班级 返回一个字符串
let classSelect = function () {
  let str = "";
  // 使用for循环拼接出所有的班级，例如：1.第1班    2.第2班    3.第3班    4.返回
  for (let i = 0; i < stuInfo.length; i++) {
    if (stuInfo[i] !== null) {
      str += i + 1 + "." + "第" + (i + 1) + "班    ";
    }
  }
  return "请选择班级：" + str + (stuInfo.length + 1) + ".返回";
};
// 班级确认函数 用于确认用户输入的班级是否正确
let classCheck = function (classNo) {
  for (let i = 0; i < stuInfo.length; i++) {
    if (classNo === i + 1 && stuInfo[i] !== null) {
      return true;
    }
  }
  return false;
};
// 班级查询函数 接收一个参数 用户想要查询的班级编号 打印出该班级所有学生的信息
let classQuery = function (classNo) {
  clear();
  console.log("班级信息如下：");
  console.log("班级   学号     姓名    年龄    性别    分数");
  let str = ""; // 声明一个空字符串用于拼接班级里面的学生信息
  for (let i = 0; i < stuInfo[classNo - 1].length; i++) {
    str +=
      stuInfo[classNo - 1][i].className +
      "\t" +
      stuInfo[classNo - 1][i].stuID +
      "\t" +
      stuInfo[classNo - 1][i].stuName +
      "\t" +
      stuInfo[classNo - 1][i].stuAge +
      "\t" +
      stuInfo[classNo - 1][i].stuGender +
      "\t" +
      stuInfo[classNo - 1][i].stuScore;
    console.log(str); // 拼接好一行就打印一行
    str = ""; // 清空字符串 以便下一次拼接
  }
};
// 学生查询函数 接收一个参数 学生姓名(字符串) 打印出该姓名的所有学生
let stuQuery = function (stuName) {
  let num = 0;
  let str = ""; // 声明一个空字符串用于拼接班级里面的学生信息
  for (let i = 0; i < stuInfo.length; i++) {
    for (let j = 0; j < stuInfo[i].length; j++) {
      if (stuName === stuInfo[i][j].stuName) {
        num++;
        if (num === 1) {
          console.log("找到该姓名学生，该学生具体信息如下：");
          console.log("班级   学号     姓名    年龄    性别    分数");
        }
        str +=
          stuInfo[i][j].className +
          "\t" +
          stuInfo[i][j].stuID +
          "\t" +
          stuInfo[i][j].stuName +
          "\t" +
          stuInfo[i][j].stuAge +
          "\t" +
          stuInfo[i][j].stuGender +
          "\t" +
          stuInfo[i][j].stuScore;
        console.log(str);
        str = "";
      }
    }
  }
  if (num === 0) {
    console.log("对不起，没有找到该学生");
  }
};
// 学生确认函数 接收两个参数 班级编号和学生学号 确认该学生是否存在
let stuCheck = function (classNo, stuNo) {
  for (let i = 0; i < stuInfo[classNo - 1].length; i++) {
    if (stuNo === stuInfo[classNo - 1][i].stuID) {
      return stuInfo[classNo - 1][i]; // 返回该学生的具体信息
    }
  }
  return false;
};
// 学生信息修改函数 接收两个参数 学生对象和修改选项
let editInfo = function (singleStuInfo, editSelect) {
  switch (editSelect) {
    //修改姓名
    case 1:
      {
        console.log("请输入修改后的学生姓名：");
        let newStuName = readline.question("");
        singleStuInfo.stuName = newStuName;
        console.log("修改成功，按回车键返回");
      }
      break;
    //修改年龄
    case 2:
      {
        console.log("请输入修改后的学生年龄：");
        let newStuAge = readline.question("");
        singleStuInfo.stuAge = newStuAge;
        console.log("修改成功，按回车键返回");
      }
      break;
    //修改性别
    case 3:
      {
        let editGender = true;
        let str = "";
        while (editGender) {
          clear();
          str = "";
          console.log("当前该学生信息为：");
          console.log("班级   学号     姓名    年龄    性别    分数");
          str +=
            singleStuInfo.className +
            "\t" +
            singleStuInfo.stuID +
            "\t" +
            singleStuInfo.stuName +
            "\t" +
            singleStuInfo.stuAge +
            "\t" +
            singleStuInfo.stuGender +
            "\t" +
            singleStuInfo.stuScore;
          console.log(str);
          console.log(
            "请选择您要进行修改的学生信息： 1.姓名   2.年龄   3.性别   4.分数   5.返回"
          );
          console.log("请选择学生的性别：  1.男    2.女");
          let newStuGender = parseInt(readline.question(""));
          switch (newStuGender) {
            case 1:
              singleStuInfo.stuGender = "male";
              editGender = false;
              console.log("修改成功，按回车键返回");
              break;
            case 2:
              singleStuInfo.stuGender = "female";
              editGender = false;
              console.log("修改成功，按回车键返回");
              break;
            default:
              console.log("输入有误，请重新输入");
              console.log("按回车键继续");
              readline.question("");
          }
        }
      }
      break;
    //修改分数
    case 4:
      {
        console.log("请输入修改后的学生分数：");
        let newStuScore = readline.question("");
        singleStuInfo.stuScore = newStuScore;
        console.log("修改成功，按回车键返回");
      }
      break;
    default:
      console.log("选择有误，请重新选择");
      break;
  }
  readline.question("");
};
// 添加学生信息函数 接收5个参数 班级编号，学生姓名，年龄，性别，分数
let addStu = function (
  classNo,
  addStuName,
  addStuAge,
  addStuGender,
  addStuScore
) {
  for (let i = 0; i < stuInfo.length; i++) {
    if (classNo === i + 1) {
      let length = stuInfo[i].length;
      stuInfo[i][length] = {};
      stuInfo[i][length].stuID = length + 1 + "";
      stuInfo[i][length].stuName = addStuName;
      stuInfo[i][length].stuAge = addStuAge;
      addStuGender === 1
        ? (stuInfo[i][length].stuGender = "male")
        : (stuInfo[i][length].stuGender = "female");
      stuInfo[i][length].stuScore = addStuScore;
      stuInfo[i][length].className = classNo + "班";
      console.log("新增学生成功！");
    }
  }
};
// 删除班级函数 接收一个参数 要删除的班级的编号
let delClass = function (classNo) {
  while (true) {
    clear();
    console.log(classNo + "班");
    let str = "";
    for (let i = 0; i < stuInfo[classNo - 1].length; i++) {
      str +=
        stuInfo[classNo - 1][i].className +
        "\t" +
        stuInfo[classNo - 1][i].stuID +
        "\t" +
        stuInfo[classNo - 1][i].stuName +
        "\t" +
        stuInfo[classNo - 1][i].stuAge +
        "\t" +
        stuInfo[classNo - 1][i].stuGender +
        "\t" +
        stuInfo[classNo - 1][i].stuScore;
      console.log(str); // 拼接好一行就打印一行
      str = ""; // 清空字符串 以便下一次拼接
    }
    console.log("是否确认删除此班级？(Y/N)");
    let isDel = readline.question("");
    switch (isDel) {
      case "Y":
      case "y":
        stuInfo[classNo - 1] = null;
        console.log("删除班级成功，按回车键返回");
        readline.question("");
        return;
      case "N":
      case "n":
        return;
      default:
        console.log("输入有误，请重新输入！");
        readline.question("");
    }
  }
};
// 删除学生函数 接收2个参数 所要删除的学生所在班级编号以及该学生对象
let delStu = function (classNo, stu, func) {
  let str = "";
  for (let i = 0; i < stuInfo[classNo - 1].length; i++) {
    if (stu.stuID === stuInfo[classNo - 1][i].stuID) {
      if (func === "del") {
        while (true) {
          clear();
          str = "";
          console.log("你要删除的学生信息为：");
          console.log("班级   学号     姓名    年龄    性别    分数");
          str +=
            stuInfo[classNo - 1][i].className +
            "\t" +
            stuInfo[classNo - 1][i].stuID +
            "\t" +
            stuInfo[classNo - 1][i].stuName +
            "\t" +
            stuInfo[classNo - 1][i].stuAge +
            "\t" +
            stuInfo[classNo - 1][i].stuGender +
            "\t" +
            stuInfo[classNo - 1][i].stuScore;
          console.log(str);
          console.log("是否确认删除？(Y/N)");
          let isDel = readline.question("");
          switch (isDel) {
            case "Y":
            case "y":
              stuInfo[classNo - 1].splice(i, 1);
              console.log("删除学生成功，按回车键返回");
              readline.question("");
              return;
            case "N":
            case "n":
              return;
            default:
              console.log("输入有误，请重新输入，按回车键继续");
              readline.question("");
          }
        }
      } else {
        stuInfo[classNo - 1].splice(i, 1);
      }
    }
  }
};
// 转班函数 接收3个参数  原本的班级编号 学生对象 要去的班级编号
let classTransfer = function (classNo, singleStuInfo, classNo2) {
  delStu(classNo, singleStuInfo, "trans");
  let length = stuInfo[classNo2 - 1].length;
  if (length === 0) {
    singleStuInfo.stuID = length + 1 + "";
  } else {
    singleStuInfo.stuID =
      parseInt(stuInfo[classNo2 - 1][length - 1].stuID) + 1 + "";
  }
  singleStuInfo.className = classNo2 + "班";
  stuInfo[classNo2 - 1][length] = singleStuInfo;
};
let main = function () {
  let loginChance = 3; // 登录机会初始化为3次
  while (loginChance) {
    // 只要登录机会不为0 就可以进入系统
    clear();
    console.log("请输入您的账号：");
    let adminID = readline.question("");
    console.log("请输入您的密码：");
    let adminPWD = readline.question("");
    if (adminLogin(adminID, adminPWD)) {
      // 如果管理员身份验证通过 就进入if
      let useSys = true; // 设置使用系统的标识 useSys的值为true
      while (useSys) {
        clear();
        console.log("欢迎使用学生管理系统");
        console.log(
          "请选择您要执行的功能：1.查询   2.修改   3.增加   4.删除   5.转班   6.退出"
        );
        let funcSelect = parseInt(readline.question(""));
        switch (funcSelect) {
          // 查询功能
          case 1:
            let query = true; // 设置查询的标识 query的值为true
            while (query) {
              clear();
              console.log(
                "请选择您要进行的查询：1.班级查询   2.学生查询   3.返回"
              );
              let querySelect = parseInt(readline.question(""));
              switch (querySelect) {
                // 班级查询
                case 1: {
                  clear();
                  let str = ""; // 声明一个临时字符串用于拼接提示信息
                  let classSelectStr = classSelect();
                  while (true) {
                    clear();
                    console.log(classSelectStr);
                    let classNo = parseInt(readline.question(""));
                    if (classCheck(classNo)) {
                      classQuery(classNo);
                    } else {
                      if (classNo === stuInfo.length + 1) {
                        break;
                      } else {
                        console.log("输入有误，请重新输入");
                      }
                    }
                    console.log("按回车键返回");
                    readline.question("");
                  }
                  break;
                }
                // 学生查询
                case 2: {
                  clear();
                  console.log("请输入您要查询的学生的姓名：");
                  let stuName = readline.question("");
                  stuQuery(stuName);
                  console.log("按回车键返回");
                  readline.question("");
                  break;
                }
                case 3:
                  query = false; // 设置查询的标识 query的值为false
                  break;
                default:
                  console.log("输入有误，请重新输入！(按回车键继续)");
                  readline.question("");
              }
            }
            break;
          // 修改功能
          case 2:
            {
              let editChoose = true;
              while (editChoose) {
                clear();
                let str = "";
                let classSelectStr = classSelect();
                console.log(classSelectStr);
                let classNo = parseInt(readline.question(""));
                if (classCheck(classNo)) {
                  clear();
                  console.log("请输入您要修改的学生的学号：");
                  let stuNo = readline.question("");
                  let singleStuInfo = stuCheck(classNo, stuNo);
                  if (singleStuInfo) {
                    while (true) {
                      clear();
                      str = "";
                      console.log("当前该学生信息为：");
                      console.log(
                        "班级   学号     姓名    年龄    性别    分数"
                      );
                      str +=
                        singleStuInfo.className +
                        "\t" +
                        singleStuInfo.stuID +
                        "\t" +
                        singleStuInfo.stuName +
                        "\t" +
                        singleStuInfo.stuAge +
                        "\t" +
                        singleStuInfo.stuGender +
                        "\t" +
                        singleStuInfo.stuScore;
                      console.log(str);
                      console.log(
                        "请选择您要进行修改的学生信息： 1.姓名   2.年龄   3.性别   4.分数   5.返回"
                      );
                      let editSelect = parseInt(readline.question(""));
                      if (editSelect !== 5) {
                        editInfo(singleStuInfo, editSelect);
                      } else {
                        editChoose = false;
                        break;
                      }
                    }
                  } else {
                    console.log("对不起！没有找到对应的学生");
                    console.log("按回车键返回");
                    readline.question("");
                    break;
                  }
                } else {
                  if (classNo === stuInfo.length + 1) {
                    break;
                  } else {
                    console.log("输入有误，请重新输入");
                    console.log("按回车键返回");
                    readline.question("");
                  }
                }
              }
            }
            break;
          // 增加功能
          case 3:
            {
              let addInfo = true;
              while (addInfo) {
                clear();
                console.log(
                  "请选择您要添加的内容：  1.添加班级   2.添加学生   3.返回"
                );
                let addSelect = parseInt(readline.question(""));
                switch (addSelect) {
                  case 1:
                    {
                      clear();
                      let length = stuInfo.length;
                      stuInfo[length] = [];
                      console.log("新增班级成功！按回车键返回");
                      readline.question("");
                    }
                    break;
                  case 2:
                    {
                      clear();
                      let classSelectStr = classSelect();
                      console.log(classSelectStr);
                      let classNo,
                        addStuName,
                        addStuAge,
                        addStuGender,
                        addStuScore;
                      classNo = parseInt(readline.question(""));
                      if (classCheck(classNo)) {
                        clear();
                        console.log("请输入要添加的学生的姓名：");
                        addStuName = readline.question("");
                        clear();
                        console.log("请输入要添加的学生的年龄：");
                        addStuAge = readline.question("");
                        while (true) {
                          clear();
                          console.log("请选择学生的性别：  1.男    2.女");
                          addStuGender = parseInt(readline.question(""));
                          if (addStuGender === 1 || addStuGender === 2) {
                            break;
                          } else {
                            console.log("选择有误，请重新选择，按回车键继续");
                            readline.question("");
                          }
                        }
                        clear();
                        console.log("请输入要添加的学生的分数：");
                        addStuScore = parseInt(readline.question(""));
                        addStu(
                          classNo,
                          addStuName,
                          addStuAge,
                          addStuGender,
                          addStuScore
                        );
                        console.log("按回车键返回");
                        readline.question("");
                      } else {
                        if (classNo === stuInfo.length + 1) {
                          break;
                        } else {
                          console.log("输入有误，请重新输入");
                          console.log("按回车键返回");
                          readline.question("");
                        }
                      }
                    }
                    break;
                  case 3:
                    addInfo = false;
                    break;
                  default:
                    console.log("选择有误，请重新选择，按回车键继续");
                    readline.question("");
                }
              }
            }
            break;
          // 删除功能
          case 4:
            {
              let delInfo = true;
              while (delInfo) {
                clear();
                console.log(
                  "请选择您要删除的项目：  1.删除班级    2.删除学生    3.返回"
                );
                let delSelect = parseInt(readline.question(""));
                switch (delSelect) {
                  // 删除班级
                  case 1:
                    let delClassInfo = true;
                    while (delClassInfo) {
                      clear();
                      let classSelectStr = classSelect();
                      console.log(classSelectStr);
                      let classNo = parseInt(readline.question(""));
                      if (classCheck(classNo)) {
                        delClass(classNo);
                        delClassInfo = false;
                      } else {
                        if (classNo === stuInfo.length + 1) {
                          break;
                        } else {
                          console.log("输入有误，请重新输入");
                          console.log("按回车键返回");
                          readline.question("");
                        }
                      }
                    }
                    break;
                  // 删除学生
                  case 2:
                    {
                      let delStuInfo = true;
                      while (delStuInfo) {
                        clear();
                        let classSelectStr = classSelect();
                        console.log(classSelectStr);
                        let classNo = parseInt(readline.question(""));
                        if (classCheck(classNo)) {
                          clear();
                          console.log("请输入您要删除的学生的学号：");
                          let stuNo = readline.question("");
                          let singleStuInfo = stuCheck(classNo, stuNo);
                          delStuInfo = false;
                          if (singleStuInfo) {
                            delStu(classNo, singleStuInfo, "del");
                          } else {
                            console.log("对不起！没有找到对应的学生");
                            console.log("按回车键返回");
                            readline.question("");
                          }
                        } else {
                          if (classNo === stuInfo.length + 1) {
                            break;
                          } else {
                            console.log("输入有误，请重新输入");
                            console.log("按回车键返回");
                            readline.question("");
                          }
                        }
                      }
                    }
                    break;
                  case 3:
                    delInfo = false;
                    break;
                  default:
                    console.log("输入有误，请重新输入，按回车键继续");
                    readline.question("");
                }
              }
            }
            break;
          // 转班功能
          // 核心思路：首先删除该学生，然后在其他班级上添加该学生
          case 5:
            {
              let transfer = true;
              let str = "";
              while (transfer) {
                clear();
                let classSelectStr = classSelect();
                console.log("(学生原本所在的班级)" + classSelectStr);
                let classNo = parseInt(readline.question(""));
                if (classCheck(classNo)) {
                  clear();
                  console.log("请输入您要转班的学生的学号：");
                  let stuNo = readline.question("");
                  let singleStuInfo = stuCheck(classNo, stuNo);
                  if (singleStuInfo) {
                    while (true) {
                      clear();
                      str = "";
                      let classSelectStr2 = classSelect();
                      console.log(
                        "班级   学号     姓名    年龄    性别    分数"
                      );
                      str +=
                        singleStuInfo.className +
                        "\t" +
                        singleStuInfo.stuID +
                        "\t" +
                        singleStuInfo.stuName +
                        "\t" +
                        singleStuInfo.stuAge +
                        "\t" +
                        singleStuInfo.stuGender +
                        "\t" +
                        singleStuInfo.stuScore;
                      console.log(str);
                      console.log("(学生要转去的班级)" + classSelectStr2);
                      let classNo2 = parseInt(readline.question(""));
                      if (classCheck(classNo2)) {
                        if (classNo === classNo2) {
                          transfer = false;
                          console.log("和原来班级相同！按回车键返回主菜单");
                          readline.question("");
                        } else {
                          classTransfer(classNo, singleStuInfo, classNo2);
                          transfer = false;
                          console.log("转班成功，按回车键返回主菜单");
                          readline.question("");
                        }
                        break;
                      } else {
                        if (classNo2 === stuInfo.length + 1) {
                          transfer = false;
                          break;
                        } else {
                          console.log("输入有误，请重新输入");
                          console.log("按回车键返回");
                          readline.question("");
                        }
                      }
                    }
                  } else {
                    console.log("对不起！没有找到对应的学生");
                    console.log("按回车键返回");
                    readline.question("");
                    break;
                  }
                } else {
                  if (classNo === stuInfo.length + 1) {
                    break;
                  } else {
                    console.log("输入有误，请重新输入");
                    console.log("按回车键返回");
                    readline.question("");
                  }
                }
              }
            }
            break;
          // 退出功能
          case 6:
            useSys = false; // 设置使用系统的标识 useSys的值为false
            break;
          default:
            console.log("输入有误，请重新输入！(按回车键继续)");
            readline.question("");
        }
      }
      break; // 跳出外层的循环
    } else {
      // 没有进入上面的if 说明账号密码输入有问题
      loginChance--; // 登陆机会自减1
      if (loginChance === 0) {
        // 如果登录机会为0 直接跳出while循环
        break;
      } else {
        clear();
        console.log(
          `账号密码错误，你还剩下${loginChance}次机会！(按回车键继续)`
        );
        readline.question("");
      }
    }
  }
  // 根据loginChance的值来判断是用户主动跳出的，还是登录机会为0跳出的
  if (loginChance === 0) {
    clear();
    console.log("错误次数过多！请稍后再试");
  } else {
    clear();
    console.log("感谢您的使用！");
  }
};
main();
