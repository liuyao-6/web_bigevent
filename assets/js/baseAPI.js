// 每次调用$.get或者$.post或$.ajax会先调用这个函数
// 在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})