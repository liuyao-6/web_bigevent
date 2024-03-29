 $(function() {
     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)
         //  为上传按钮绑定点击事件
     $('#btnChooseImage').on('click', function() {
             $('#file').click();
         })
         //  为文件选择框绑定change事件
     $('#file').on('change', function(e) {
             //  获取用户选择的文件
             var filelist = e.target.files;
             if (filelist.length === 0) {
                 return layer.msg('请选择图片！')
             }
             //  1. 拿到用户选择的文件
             var file = e.target.files[0];
             //  2. 根据选择的文件，创建一个对应的 URL 地址：
             var ImgURL = URL.createObjectURL(file);
             $image
                 .cropper('destroy') // 销毁旧的裁剪区域
                 .attr('src', ImgURL) // 重新设置图片路径
                 .cropper(options) // 重新初始化裁剪区域
         })
         //  为确定按钮绑定点击事件
     $('#btnUpload').on('click', function() {
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         $.ajax({
             method: 'POST', // 请求的方式
             url: '/my/update/avatar', // 请求的 URL 地址
             data: { avatar: dataURL }, // 这次请求要携带的数据
             success: function(res) { // 请求成功之后的回调函数
                 if (res.status !== 0) {
                     return layer.msg("更新头像失败！")
                 }
                 layer.msg("更新头像成功！")
                 window.parent.getUserinfo();
             }
         })
     })
 })