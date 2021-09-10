$(function() {
    var layer = layui.layer;
    var form = layui.form;
    /*    var q = {
           pagenum: 1,
           pagesize: 2,
           cate_id: '', //文章的分类
           state: ''
       } */
    initCate()
    initEditor()
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 定义加在文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET', // 请求的方式
            url: '/my/article/cates', // 请求的 URL 地址

            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var str = template('list', res);
                $('[name=cate_id]').html(str);
                // 通知layui重新渲染表单区域的UI结构
                form.render();
            }
        })
    }
    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click();

        })
        // 监听coverFile的change事件
    $('#coverFile').on('change', function(e) {
            // 获取文件的数组
            var files = e.target.files;
            if (files.length == 0) {
                return
            }
            // 根据文件创建对应的url地址
            var newImgURL = URL.createObjectURL(files[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 为存为草稿按钮绑定点击事件处理函数
    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })
    $('#form_pub').on('submit', function(e) {
            e.preventDefault();
            // 基于form表单创建一个对象用来提交表单数据
            var fd = new FormData($(this)[0]);
            // 将文章的发布状态存到fd中
            fd.append('state', art_state);
            // 将封面裁剪过后的图片输出为文件对象
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 200
                })
                .toBlob(function(blob) {
                    fd.append('cover_img', blob)
                    publishArticle(fd)
                })
        })
        // 定义发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST', // 请求的方式
            url: '/my/article/add', // 请求的 URL 地址
            data: fd, // 这次请求要携带的数据
            contentType: false,
            processData: false,
            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/article/art_list.html'
            }
        })
    }
})