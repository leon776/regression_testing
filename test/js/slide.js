"use strict"

//命名空间及说明性文字
var MXD = MXD || {};
MXD.app = MXD.app || {};
//公共工具
MXD.app.slideInfo =  {
    name: 'MXD应用组件-幻灯片滑动',
    lastModify: '13.2.4',
    author: 'reznovzou'
};
MXD.app.slide = (function(){
    var members, membersProto, tools, wrapStep;
    members = {};
    //通用工具
    tools = {
        extend : function (subClass, superClass) {
            var F = function() {};
            F.prototype = superClass.prototype;
            subClass.prototype = new F();
            subClass.prototype.constructor = subClass;

            subClass.superclass = superClass.prototype;
            if(superClass.prototype.constructor == Object.prototype.constructor){
                superClass.prototype.constructor = superClass;
            }
        },
        Observer : function(){
            this.fns = [];
        },
        sniff : (function(){
            var hasTouch = 'ontouchstart' in window;
            return {
                hasTouch : hasTouch,
                //支持鼠标事件还是touch事件
                touchStart: hasTouch ? 'touchstart' : 'mousedown',
                touchMove: hasTouch ? 'touchmove' : 'mousemove',
                touchEnd: hasTouch ? 'touchend' : 'mouseup',
                touchCancel: hasTouch ? 'touchcancel' : 'mouseup',
                //浏览器是否支持classList
                hasClassList: (function(){
                    return 'classList' in document.documentElement
                })()
            }
        })(),
        translateAT : function(elem, end, time, callback) {
            if(!elem || !end){
                throw new Error('前两个为必选参数，请补全或校验');
            }
            var eventString = function(e) {
                elem.style.webkitTransition = '';
                if(callback && typeof callback ==='function'){
                    callback();
                }
                elem.removeEventListener('webkitTransitionEnd', eventString);
            };
            end.x = (typeof end.x === 'number' && end.x !== 0) ? end.x + 'px' : end.x;
            end.y = (typeof end.y === 'number' && end.y !== 0) ? end.y + 'px' : end.y;
            if (time !== 0) {
                time = time || 500;
            };
            elem.style.webkitTransition = '-webkit-transform ' + time + 'ms';
            elem.style.webkitTransform = 'translate3d(' + end.x + ', ' + end.y + ',0)';
            elem.addEventListener('webkitTransitionEnd', eventString, false);
        },
        pageX : function(elem) {
            return elem.offsetParent ? elem.offsetLeft + this.pageX(elem.offsetParent) : elem.offsetLeft;
        },
        pageY : function(elem) {
            return elem.offsetParent ? elem.offsetTop + this.pageY(elem.offsetParent) : elem.offsetTop;
        }
    };
    tools.Observer.prototype = {
        subscribe: function(fn){
            this.fns.push(fn);
        },
        unsubscribe: function(fn) {
            this.fns = this.fns.filter(function(el) {
                if(el !== fn) {
                    return el;
                }
            })
        },
        fire: function(o) {
            this.fns.forEach(function(el) {
                el(o);
            })
        }
    }

    //slide内核
    members.Core = function(args){
        if(!args || !args[0] || !args[1]){
            throw new Error('Core前两个参数为必选，请补全或校验');
        }
        var that, slideBox, slideUl, option, defOpt, value;
        slideBox = args[0];
        slideUl = args[1];
        option = args[2];
        that = this;
        slideBox = typeof slideBox === 'string' ? document.querySelector(slideBox) : slideBox;
        slideUl = typeof slideUl === 'string' ? slideBox.querySelector(slideUl) : slideUl;
        //默认参数
        defOpt = {
            slideList: 'li',
            width: 'auto',
            moveTime: 500
        }
        //初始化参数
        option = option || {};
        for(value in defOpt){
            option[value] = option[value] || defOpt[value];
        }
        option.slideList = typeof option.slideList === 'string' ? slideUl.querySelectorAll(option.slideList) : option.slideList;
        //事件观察者初始化
        this.onTouchStart = new tools.Observer();
        this.onTouchEnd = new tools.Observer();
        this.onStepTo = new tools.Observer();
        //向后继承属性
        this.property = {
            slideBox: slideBox,
            slideUl: slideUl,
            slideLen: option.slideList.length,
            lenCount: 0,
            isMove: false,
            option: option,
            moveTime: option.moveTime,
            stepTo: function(lenCount, time, callback){
                if (time !== 0) {
                    time = time || option.moveTime;
                };
                this.isMove = true;
                tools.translateAT(slideUl, {x:-lenCount * that.property.boxWidth(), y:0}, time, function(){
                    that.property.isMove = false;
                    if(callback && typeof callback === 'function'){
                        callback();
                    }
                });
            },
            boxWidth: function(){
                if(typeof option.width === 'number'){
                    this.boxWidth = function(){
                        return option.width;
                    }
                }else if(option.width.nodeType){
                    this.boxWidth = function(){
                        return option.width.offsetWidth;
                    }
                }else {
                    this.boxWidth = function(){
                        return slideBox.offsetWidth;
                    }
                }
                return this.boxWidth();
            }
        }
        //对外接口
        this.helper = {
            refresh : function(){
                that.property.slideUl.style.webkitTransform = 'translate3d(' + (-that.property.lenCount * that.property.boxWidth()) + 'px, 0,0)';
            },
            bindStepTo : function(callback){
                that.onStepTo.subscribe(callback);
            },
            unbindStepTo : function(callback){
                that.onStepTo.unsubscribe(callback);
            },
            jumpToFrame : function(count, time){
                count = parseInt(count - 1);
                if (!count || count < 0 || count > (that.slideLen - 1)) {
                    return new Error('请输入合法的数字!');
                };
                time = time || that.property.moveTime;
                that.property.lenCount = count;
                that.property.stepTo(count, time);
                that.onStepTo.fire({count:count});
            }
        }
    };

    //除Core外其它包装类的父类
    membersProto = function(args){
        var packet = args[0];
        this.packet = packet;
        this.property = packet.property;
        this.helper = packet.helper;
        this.onTouchStart = packet.onTouchStart;
        this.onTouchEnd = packet.onTouchEnd;
        this.onStepTo = packet.onStepTo;
    };

    //touch行为包装
    members.TouchCore = function(args){
        var that, property, slidePos, slideBox, slideUl, boxWidth, touchOrg, touchCur, distance, judgeTouch, isTime, disTimeMac, sniff;
        sniff = tools.sniff;
        //继承
        members.TouchCore.superclass.constructor.call(this, args);
        property = this.packet.property;
        that = this;
        slideBox = property.slideBox;
        slideUl = property.slideUl;
        //获取slide外层的位置
        slidePos = {
            x: tools.pageX(slideBox),
            y: tools.pageY(slideBox)
        }
        this.touchStartEvent = function(e) {
            var e0, i, len;
            if(!sniff.hasTouch) {
                e.preventDefault();
            }
            //多点触摸只支持第一个手指
            e0 = (sniff.hasTouch && e.changedTouches[0]) ? e.changedTouches[0] : e;
            //获取触摸原点,值是相对slideBox的
            touchOrg = {
                x: e0.pageX - slidePos.x,
                y: e0.pageY - slidePos.y
            };
            distance = {
                x: 0,
                y: 0
            };
            touchCur = {
                x: 0,
                y: 0
            }
            judgeTouch = '';
            //开始触摸时设定一个300ms定时器,时间内为快速滑动
            isTime = true;
            boxWidth = property.boxWidth();
            disTimeMac = setTimeout(function(){
                isTime = false;
            }, 300);
            slideUl.style.webkitTransition = '';
            slideUl.removeEventListener(sniff.touchStart, this);
            document.documentElement.addEventListener(sniff.touchMove, this);
            document.documentElement.addEventListener(sniff.touchEnd, this);
            document.documentElement.addEventListener(sniff.touchCancel, this);
        }
        this.touchMoveEvent = function(e) {
            var tmp, e0, d, p, b;
            d = distance;
            p = property;
            b = boxWidth;
            e0 = (sniff.hasTouch && e.changedTouches[0]) ? e.changedTouches[0] : e;
            touchCur.x = e0.pageX - slidePos.x;
            touchCur.y = e0.pageY - slidePos.y;
            d.x = touchOrg.x - touchCur.x;
            d.y = touchOrg.y - touchCur.y;
            //判断用户滑动行为是上下还是左右
            if(!judgeTouch && (Math.abs(d.x) > 10 || Math.abs(d.y) > 10)) {
                if(Math.abs(d.x) >= Math.abs(d.y)) {
                    judgeTouch = 'touchEvent';
                    //执行监听touchStart事件者行为
                    //因为默认行为是不需要touchstart行为的，因此不放在start事件侦听器中
                    this.onTouchStart.fire();
                }else if(Math.abs(d.x) < Math.abs(d.y)){
                    judgeTouch = 'browDefault';
                }else {
                    judgeTouch = '';
                }
            }
            if(judgeTouch === 'touchEvent') {
                e.preventDefault();
                //判断当滑动处于第一幅和最后一副的时候不能超过边界拖动
                if((p.lenCount <= 0 && d.x < 0) || (p.lenCount >= p.slideLen - 1 && d.x > 0)){
                    d.x = 0;
                }
                //当滑动超过一个容器宽度时纠正为一个容器宽
                if(d.x > b) {
                    d.x = b;
                }else if(d.x < -b) {
                    d.x = -b;
                }
                slideUl.style.webkitTransform = 'translate3d({0}, 0, 0)'.replace('{0}', -p.lenCount * b - d.x + 'px');
            }else if(judgeTouch === 'browDefault') {
                //解决android 4.0手机不在move时设置e.preventDefault()不会触发touchend的奇怪问题
                slideUl.addEventListener(sniff.touchStart, this);
                document.documentElement.removeEventListener(sniff.touchMove, this);
                document.documentElement.removeEventListener(sniff.touchEnd, this);
                document.documentElement.removeEventListener(sniff.touchCancel, this);
            }
        }
        this.touchEndEvent = function(e) {
            var sign, ev, e0, time, p, d, b;
            p = property;
            d = distance;
            b = boxWidth;
            sign = 0;
            e0 = (sniff.hasTouch && e.changedTouches[0]) ? e.changedTouches[0] : e;
            if(judgeTouch === 'touchEvent'){
                sign = d.x >=0 ? 1 : -1;
                if(isTime) {
                    if(d.x >= b/4 || d.x <= -b/4){
                        p.lenCount = p.lenCount + sign;
                        time = p.moveTime * ((b - Math.abs(d.x)) / b);
                    }else {
                        time = p.moveTime * Math.abs(d.x / b);
                    }
                    isTime = false;
                    clearTimeout(disTimeMac);
                }else {
                    if(Math.abs(d.x) >= b/2){
                        p.lenCount = p.lenCount + sign;
                        time = p.moveTime * ((b - Math.abs(d.x)) / b);
                    }else {
                        time = p.moveTime * Math.abs(d.x / b);
                    }
                }
                if(Math.abs(d.x) === b){
                    that.onStepTo.fire({count:p.lenCount});
                }else if(d.x !== 0){
                    p.stepTo(p.lenCount, time);
                    that.onStepTo.fire({count:p.lenCount});
                }
            }else if(judgeTouch === '') {
                //当用户没有滑动，应该模拟触发一个click事件
                slideUl.removeEventListener('click', this.clickEvent);
                ev = document.createEvent('MouseEvents');
                ev.initMouseEvent('click', true, true, e.view, 1, e0.screenX, e0.screenY, e0.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e0.metaKey, 0, null);
                e0.target.dispatchEvent(ev);
                slideUl.addEventListener('click', this.clickEvent, false);
            }
            slideUl.addEventListener(sniff.touchStart, this);
            document.documentElement.removeEventListener(sniff.touchMove, this);
            document.documentElement.removeEventListener(sniff.touchEnd, this);
            document.documentElement.removeEventListener(sniff.touchCancel, this);
            //执行监听touchEnd事件者行为
            this.onTouchEnd.fire();
        }
        this.clickEvent = function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        slideUl.addEventListener(sniff.touchStart, this);
        slideUl.addEventListener('click', this.clickEvent);
    }
    tools.extend(members.TouchCore, membersProto);
    //事件委托
    members.TouchCore.prototype.handleEvent = function(e) {
        switch(e.type) {
            case tools.sniff.touchStart: this.touchStartEvent(e); break;
            case tools.sniff.touchMove: this.touchMoveEvent(e); break;
            case tools.sniff.touchCancel: this.touchEndEvent(e); break;
            case tools.sniff.touchEnd: this.touchEndEvent(e); break;
        }
    }

    //autoPlay行为包装
    members.AutoPlay = function(args) {
        var that, interval, autoFun, autoMac, property, resetAutoMac;
        //继承
        members.AutoPlay.superclass.constructor.call(this, args);
        that = this;
        interval = args[1] || 3000;
        property = this.property;
        property.option.interval = interval;
        autoFun = function(){
            property.lenCount = (property.lenCount + 1) % property.slideLen;
            property.stepTo(property.lenCount, property.option.moveTime, function(){
                clearTimeout(autoMac);
                autoMac = setTimeout(autoFun, property.option.interval);
            });
            that.onStepTo.fire({count:property.lenCount});
        };
        resetAutoMac = function(){
            clearTimeout(autoMac);
            autoMac = setTimeout(autoFun, property.option.interval);
        }
        this.onTouchStart.subscribe(function(){
            clearTimeout(autoMac);
        });
        this.onTouchEnd.subscribe(resetAutoMac);
        this.onStepTo.subscribe(resetAutoMac);
        autoMac = setTimeout(autoFun, property.option.interval);
    };
    tools.extend(members.AutoPlay, membersProto);

    //eitherButton行为包装
    members.EitherButton = function(args){
        var that, preButton, nextButton, changeName, preEvent, nextEvent, preOrgName, nextOrgName, eventHandle;
        //继承初始化
        members.EitherButton.superclass.constructor.call(this, args);
        that = this;
        preButton = typeof args[1] === 'string' ? document.querySelector(args[1]) : args[1];
        nextButton = typeof args[2] === 'string' ? document.querySelector(args[2]) : args[2];
        if(!preButton || !nextButton) {
            throw new Error('EitherButton前两个参数为必选，请补全或校验');
        }
        changeName = args[3] || '';
        preOrgName = preButton.className;
        nextOrgName = nextButton.className;
        eventHandle = function(e, type){
            var i, len, lenCount;
            e.preventDefault();
            lenCount = that.property.lenCount;
            len = that.property.slideLen;
            if(type === 'pre' && lenCount <= 0){
                return false;
            }else if(type === 'next' && lenCount >= len - 1){
                return false;
            }
            that.property.lenCount = type === 'pre' ? lenCount - 1 : lenCount + 1;
            that.changeClass(that.property, preButton, nextButton, changeName, preOrgName, nextOrgName);
            that.property.stepTo(that.property.lenCount, that.property.option.moveTime);
            that.onStepTo.fire({count:lenCount});
        }
        preEvent = function(e){
            eventHandle(e, 'pre');
        }
        nextEvent = function(e){
            eventHandle(e, 'next');
        }
        preButton.addEventListener(tools.sniff.touchEnd, preEvent);
        nextButton.addEventListener(tools.sniff.touchEnd, nextEvent);
        that.changeClass(that.property, preButton, nextButton, changeName, preOrgName, nextOrgName);
        this.onStepTo.subscribe(function(){
            that.changeClass(that.property, preButton, nextButton, changeName, preOrgName, nextOrgName);
        });
    }
    tools.extend(members.EitherButton, membersProto);
    members.EitherButton.prototype.changeClass = function(property, preButton, nextButton, changeName, preOrgName, nextOrgName){
        var lenCount, len, reg, hasName;
        lenCount = property.lenCount;
        len = property.slideLen;
        if(preButton && lenCount <= 0) {
            preButton.className = preOrgName !== '' ? preOrgName + ' ' + changeName : changeName;
        }else if(preButton && preButton.className !== preOrgName) {
            preButton.className = preOrgName;
        }
        if(nextButton && lenCount  >= len - 1){
            nextButton.className = nextOrgName !== '' ? nextOrgName + ' ' + changeName : changeName;
        }else if(nextButton && nextButton.className !== nextOrgName){
            nextButton.className = nextOrgName;
        }
    }

    //TabButton行为包装
    members.TabButton = function(args){
        var that, list, changeName, isControl, tabEvent, i, len;
        //继承初始化
        members.TabButton.superclass.constructor.call(this, args);
        that = this;
        list = typeof args[1] === 'string' ? document.querySelectorAll(args[1]) : args[1];
        changeName = args[2] || '';
        isControl = args[3] || false;
        if(!list) {
            throw new Error('TabButton前一个参数为必选，请补全或校验');
        }
        tabEvent = function(e, i){
            var property;
            e.preventDefault();
            property = that.property;
            if(property.lenCount === i){
                return false;
            }
            property.lenCount = i;
            that.changeClass(property, list, changeName);
            property.stepTo(property.lenCount, property.option.moveTime);
            that.onStepTo.fire({count:property.lenCount});
        }
        if(list && isControl) {
            for(i=0,len=list.length; i<len; i++){
                list[i].addEventListener(tools.sniff.touchEnd, (function(i){
                    return function(e){
                        tabEvent(e, i);
                    };
                })(i));
            }
        }
        that.changeClass(that.property, list, changeName);
        this.onStepTo.subscribe(function(){
            that.changeClass(that.property, list, changeName);
        });
    }
    tools.extend(members.TabButton, membersProto);
    members.TabButton.prototype.changeClass = function(property, list, changeName){
        var lenCount, len, i;
        lenCount = property.lenCount;
        for(i=0, len = list.length; i < len; i++){
            list[i].className = list[i].className === changeName ? '' : list[i].className.replace(' ' + changeName, '');
        }
        list[lenCount].className += list[lenCount].className === '' ? changeName : ' ' + changeName;
    }

    //percentBar行为包装
    members.PercentBar = function(args){
        var that, elem, changeBar;
        members.PercentBar.superclass.constructor.call(this, args);
        that = this;
        elem = typeof args[1] === 'string' ? document.querySelector(args[1]) : args[1];
        if(!elem) {
            throw new Error('PercentBar前一个参数为必选，请补全或校验');
        }
        changeBar = function(){
            var lenCount, len;
            lenCount = that.property.lenCount;
            len = that.property.slideLen;
            elem.style.width = (lenCount + 1) / len * 100 + '%';
        }
        changeBar();
        this.onStepTo.subscribe(changeBar);
    }
    tools.extend(members.PercentBar, membersProto);

    //包装方法
    wrapStep = function(){};
    wrapStep.prototype = {
        step: function(fn, args){
            if(!this.fnStr[fn]){
                throw new Error('没有这个对象');
            }
            fn = this.fnStr[fn];
            //保证args能支持1,2,3、[1,2,3]、为空三种方式输入
            if(!args){
                args = [];
            }else if(args.constructor !== Array) {
                args = Array.prototype.slice.call(arguments, 1);
            }
            if(this.obj){
                args.unshift(this.obj);
            }else if(args.length === 0){
                args = undefined;
            }
            this.obj = new fn(args);
            this.helper = this.obj.helper;
            return this;
        },
        members: members,
        fnStr: {
            Core: members.Core,
            TouchCore: members.TouchCore,
            AutoPlay: members.AutoPlay,
            EitherButton: members.EitherButton,
            TabButton: members.TabButton,
            PercentBar: members.PercentBar
        }
    }
    return wrapStep;

})();