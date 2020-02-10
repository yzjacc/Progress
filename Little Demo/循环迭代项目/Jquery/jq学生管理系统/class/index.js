var curPage = 1;
var pageSize = 15;
var tableData = [];
var allPage = 1;
// 绑定事件
function bindEvent() {
    $('#menu-list').on('click', 'dd', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        // var id = $(this).attr('data-id');
        var id = $(this).data('id');

        if (id == 'student-list') {
            curPage = 1;
            getTableData();
        }
        $('.content').fadeOut();
        $('#' + id).fadeIn();
    });
    // 添加学生页面的提交
    $('#add-student-btn').click(function (e) {
        e.preventDefault();
        var data = $('#add-student-form').serializeArray();
        data = checkData(data);
        if (data) {
            transferData('/api/student/addStudent', data, function (res) {
                alert('提交成功');
                $('#menu-list > dd[data-id=student-list]').trigger('click');
            })
        }
        console.log(data);
    });
    // 编辑学生页面提交
    $('#edit-submit-btn').click(function (e) {
        e.preventDefault();
        var data = $('#edit-form').serializeArray();
        data = checkData(data);
        if (data) {
            transferData('/api/student/updateStudent', data, function (res) {
                alert('修改成功');
                $('#modal').slideUp();
                $('#menu-list > dd[data-id=student-list]').trigger('click');
            })
        }
        console.log(data);
    });
    $('#mask').click(function (e) {
        $('#modal').slideUp();
    })
    $('#table-body').on('click', '.btn', function () {
        var isEdit = $(this).hasClass('edit');
        var index = $(this).data('index');
        // tableData[index]
        if (isEdit) {
            renderEditModel(tableData[index]);
            $('#modal').slideDown();
        } else {
            var isDel = confirm('确认删除' + tableData[index].name  + '学生的信息？');
            if (isDel) {
                transferData('/api/student/delBySno', {
                    sNo: tableData[index].sNo,
                }, function(res) {
                    alert('删除成功');
                    $('#menu-list > dd[data-id=student-list]').trigger('click');
                })
            }
        }

    })
}
//  编辑表单回填数据
function renderEditModel(data) {
    var form = $('#edit-form')[0];
    for (var prop in data) {
        if (form[prop]) {
            form[prop].value = data[prop];
        }
    }
}
//  获取表格数据
function getTableData() {
    transferData('/api/student/findByPage', {
        page: curPage,
        size: pageSize
    }, function (res) {
        console.log(res);
        allPage = Math.ceil(res.cont / pageSize);
        tableData = res.findByPage;
        renderTable(res.findByPage);
        $('#page').turnpage({
            curPage: curPage,
            allPage: allPage,
            callback: function (page) {
                curPage = page;
                getTableData();
            }
        })
    })
}
// 渲染表格数据
function renderTable(data) {
    var str = '';
    data.forEach(function(item, index) {
        str += '<tr>\
        <td>' + item.sNo + '</td>\
        <td>' + item.name + '</td>\
        <td>' + (item.sex ? '女': '男') + '</td>\
        <td>' + item.email + '</td>\
        <td>' + (new Date().getFullYear() - item.birth )+ '</td>\
        <td>' + item.phone + '</td>\
        <td>' + item.address + '</td>\
        <td>\
            <button class="btn edit" data-index=' + index + '>编辑</button>\
            <button class="btn del" data-index=' + index + '>删除</button>\
        </td>\
    </tr>'
    });
    $('#table-body').html(str);
}
// 数据交互的方法
function transferData(url, data, cb) {
    $.ajax({
        url: 'http://api.duyiedu.com' + url,
        type: 'get',
        data: $.extend({
            appkey: '52891375_1559024080793'
        }, data),
        // 希望后端返回的数据类型
        dataType: 'json',
        success: function (res) {
            // console.log(JSON.parse(res));
            if (res.status == 'success') {
                cb(res.data)
            } else {
                alert(res.msg);
            }
        }
    })
}
// 校验数据是否填写全
function checkData(data) {
    var obj = {};
    var flag = true;
    data.forEach(function (item, index) {
        obj[item.name] = item.value;
        if (!item.value) {
            flag = false;
        }
    });
    if (!flag) {
        return false;
    } 
    return obj;
}
// 初始化函数
function init() {
    bindEvent();
    $('#menu-list > dd[data-id=student-list]').trigger('click');
   
}
init();