$(function() {
    // 点击去注册账号
    $("#link_reg").on('click', function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 点击去登录
    $("#link_login").on('click', function() {
            $(".reg-box").hide();
            $(".login-box").show();
        })
        // 从layui中获取form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
            // 自定义了一个pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return "两次输入密码不一致"
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
                // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            })
        })
        // 监听登录表单的事件
    $("#from_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败")
                }
                layer.msg("登陆成功")
                    // console.log(res.token);
                    // 将登陆成功得到的token字符串，保存到localStora
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})