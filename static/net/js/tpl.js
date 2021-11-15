$(function () {
    $.ajax({
        method: 'GET',
        url: './header.html'
    }).success(function (data) {
        $('.header').prepend(data);
        init()
    });
    function init() {
        if (window.sessionStorage.getItem("data")) {
            $(".loginbtn").html(window.sessionStorage.getItem("data"))
                $(".quick").css("display", "block")
                $(".regbtn").css("display", "none")
        }
        var personData = null;
        $('.tabs li.open').hover(function () {
            var _self = $(this);
            var i = _self.index();
            $('.tabpanel,.tabs li').removeClass('active');
            _self.addClass('active');
            $('.tabpanel').eq(i).addClass('active');
            $('.tabs .arrow').css({'left': 12.5 + (i * 25) + '%'})
        })
        //
        $('.aside a').click(function () {
            var _self = $(this);
            var handler = '#panel' + _self.data('target');
            $('.tabpanel,.aside a').removeClass('active current');
            _self.addClass('current')
            $(handler).addClass('active');
        })

        $('.forlogin').click(function () {
            $('.regpanel').fadeOut();
            $('.loginpanel').fadeIn();

        });

        function str() {
            var str = '<div class="person window">\
            <a class="closebtn closebtn1"></a>\
            <p>个人中心</p>\
            <p><span>姓名：</span><span>' + personData.realName + '</span></p>\
        <p><span>邮箱：</span><span>' + personData.email + '</span></p>\
        <p><span>电话：</span><span>' + personData.phone + '</span></p>\
        <p><span>职业：</span><span>' + personData.roleName + '</span></p>\
        <button  class="button  close1">关闭</button>\
            </div>';
            $("body").append(str);

        }

        $(".close1").click(function () {
            $(".person").remove();
        })
        $(".loginbtn").click(function () {
            var conV = $(this).html();
            console.log(conV)
            if (conV == '登录') {
                $('.regpanel').fadeOut();
                $('.loginpanel').fadeIn();

            } else {
                var phoneVal = window.sessionStorage.getItem("phoneV");
                $.ajax({
                    url: "http://www.huimei.net/login/getUserInfos.do?phone=" + phoneVal,
                    type: "GET",
                    success: function (data) {
                        personData = $.parseJSON(data);
                        console.log(personData);
                        console.log(personData.code)

                        if (personData.code == 1) {
                            console.log("成功")
                            str();
                        } else {
                            alert(data.msg)
                        }
                    }

                })

            }
        });
        $('.regbtn,.forreg').click(function () {
            $('.regpanel').fadeIn();
            $('.loginpanel').fadeOut();
        })
        $("body").click(function (e) {
            var target = $(e.target);
            if (target.hasClass("closebtn1") || target.hasClass("close1")) {
                $('.person').remove();
            }
        })
        $('.closebtn').click(function () {
            $('.window').fadeOut();
        })
        $(".quick").click(function () {
            $(".quick").css("display", "none")
            window.sessionStorage.removeItem("data");
            window.location.reload()
        })
        $('#regForm').validator({
            fields: {
                phone: 'required; mobile',
                securityCode: 'required;digits;length[6]',
                password: 'required;password',
                repwd: {
                    rule: 'required;password;match(password)',
                    msg: '两次输入的密码不一致'
                },
                realName: 'required;',
                email: 'required; email'
            },
            focusInvalid: false,
            msgMaker: function (opt) {
                return '<span class="' + opt.type + '">' + opt.msg + '</span>';
            },
            //invalid:function(form){
            //    $(form).find('button').removeClass('submit');
            //},
            valid: function (form) {
                //$(form).find('button').addClass('submit');
                $.ajax({
                    url: '/login/register.do',
                    data: $(form).serialize(),
                    type: "POST",
                    success: function (data) {
                        var data = $.parseJSON(data);
                        if (data.code != 1) {
                            alert(data.msg);
                            console.log(data.msg);

                        } else {
                            window.location.reload()
                        }

                    }
                });
            }
        });
        $('#pwdForm').validator({
            fields: {
                originalPassword: 'required;password',
                password: 'required;password',
                confirmPassword: {
                    rule: 'required;password;match(password)',
                    msg: '两次输入的密码不一致'
                },
            },
            focusInvalid: false,
            msgMaker: function (opt) {
                return '<span class="' + opt.type + '">' + opt.msg + '</span>';
            },
            valid: function (form) {
                $.ajax({
                    url: '/login/register.do',
                    data: $(form).serialize(),
                    type: "POST",
                    success: function (data) {
                        var data = $.parseJSON(data);
                        if (data.code != 1) {
                            alert(data.msg);
                        } else {
                            $('.tip').show();
                            $('#pwdForm').get(0).reset();
                            setTimeout(function () {
                                $('.tip').hide();
                            }, 3000)
                        }

                    }
                });
            }
        });
        //
        var during = 60;
        $('.getcode').bind('click', function () {
            var self = $(this);
            if (during < 60) return false;
            var delay = 1000;
            var down = null;
            var timer = function () {
                during--;
                self.addClass('later');
                if (during > 0) {
                    self.text('重新发送' + during).addClass('during');
                    down = setTimeout(timer, delay)
                } else {
                    during = 60;
                    self.text('重新发送').removeClass('during');
                    clearTimeout(down);
                }
            };

            var tel = $('#regForm input[name="phone"]').val();
            if (tel.length === 11 && /^1[3-9]\d{9}$/.test(tel)) {
                $.get('/login/sendSms.do?phone=' + tel, function (data) {
                    var tm = setTimeout(timer, 0);
                    var data = $.parseJSON(data);
                    if (data.code != 1) {
                        alert(data.msg)
                        console.log(data.msg);
                        self.text('重新发送' + during).removeClass('during').html("发送验证码");
                        clearTimeout(tm);
                        console.log(self.text('重新发送'));
                    }

                })
            } else {
                alert('手机号码格式错误!');
            }

        });
        $('.submiter').click(function () {
            $.ajax({
                url: "/login/login.do",
                data: $('#loginForm').serialize(),
                type: "POST",
                success: function (e) {
                    var e = $.parseJSON(e);
                    console.log(e);

                    /*$(".loginbtn").addClass("loginbtnCuc");*/
                    var phoneV = $("input[name='phone']").val();
                    window.sessionStorage.setItem("phoneV", phoneV),
                        window.sessionStorage.setItem("data", e.userName),
                        1 == e.code ? ($(".loginbtn").html(e.userName),

                            $(".regbtn").css("display", "none"),
                            $(".quick").css("display", "block"),
                            $(".window").css("display", "none")) : alert(e.msg)
                }
            })
        });
    }
})
