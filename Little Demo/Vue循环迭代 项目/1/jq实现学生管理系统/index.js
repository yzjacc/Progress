var menuList = document.getElementById('menu-list');
var tbody = document.getElementById('table-body');
var modal = document.getElementById('modal');
var tableData = [];
function bindEvent() {
    console.log(menuList)
    menuList.addEventListener('click', changeMenu, false);
    var submitBtn = document.getElementById('add-student-btn');
    submitBtn.addEventListener('click', submitStudent, false);
    tbody.addEventListener('click', clickTable, false);
    var editSubmit = document.getElementById('edit-submit-btn');
    editSubmit.addEventListener('click', editStudentSubmit, false);
    var mask = document.getElementById('mask');
    mask.onclick = function (e) {
        modal.style.display = 'none';
    }
}

function clickTable(e) {
    var tagName = e.target.tagName;
    if (tagName != 'BUTTON') {
        return false;
    }
    // edit编辑按钮 判断当前按钮
    var isEdit = [].slice.call( e.target.classList ).indexOf('edit') > -1;
    if (isEdit) {
        // 获取编辑按钮对应的学生索引值
        var index = e.target.getAttribute('data-index');
        // 展示弹框
        modal.style.display = 'block';
        // 数据回填
        renderEditForm(tableData[index]);
    } else {
        var index = e.target.getAttribute('data-index');
        // 如果确认返回true  如果取消返回false
        var isDel = window.confirm('确认删除？');
        if (isDel) {
            transferData('/api/student/delBySno', {
                sNo: tableData[index].sNo
            }, function (result) {
                alert('删除成功');
                getTableData();
            });
        }
    }
}
function editStudentSubmit(e) {
    e.preventDefault();
    var editForm = document.getElementById('edit-form');
    var studentObj = getFormData(editForm);
    if (!studentObj) {
        return false;
    } 
    
    transferData('/api/student/updateStudent', studentObj, function (result) {
        alert('修改成功');
        editForm.reset();
        modal.style.display = 'none';
        getTableData();
    });


    return false;
}

function renderEditForm(data) {
    var editForm = document.getElementById('edit-form');
    // name sNo ...  
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}

function changeMenu(e) {
    // 事件源对象（目标对象）
    console.log(e.target);
    var tagName = e.target.tagName;
    // console.log(tagName);
    if (tagName != 'DD') {
        return false;
    }

    // 获取左侧导航条可选元素
    var dd = this.getElementsByTagName('dd');
    // 讲class类名为active元素清理class类名
    for (var i = 0; i < dd.length; i++) {
        // dd[i].className = '';
        dd[i].classList.remove('active');
    }
    // e.target.className = 'active';
    // 为当前选中元素添加active类名
    e.target.classList.add('active');
    var id = e.target.getAttribute('data-id');
    var content = document.getElementById(id);
    var contentActive = document.getElementsByClassName('content-active');
    for (var i = 0; i < contentActive.length; i++) {
        contentActive[i].classList.remove('content-active');
    }
    content.classList.add('content-active');
    if (id == 'student-list') {
        getTableData();
    }
}
// 获取表格数据
function getTableData() {
    var result = saveData('http://api.duyiedu.com/api/student/findAll', { appkey: "dongmeiqi_1551761333531"});
    transferData('/api/student/findAll',{}, function (reslut) {
        console.log(reslut);
        tableData = reslut.data;
        renderTable(reslut.data);
    });
}

function renderTable(data) {
//     <tr>
//     <td>0001</td>
//     <td>邓小宝</td>
//     <td>男</td>
//     <td>123123@qq.com</td>
//     <td>6</td>
//     <td>13232323232</td>
//     <td>哈尔滨</td>
//     <td>
//         <button class="btn edit">编辑</button>
//         <button class="btn del">删除</button>
//     </td>
// </tr>
    var str = "";
    console.log(data);
    // sex = 0 / 1  ===> 0  ---》 false 男  1----> true
    for (var i = 0; i < data.length; i++) {
        str += " <tr>\
            <td>" + data[i].sNo + "</td>\
            <td>" + data[i].name + "</td>\
            <td>" + (data[i].sex ? '女':'男') + "</td>\
            <td>" + data[i].email + "</td>\
            <td>" + (new Date().getFullYear() - data[i].birth) + "</td>\
            <td>" + data[i].phone + "</td>\
            <td>" + data[i].address + "</td>\
            <td>\
                <button class='btn edit' data-index=" + i + ">编辑</button>\
                <button class='btn del' data-index=" + i + ">删除</button>\
            </td>\
        </tr>";
    }
    tbody.innerHTML = str;
}
// 用来获取form表单数据的  form包括新增学生的form 还有编辑学生的form
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var phone = form.phone.value;
    var email = form.email.value;
    var birth = form.birth.value;
    var address = form.address.value;
    var sNo = form.sNo.value;
    if (!sNo || !name || !sex || !phone || !email || !birth || !address) {
        alert('信息填写不全，请检查！');
        return false;
    }
    var studentObj = {
        name: name,
        sex: sex,
        phone: phone,
        email: email,
        birth: birth,
        address: address,
        sNo: sNo,
    };
    return studentObj;
}
// 新增学生
function submitStudent(e) {
    e.preventDefault();
    var form = document.getElementById('add-student-form');
    console.log('form.name:', form.name);
    var studentObj = getFormData(form);
    // Object.assign({}, {})={}
    // var result = saveData('http://api.duyiedu.com/api/student/addStudent', Object.assign(studentObj, {
    //     appkey: "dongmeiqi_1551761333531",
    // }));
    if (!studentObj) {
        return false;
    }
    transferData('/api/student/addStudent', studentObj, function (result) {
        alert('新增成功');
        form.reset();
        var studentListDom = menuList.getElementsByTagName('dd')[0];
        studentListDom.click();
    });
    // console.log(result);
    // // result = {status: 'success || fail', msg: ''}
    // if (result.status == 'success') {
       
    // } else {
    //     alert(result.msg);
    // }
    return false;
}

// 向后端存储数据url: http://api.duyiedu.com/api/student/findAll
// param: {appkey:dongmeiqi_1551761333531}  appkey=dongmeiqi_1551761333531
function saveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object'){
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}
// url: 代表接口文档中的url
// param： 除了appkey之外的数据
// cb: 成功获取数据之后执行的函数
function transferData(url, param, cb) {
    var result = saveData('http://api.duyiedu.com' + url, Object.assign({
        appkey: "panda_1545214432912"
    }, param));

    if (result.status == 'success') {
        cb(result);
    } else {
        alert(result.msg);
    }

}

function init () {
    bindEvent();
    var studentListDom = menuList.getElementsByTagName('dd')[0];
    studentListDom.click();
}

init()