$(function() {
    var form = layui.form;
    var layer = layui.layer;
    initArtCateList()
        // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET', // 请求的方式
            url: '/my/article/cates', // 请求的 URL 地址
            success: function(res) { // 请求成功之后的回调函数
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                var str = template('tpl_table', res)
                $('tbody').html(str);


            }
        })
    }
    var indexAdd = null;
    // 为添加类别绑定点击事件
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $('#dialog').html(),
                area: ['500px', '250px']
            });
        })
        // 通过代理的形式为form-add表单绑定事件
    $('body').on('submit', '#form_add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST', // 请求的方式
                url: '/my/article/addcates', // 请求的 URL 地址
                data: $(this).serialize(), // 这次请求要携带的数据
                success: function(res) { // 请求成功之后的回调函数
                    if (res.status !== 0) {
                        return layer.msg('新增文章分类失败！');
                    }
                    initArtCateList();
                    layer.msg('新增文章分类成功！')
                    layer.close(indexAdd);
                }
            })

        })
        // 通过代理的形式为编辑按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '#btn_edit', function() {
        var indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#edit').html(),
            area: ['500px', '250px']
        });
        var id = $(this).attr('data-id');
        // 发请求获取对应分类的数据
        $.ajax({
                method: 'GET', // 请求的方式
                url: '/my/article/cates/' + id, // 请求的 URL 地址
                success: function(res) { // 请求成功之后的回调函数
                    form.val('form-edit', res.data);
                }
            })
            // 通过代理的形式为编辑按钮绑定点击事件
        $('body').on('submit', '#dialog-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST', // 请求的方式
                url: '/my/article/updatecate', // 请求的 URL 地址
                data: $(this).serialize(), // 这次请求要携带的数据
                success: function(res) { // 请求成功之后的回调函数
                    if (res.status !== 0) {
                        return layer.msg('更新分类信息失败！')
                    }
                    layer.msg('更新分类信息成功！')
                    layer.close(indexEdit);
                    initArtCateList()
                }
            })
        })
    })
    $('tbody').on('click', '.layui-btn-danger', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET', // 请求的方式
                url: '/my/article/deletecate/' + id, // 请求的 URL 地址
                success: function(res) { // 请求成功之后的回调函数
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败!')
                    }
                    layer.msg('删除文章分类成功!')
                    layer.close(index);
                    initArtCateList()
                }
            })
        });

    })

})