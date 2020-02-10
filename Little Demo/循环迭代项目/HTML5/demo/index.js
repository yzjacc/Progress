(function () {
    var obj = {
        init: function () {
            this.dataList = [];
            this.studentForm = $('#student-form');
            this.bindEvent();
        },
        // 获得所有学生信息数据列表
        getAllStudentData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=52891375_1559024080793',
                beforeSend: function () {
                    $('tbody').html('<p>正在加载中...</p>');
                },
                success: function (data) {
                    self.dataList = JSON.parse(data);
                    self.renderDom();
                    console.log(data);
                },
                error: function () {
                    alert('获取信息失败');
                }
            });
        },
        renderDom: function () {
            var self = this;
            var str = "";
            var dataList = self.dataList.data;
            var len = dataList.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    str += ' <tr>\
                        <td>' + dataList[i].sNo + '</td>\
                        <td>' + dataList[i].name + '</td>\
                        <td>'+ (dataList[i].sex ? '女' : '男') + '</td>\
                        <td>'+ dataList[i].email + '</td>\
                        <td>'+ (new Date().getFullYear() - dataList[i].birth) + '</td>\
                        <td>' + dataList[i].phone + '</td>\
                        <td>' + dataList[i].address + '</td>\
                        <td>\
                            <button class="success edit" data-index=' + i + '>编辑</button>\
                            <button class="del" data-index=' + i + '>删除</button>\
                        </td>\
                    </tr>'
                }
                var tbody = $('#students-table').find('tbody');
                tbody.html(str);
                this.show();
            }
        },
        show: function () {
            // 弹框
            var self = this;
            $('.edit').on('click', function () {
                $('.modal').show();
                // 编辑按钮  获当前这行信息 填入到弹出框信息栏中
                var i = $(this).parents('tr').index();
                var data = self.dataList.data[i];
                var form = $('#modal-form')[0];
                for (var prop in data) {
                    form[prop] ? form[prop].value = data[prop] : "";
                };
                // 编辑提交按钮
                $('.submit').on('click', function () {
                    var data = self.getFormData($('#modal-form'));
                    // console.log(data);
                    // 传给后端存入数据库
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/updateStudent?appkey=52891375_1559024080793',
                        data: data,
                        success: function (data) {
                            $('.modal').hide();
                            alert('修改成功');
                            $('.student-list').trigger('click');
                        }
                    });
                    return false;
                });
            });
            // 删除按钮
            $('.del').on('click', function () {
                $('.del-modal').show();
                var i = $(this).parents('tr').index();
                var num = self.dataList.data[i].sNo;
                $('.sure-btn').on('click', function () {
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/delBySno?appkey=52891375_1559024080793',
                        data: { sNo: num },
                        success: function (data) {
                            $('.del-modal').hide();
                            $('.student-list').trigger('click');
                        },
                        error: function () {
                            alert('删除失败');
                        }
                    });
                })
            });
        },
        bindEvent: function () {
            var self = this;
            // 显示学生列表 
            $('.student-list').on('click', function () {
                self.getAllStudentData();
            });
            // 新增按钮
            $('#submit-add').on('click', function () {
                var data = self.getFormData(self.studentForm);
                console.log(data);
                // 传给后端存入数据库
                self.saveData('http://api.duyiedu.com/api/student/addStudent?appkey=52891375_1559024080793', data);
            });
        },
        // 将表单中的数据转换成对象
        getFormData: function (formData) {
            var list = formData.serializeArray();
            var student = {};
            list.forEach(function (ele) {
                student[ele.name] = ele.value
            });
            return student;
        },
        saveData: function (url, param) {
            $.ajax({
                url: url,
                type: 'GET',
                data: param,
                success: function (data) {
                    alert('新增成功');
                    console.log(data)
                    $('.student-list').trigger('click');
                },
                error: function () {
                    alert('添加失败');
                }
            });
        },
    }
    obj.init();
})();