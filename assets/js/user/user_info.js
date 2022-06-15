$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6个字符之间"
            }
        }
    })
    initUserInfo();
    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("后去用户信息失败")
                }
                // console.log(res);
                // 调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $("#btnReset").on("click", function(e) {
        e.preventDefault();
        initUserInfo();
    })

    // 表单的提交
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                    // 调用父页面中的方法，重新渲染用户的头像信息
                window.parent.getUserInfo();
            }
        })
    })
})