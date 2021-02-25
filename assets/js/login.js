$(function() {
    // 登录和注册页面转换
    $('#link_reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义一个重复验证密码 校验规则
        repwd: function(value) {
            var password = $('#form_reg [name=password]').val();
            if (value !== password) {
                return '两次密码不一致！'
            }
        }
    });

    // 注册页面加载后台数据
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
                // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败');
                }
                layer.msg('注册成功');
                $('#link_login').click();
            })
        })
        // 登录页面加载后台数据
    $('#form_login').on('submit', function(e) {
        // 1.阻止默认的提交行为
        e.preventDefault();
        // 2.发起ajax请求
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name = password]').val()
        }
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败');
            }
            layer.msg('登录成功');
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)

            // 跳转到后台主页
            location.href = '/index.html'
        })
    })
})