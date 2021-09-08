$(function() {
        // 调用函数获取用户的基本信息
        getUserinfo();
        var layer = layui.layer;
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //清空本地存储中的token
                localStorage.removeItem('token');
                location.href = '/login.html'
                layer.close(index);
            });

        })

    })
    // 获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'GET', // 请求的方式
        url: '/my/userinfo', // 请求的 URL 地址
        success: function(res) { // 请求成功之后的回调函数
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //    调用 renderAvatar()渲染用户头像
            renderAvatar(res.data);
        },
        // 无论成功还是失败都会调用complete函数

    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        var avatar = user.user_pic;
        $(".layui-nav-img").attr('src', avatar).show();
        $(".text-avatar").hide();

    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}