//获取动画元素
var getEle = function(selector) {
    return document.querySelector(selector);
}
var getEles = function(selector) {
    return document.querySelectorAll(selector);
}
var CCls = {
    getClass: function(ele) {
        return ele.className.replace(/\s+/, " ").split(" ");
    },

    hasClass: function(ele, cls) {
        return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
    },

    addClass: function(ele, cls) {
        if (!this.hasClass(ele, cls))
            ele.className += " " + cls;
    },

    removeClass: function(ele, cls) {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', "gi");
            ele.className = ele.className.replace(reg, " ");
        }
    },
    toggleClass: function(ele, cls) {
        if (this.hasClass(ele, cls)) {
            this.removeClass(ele, cls);
        } else {
            this.addClass(ele, cls);
        }
    }
};
// 要设置文本动画的元素
var textAnimateEles = {
    ".screen-1": [
        ".screen-1_wrap_title",
        ".screen-1_wrap_subtitle"
    ],
    ".screen-2": [
        ".screen-2_wrap_title",
        ".screen-2_wrap_underline",
        ".screen-2_wrap_subtitle",
    ],
    ".screen-3": [
        ".screen-3_wrap_title",
        ".screen-3_wrap_underline",
        ".screen-3_wrap_subtitle"
    ],
    ".screen-4": [
        ".screen-4_wrap_title",
        ".screen-4_wrap_underline",
        ".screen-4_wrap_subtitle"
    ],
    ".screen-5": [
        ".screen-5_wrap_title",
        ".screen-5_wrap_underline",
        ".screen-5_wrap_subtitle"
    ]
};
var otherAnimateEles = {
    ".header": ".header",
    ".screen-2": ".screen-2_wrap_pic_item2",
    ".screen-3": ".screen-3_wrap_language",
    ".screen-4": ".screen-4_wrap_item",
    ".screen-5": ".screen-5_wrap_pic"
}
var setTextAnimateInit = function(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateEles = textAnimateEles[screenCls]; //需要设置文字动画的元素
    for (var i = 0; i < animateEles.length; i++) {
        var element = document.querySelector(animateEles[i]);
        CCls.addClass(element, "text_animation-init"); //添加一个类名   
    }
}
var setOtherAnimateInit = function(screenCls) {
    var element = document.querySelectorAll(screenCls); //需要设置动画的其他元素
    for (var i = element.length - 1; i >= 0; i--) {
        element[i]
        var baseCls = element[i].getAttribute('class');
        element[i].setAttribute('class', baseCls + ' ' + screenCls.substr(1) + '_animation-init');
    }
}
// 第一步：初始化设置.
window.onload = function() {
    //  为所有元素设置 textAnimation
    for (k in textAnimateEles) {
        if (k == '.screen-1') {
            continue;
        }
        setTextAnimateInit(k);
    }
    for (j in otherAnimateEles) {
        setOtherAnimateInit(otherAnimateEles[j]);
    }
}
// 第二步：滚动条设置
var setScrollDone = function(screenCls) {
    var animateEles = textAnimateEles[screenCls]; //需要设置动画的元素
    for (var i = 0; i < animateEles.length; i++) {
        var element = document.querySelector(animateEles[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animation-init', '_animation-done'));
    }
}
var setScrollDone2 = function(screenCls) {
    var otherAnimate = otherAnimateEles[screenCls];
    var element = document.querySelectorAll(otherAnimate);
    for (var i = element.length - 1; i >= 0; i--) {
        var baseCls = element[i].getAttribute('class');
        element[i].setAttribute('class', baseCls.replace('_animation-init', '_animation-done'));
    }
}
//  第二步附加：初始化第一屏的动画（1. skipScreenAnimateInit 2.跳过 init ）
setTimeout(function() {
 setScrollDone('.screen-1'); 
 setScrollDone2('.header');
}, 200);


window.onscroll = function() {
    //直接写document.body.scrollTop有兼容性问题，这是兼容性写法
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop)

    //   2.1 导航条样式变动
    if (top > 60) {
        CCls.addClass(getEle('.header'), "header_status");
        scrollTopChange(0);
    } else {
        CCls.removeClass(getEle('.header'), "header_status");

        // switchNavItemsActive(0); // 后面添加的，不需要立刻
    }

    if (top > 650 * 1) {
        CCls.addClass(getEle('.rightsidebar'), 'rightsidebar-status');
    } else {
        CCls.removeClass(getEle('.rightsidebar'), 'rightsidebar-status');
    }
    if (top > (650 * 1 - 150)) {
        setScrollDone('.screen-2');
        setScrollDone2('.screen-2');
        scrollTopChange(1);
    }
    if (top > (650 * 2 - 150)) {
        setScrollDone('.screen-3');
        setScrollDone2('.screen-3');
        scrollTopChange(2);
    }
    if (top > (650 * 3 - 150)) {
        setScrollDone('.screen-4');
        setScrollDone2('.screen-4');
        scrollTopChange(3);
    }
    if (top > (650 * 4 - 150)) {
        setScrollDone('.screen-5');
        setScrollDone2('.screen-5');
        scrollTopChange(4);
    }
}
function scrollTopChange(index2){
    changeStyle()
    navUderlines[index2].className=navUderlines[this.index].className+" " +"header_nav_items_underline-active";
    sidebarNav[index2].className = sidebarNav[this.index].className +" "+"rightsidebar__item-active"; 
        // navUderlines[this.index].animationPlayState="paused";
}
// 导航栏的侧边导航栏的顺各项绑定
var index = 0,
    navItems = getEles(".header_nav_items"),
    navUderlines = getEles(".header_nav_items_underline"),
    sidebarNav = getEles(".rightsidebar__item"),
    scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    for (var i = navItems.length - 1; i >= 0; i--) {
      navItems[i].index = i;
      sidebarNav[i].index =i;
      navItems[i].onclick=changeScrollTop
      sidebarNav[i].onclick=changeScrollTop
    }
    function changeScrollTop(){
        changeStyle()
        index =this.index; 
        navUderlines[this.index].className=navUderlines[this.index].className+" " +"header_nav_items_underline-active";
        sidebarNav[this.index].className = sidebarNav[this.index].className +" "+"rightsidebar__item-active"; 
        document.documentElement.scrollTop = index*650;
      }
      // 重置样式
    function changeStyle(){
      for (var i = navItems.length - 1; i >= 0; i--) {
        CCls.removeClass(navUderlines[i],"header_nav_items_underline-active");
        CCls.removeClass(sidebarNav[i],"rightsidebar__item-active");
      }
    }