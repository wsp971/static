var softkeyboard, namepwd, eli, InjectDom, password1, CapsLockValue, addValue, setpassvalue, setCapsLock, setCalcButtonBg, _trim, capsLockFlag, capsLockText, randomNumberButton, cbbkeyboard = {};
cbbkeyboard.init = function() {
	InjectDom(), softkeyboard = $("#softkeyboard")[0], namepwd = $("[name=password]", softkeyboard)[0], randomNumberButton(), setCalcButtonBg(), $("#useKey, #accept", softkeyboard).on("click", function() {
		cbbkeyboard.closekeyboard()
	}), $("#backspace", softkeyboard).on("click", function() {
		setpassvalue()
	}), $("#capslock", softkeyboard).on("click", function() {
		capsLockText(), setCapsLock()
	})
}, InjectDom = function() {
	var a = '<!--[if IE 6]><iframe src="javascript:\'\';" class="softifrem" style="position: absolute; z-index: 1700; display: none;height:140px;width:480px;background:none; border:none;"></iframe><![endif]-->        <div id="softkeyboard" style="position: absolute; z-index: 1800; display: none;"><input type="hidden" value="" name="password" /><table><tr><td colspan="14" class="f13 pl5"> 密码输入器</td> <td><input id="useKey" class="btn_letter" type="button" value="关闭" bgtype="1" /></td>            </tr>            <tr align="left" valign="middle">                <td><input type="button" value=" ~ "></td>                <td><input type="button" value=" ! "></td>                <td><input type="button" value=" @ "></td>                <td><input type="button" value=" # "></td>                <td><input type="button" value=" $ "></td>                <td><input type="button" value=" % "></td>                <td><input type="button" value=" ^ "></td>                <td><input type="button" value=" & "></td>                <td><input type="button" value=" * "></td>                <td><input type="button" value=" ( "></td>                <td><input type="button" value=" ) "></td>                <td><input type="button" value=" _ "></td>                <td><input type="button" value=" + "></td>                <td><input type="button" value=" | "></td>                <td colspan="1" rowspan="2"><input id="backspace" name="button10" type="button" value=" 退格"></td>            </tr>            <tr align="left" valign="middle">                <td><input type="button" value=" ` "></td>                <td><input type="button" bgtype="2" name="button_number1" value=" 1 "></td>                <td><input type="button" bgtype="2" name="button_number2" value=" 2 "></td>                <td><input type="button" bgtype="2" name="button_number3" value=" 3 "></td>                <td><input type="button" bgtype="2" name="button_number4" value=" 4 "></td>                <td><input type="button" bgtype="2" name="button_number5" value=" 5 "></td>                <td><input type="button" bgtype="2" name="button_number6" value=" 6 "></td>                <td><input type="button" bgtype="2" name="button_number7" value=" 7 "></td>                <td><input type="button" bgtype="2" name="button_number8" value=" 8 "></td>                <td><input type="button" bgtype="2" name="button_number9" value=" 9 "></td>                <td><input bgtype="2" name="button_number0" type="button" value=" 0 "></td>                <td><input type="button" value=" - "></td>                <td><input type="button" value=" = "></td>                <td><input type="button" value=" \\ "></td>                <td></td></tr><tr align="left" valign="middle">                <td><input type="button" value=" q "></td>                <td><input type="button" value=" w "></td>                <td><input type="button" value=" e "></td>                <td><input type="button" value=" r "></td>                <td><input type="button" value=" t "></td>                <td><input type="button" value=" y "></td>                <td><input type="button" value=" u "></td>                <td><input type="button" value=" i "></td>                <td><input type="button" value=" o "></td>                <td><input name="button8" type="button" value=" p "></td>                <td><input name="button9" type="button" value=" { "></td>                <td><input type="button" value=" } "></td>                <td><input type="button" value=" [ "></td><td><input type="button" value=" ] "></td>                <td><input id="capslock" name="button9" type="button" value="切换大/小写"></td>            </tr>            <tr align="left" valign="middle">                <td><input type="button" value=" a "></td>                <td><input type="button" value=" s "></td>                <td><input type="button" value=" d "></td>                <td><input type="button" value=" f "></td>                <td><input type="button" value=" g "></td>                <td><input type="button" value=" h "></td>                <td><input type="button" value=" j "></td>                <td><input name="button3" type="button" value=" k "></td>                <td><input name="button4" type="button" value=" l "></td>                <td><input name="button5" type="button" value=" : "></td>                <td><input name="button7" type="button" value=" &quot; "></td>                <td><input type="button" value=" ; "></td>                <td><input type="button" value=" \' "></td>                <td rowspan="2" colspan="2"><input id="accept" name="button12" type="button" value="确定"></td>            </tr>            <tr align="left" valign="middle">                <td><input name="button2" type="button" value=" z "></td>                <td><input type="button" value=" x "></td>                <td><input type="button" value=" c "></td>                <td><input type="button" value=" v "></td>                <td><input type="button" value=" b "></td>                <td><input type="button" value=" n "></td>                <td><input type="button" value=" m "></td>                <td><input type="button" value=" &lt; "></td>                <td><input type="button" value=" &gt; "></td>                <td><input type="button" value=" ? "></td>                <td><input type="button" value=" , "></td>                <td><input type="button" value=" . "></td>                <td><input type="button" value=" / "></td>            </tr></table></div>',
		b = "#softkeyboard,.softifrem{border:1px solid #ddd;background:#fff;color:#35478C;}            #softkeyboard .btn_letter, #softkeyboard .btn_num {font-size: 12px; border: 1px solid #7FB2F0;                cursor: pointer;color:#35478C;background-color:#E4EFF7;width:18px; height:18px;_line-height:18px;}#softkeyboard .btn_num {background-color:#fff;}";
	$("body").append(a + "<style>" + b + "</style>")
}, password1 = [], cbbkeyboard.initPwd = function(a) {
	password1.push(a[0])
}, CapsLockValue = 0, cbbkeyboard.hidekeyboard = !0, addValue = function(a) {
	var b;
	0 == CapsLockValue ? (b = namepwd.value, b.length < password1[eli].maxLength && (namepwd.value += a), b.length <= password1[eli].maxLength && (password1[eli].value = namepwd.value)) : (b = namepwd.value, b.length < password1[eli].maxLength && (namepwd.value += a.toUpperCase()), b.length <= password1[eli].maxLength && (password1[eli].value = namepwd.value))
}, setpassvalue = function() {
	var a = namepwd.value.length,
		b = namepwd.value.substr(0, a - 1);
	namepwd.value = b, namepwd.value, password1[eli].value = namepwd.value
}, cbbkeyboard.closekeyboard = function() {
	$(softkeyboard).hide(), $(".softifrem").hide(), $(password1[eli]).removeClass("using").blur(), cbbkeyboard.hidekeyboard = !0
}, cbbkeyboard.showkeyboard = function(a) {
	var b, c, d, e, f;
	for (eli = a, namepwd.value = password1[eli].value, b = window.fixedLeft || 10, c = password1[eli], d = c.offsetTop, e = c.clientHeight, f = c.offsetLeft; c = c.offsetParent;) d += c.offsetTop, f += c.offsetLeft;
	$(softkeyboard).css({
		top: d + e + 3,
		left: f - b
	}).show(), $(".softifrem").css({
		top: d + e + 3,
		left: f - b
	}).show(), $("#softkeyboard").on("click", function() {
		return password1[eli].click(), !0
	}), cbbkeyboard.hidekeyboard = !1
}, setCapsLock = function() {
	CapsLockValue = 0 == CapsLockValue ? 1 : 0
}, setCalcButtonBg = function() {
	$("input", softkeyboard).each(function() {
		var a, b;
		"button" == this.type && "1" != $(this).attr("bgtype") && (this.className = "2" == $(this).attr("bgtype") ? "btn_num" : "btn_letter", a = _trim(this.value), 1 == a.length && (b = function(b) {
			namepwd.value = password1[eli].value, addValue(a);
			try {
				return b.stopPropagation(), !1
			} catch (b) {
				return !1
			}
		},
		 //$.browser.msie && ("6.0" == $.browser.version || "7.0" == $.browser.version || "8.0" == $.browser.version) && (this.ondblclick = b), this.onclick = b))
		!$.support.leadingWhitespace && (this.ondblclick = b), this.onclick = b))
	})
}, _trim = function(a) {
	return a.replace(/(^\s*)|(\s*$)/g, "")
}, capsLockFlag = !0, capsLockText = function() {
	capsLockFlag ? $("input", softkeyboard).each(function() {
		var a = this.value;
		a = _trim(a), "button" == this.type && a >= "a" && "z" >= a && 1 == a.length && (this.value = " " + String.fromCharCode(a.charCodeAt(0) - 32) + " ")
	}) : $("input", softkeyboard).each(function() {
		var a = this.value;

		a = _trim(a), "button" == this.type && a >= "A" && "Z" >= a && 1 == a.length && (this.value = " " + String.fromCharCode(a.charCodeAt(0) + 32) + " ")
	}), capsLockFlag = !capsLockFlag
}, randomNumberButton = function() {
	var b, d, e, a = new Array(10);
	for (a[0] = 0, a[1] = 1, a[2] = 2, a[3] = 3, a[4] = 4, a[5] = 5, a[6] = 6, a[7] = 7, a[8] = 8, a[9] = 9, d = 0; 10 > d; d++) b = parseInt(10 * Math.random()), e = a[0], a[0] = a[b], a[b] = e;
	$("[name=button_number0]")[0].value = " " + a[0] + " ", $("[name=button_number1]")[0].value = " " + a[1] + " ", $("[name=button_number2]")[0].value = " " + a[2] + " ", $("[name=button_number3]")[0].value = " " + a[3] + " ", $("[name=button_number4]")[0].value = " " + a[4] + " ", $("[name=button_number5]")[0].value = " " + a[5] + " ", $("[name=button_number6]")[0].value = " " + a[6] + " ", $("[name=button_number7]")[0].value = " " + a[7] + " ", $("[name=button_number8]")[0].value = " " + a[8] + " ", $("[name=button_number9]")[0].value = " " + a[9] + " "
}, cbbkeyboard.fix_keyboardccb = function(a) {
	cbbkeyboard.init(), $("input.keyboard", a).each(function(a) {
		var b = $(this);
		cbbkeyboard.initPwd(b), $("<a class='keyboard_tgt in_bk' href='javascript:void(0);'><i class='iconfont'>&#xe62f;</i></a>").click(function() {
			cbbkeyboard.hidekeyboard ? (cbbkeyboard.showkeyboard(a), b.addClass("using")) : cbbkeyboard.closekeyboard()
		}).insertAfter(b)
	})
}, cbbkeyboard.fix_keyboardccb(".main");