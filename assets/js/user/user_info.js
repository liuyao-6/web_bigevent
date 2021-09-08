$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间';
            }

        }
    })

    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET', // 请求的方式
            url: '/my/userinfo', // 请求的 URL 地址
            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layui.msg('获取用户基本信息失败！')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data);
                // $('.layui-form [name=username]').val(res.data.username)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function(e) {
            // 阻止表单的默认重置行为
            e.preventDefault();
            initUserInfo();
        })
        // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        $.ajax({
            method: 'POST', // 请求的方式
            url: '/my/userinfo', // 请求的 URL 地址
            data: $(this).serialize(), // 这次请求要携带的数据
            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                    // 调用父页面中的方法重新渲染
                window.parent.getUserinfo();
            }
        })
    })
})