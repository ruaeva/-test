$(function() {
	var productsID = [1, 2, 3, 4]
	$(".productsBox button").each(function(index) {
		$(this).on("click", function() {
			add(productsID[index])
		});
	});

	//这种写法可以删除任意行，并可以为新增行自动绑定事件
	$("body").on("click", ".del", function() {
		$(this).closest(".item").remove();
		countTotalprice();
		return false;
	});

	// 全选全不选
	$(".selectAll").click(function() {
		var cks = $("#listBox input[type=checkbox]");
		for (i = 0; i < cks.length; i++)
			if ($(".selectAll").is(":checked")) {
				cks[i].checked = true;
			} else {
				cks[i].checked = false;
			}
	})

	//判断是否全选函数
	function check() {
		var oInput = $("input[name=check]");
		var C = 0;
		for (var i = 0; i < oInput.length; i++) {
			if (oInput[i].checked == true) {
				C++;
			}
		}
		if (C == oInput.length) {
			$(".selectAll").prop("checked", "true");
			// document.querySelector(".selectAll").checked = true;
		} else {
			 // $(".selectAll").prop("checked", "false");
			document.querySelector(".selectAll").checked = false;
		}

	}


	$("#delcheck").click(function() {
		var $cks = $("#listBox input[type=checkbox]");
		$cks.each(function() {
			if ($(this).is(":checked")) {
				$(this).closest(".item").remove();
			}
		});
		check();
		countTotalprice();
	});

	$("body").on("click", "input[name=check]", function() {
		check();
	});

	$("body").on("click", "input[type=checkbox]", function() {
		countTotalprice();
	});

	$("body").on("change", "input[type=number]", function() {
		subtotal($(this));
	});
});



//单项小计函数
function subtotal($this) {
	var price = $this.closest(".item").find("span.price").text();
	var subtotal = $this.closest(".item").find("span.subtotal");
	var total = parseFloat(price) * $this.val();
	subtotal.html(total.toFixed(2));
	countTotalprice();
}

//计算总价函数
function countTotalprice() {
	var $cks = $("#listBox input[type=checkbox]");
	var totalprice = 0;
	$cks.each(function() {
		if ($(this).is(":checked")) {
			var price = $(this).closest(".item").find("span.subtotal").text();
			totalprice += parseFloat(price);
			$("#totalprice").html(totalprice.toFixed(2));
		} else {
			$("#totalprice").html(totalprice.toFixed(2));
		}
	});
	//删除购物车内所选商品时让总计归零
	if (totalprice == 0) {
		$("#totalprice").html(totalprice.toFixed(2));
	}
}

//添加购物车函数
function add(productID) {
	//创建新节点
	switch (productID) {
		case 1:
			var $newPro = $(
				"<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product1.jpg' height='100'></div><div>新品华为笔记本MateBook D 14/15 轻薄本商务办公本笔记本电脑学生 D15 i5-10210U 16 512G独显灰</div><div>¥<span class='price'>5239.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>5239.00</span></div><div><a href='#' class='del'>删除</a></div></div>"
			);
			break;
		case 2:
			var $newPro = $(
				"<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product2.jpg' height='100'></div><div>新款Huawei/华为折叠手机mates xs 5g版大屏双屏全面屏双面屏官方旗舰店对折手机可折叠屏 Mate XS折叠</div><div>¥<span class='price'>20980.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>20980.00</span></div><div><a href='#' class='del'>删除</a></div></div>"
			);
			break;
		case 3:
			var $newPro = $(
				"<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product3.jpg' height='100'></div><div>华为智慧屏V55i-A 55英寸 HEGE-550 4K超薄全面屏液晶电视机 多方视频通话 AI升降摄像头 4GB+64GB 星际黑</div><div>¥<span class='price'>3999.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>3999.00</span></div><div><a href='#' class='del'>删除</a></div></div>"
			);
			break;
		case 4:
			var $newPro = $(
				"<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product4.jpg' height='100'></div><div>华为荣耀智能手表WATCH Magic运动男女2Pro手环定位NFC支付 陶瓷版（流沙杏）</div><div>¥<span class='price'>699.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>699.00</span></div><div><a href='#' class='del'>删除</a></div></div>"
			);
			break;
	}

	//查找购物车中是否已有相同产品
	var flag = 1;
	$(".item").each(function() {
		var productName = $(this).find("div:eq(2)").html();
		var newProductName = $newPro.find("div:eq(2)").html();
		if (productName == newProductName) {
			flag = 0;
			$(this).find("input[type='number']").val(function(n, c) {
				return parseInt(c) + 1;
			});
			subtotal($(this).find("input[type='number']"));
			return false;
		}
	})
	if (flag) {
		//在#listBox中插入新建节点
		$("#listBox").append($newPro);
	}
}
