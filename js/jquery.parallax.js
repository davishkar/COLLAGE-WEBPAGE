!function (t) { t.fn.parallax = function (i) { var a = t(window).height(), e = t.extend({ velocity: .15, offset: 0 }, i); return this.each(function () { var i = t(this), h = t(this).data("velocity") ? t(this).data("velocity") : e.velocity, o = t(this).data("offset") ? t(this).data("offset") : e.offset, s = t(this).data("no-repeat") ? t(this).data("no-repeat") : !1; if (t(this).data("image") && t(this).css("background-image", "url(" + t(this).data("image") + ")"), s) { var n = t(i).css("background-image").replace("url(", "").replace(")", ""); t("<img/>").attr("src", n).load(function () { image_height = this.height, div_height = i.height() }) } t(document).scroll(function () { var e = t(window).scrollTop(), s = i.offset().top, n = i.outerHeight(), r = t(window).height(); if (!(e >= s + n || s >= e + a)) { var c = Math.round((e + (r - s)) * h + o); "undefined" != typeof image_height && Math.abs(c) + div_height > image_height || i.css("background-position", "50% " + c + "px") } }) }) } }(jQuery);