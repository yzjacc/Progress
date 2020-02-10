(function () {
    var obj = {
        init: function () {
            this.dataList = [];
            this.bindEvent();
            $(window).trigger('hashchange');
        },
        // 获得所有学生信息数据列表
        getAllStudentData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=yinwensong_1550025623499',
                beforeSend: function () {
                    $('tbody').html('<p>正在加载中...</p>');
                },
                success: function (data) {
                    self.dataList = JSON.parse(data);
                    self.renderDom();
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
                            <button type="button" class="listEdit btn btn-primary" data-toggle="modal" data-target="#change-modal">编辑</button>\
                            <button type="button" class="del-btn btn btn-danger" data-toggle="modal" data-target=".bs-example-modal-sm">删除</button>\
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
            $('.listEdit').on('click', function () {
                // $('.modal').show();
                // 编辑按钮  获当前这行信息 填入到弹出框信息栏中
                var i = $(this).parents('tr').index();
                var data = self.dataList.data[i];
                var form = $('#modal-form')[0];
                for (var prop in data) {
                    form[prop] ? form[prop].value = data[prop] : "";
                };
                // console.log(data)
                // 编辑提交按钮
                $('#editSubmit').on('click', function () {
                    // console.log(1111)
                    var data = self.getFormData($('#modal-form'));
                //    console.log(data);
                    // 传给后端存入数据库
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/updateStudent?appkey=yinwensong_1550025623499',
                        data: data,
                        success: function (data) {
                            // $('.modal').hide();
                            // 模态框消失
                            $('.change-modal').modal('hide');
                            alert('修改成功');
                            $('.student-list').trigger('click');
                        }
                    });
                    return false;
                });
            });
            // 删除按钮
            $('.del-btn').on('click', function () {
                // $('.del-modal').show();
                var i = $(this).parents('tr').index();
                var num = self.dataList.data[i].sNo;
                $('#sure-btn').on('click', function () {
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/delBySno?appkey=yinwensong_1550025623499',
                        data: { sNo: num },
                        success: function (data) {
                            // $('.del-modal').hide();
                            $('.del-modal').modal('hide');
                            alert('删除成功')
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
            // 新增添加按钮
            $('#submit-add').on('click', function () {
                var data = self.getFormData($('#student-form'));
                // 传给后端存入数据库
                self.saveData('http://api.duyiedu.com/api/student/addStudent?appkey=yinwensong_1550025623499', data);
            });
            // 改变hash值时修改右侧展示内容
            $(window).on('hashchange', function () {
                // 获取到右侧内容区展示的内容元素
                var hash = location.hash.slice(1);
                var content = $('#' + hash);
                $('.show-list').removeClass('show-list');
                content.addClass('show-list');
                // content.show();
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