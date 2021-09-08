$(function() {
    // 点击“去注册账号”的链接
    $("#link_reg").on('click', function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 点击“去登录”的链接
    $("#link_login").on('click', function() {
            $(".reg-box").hide();
            $(".login-box").show();
        })
        // 从layui获取form对象
    var form = layui.form;
    var layer = layui.layer
        // 通过form.verify自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 校验两次密码是否一致
            // 拿到两次密码框的数值进行判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
            e.preventDefault();
            // 发起ajax的post请求
            $.ajax({
                method: 'POST', // 请求的方式
                url: '/api/reguser', // 请求的 URL 地址
                data: {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                }, // 这次请求要携带的数据
                success: function(res) { // 请求成功之后的回调函数
                    if (res.status !== 0) {

                        return layer.msg(res.message);

                    }
                    layer.msg("注册成功,请登录");
                    $("#link_login").click();
                    $(".layui-form [name=username]").val('');
                    $(".layui-form [name=password]").val('');
                }
            })
        })
        // 监听登陆表单的提交事件
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST', // 请求的方式
            url: '/api/login', // 请求的 URL 地址
            data:
            // 快速获取表单中的数据
                $(this).serialize(),
            // 这次请求要携带的数据
            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layer.msg("登陆失败");
                }
                layer.msg("登陆成功！");
                // 将登陆成功的到的res.token保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })
})