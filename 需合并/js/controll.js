//每一个页面的数据保存在同文件夹下 op.js 的op对象里

var count = op.steps;//总点击次数
var pagename = op.nextpage;
var page_type = op.type;//场景类型：0为自动跳转，1为分支选择，2为结局决定
var click = 0;//当前点击次数

function Return() {
    window.location.href ="../../index.html";
}
function skip(){
    click = op.steps-1;
    document.getElementById('skip').classList.toggle('active');
    var moveElement = document.getElementById('move'); // 获取具有id="move"的元素
    if (moveElement) {
        moveElement.click(); // 模拟点击该元素
    }
}
//淡入淡出动画
var num = 0;
function changeBackground() {
    var nowbackground = window.localStorage.MSYbackgroundIMG;
    if (op.background[click] != "none" && op.background[click] != nowbackground) {
        const backgroundImage1 = $('#1');
        const backgroundImage2 = $('#2');
        const nextImage = "../../images/background/" + op.background[click]; // 下一张背景图片的路径

        if(num == 0){
            // 淡出ID为1的背景图片，同时淡入ID为2的背景图片
            backgroundImage1.animate({ opacity: 0 }, {
                duration: 2000,
                step: function (now) {
                // 在淡出的过程中，同时淡入ID为2的背景图片
                    backgroundImage2.css('background-image', `url('${nextImage}')`);
                    backgroundImage2.css('opacity', 1 - now);
                },
            });
            num = 1;
        }
        else{
            // 淡出ID为2的背景图片，同时淡入ID为1的背景图片
            backgroundImage2.animate({ opacity: 0 }, {
                duration: 2000,
                step: function (now) {
                // 在淡出的过程中，同时淡入ID为2的背景图片
                    backgroundImage1.css('background-image', `url('${nextImage}')`);
                    backgroundImage1.css('opacity', 1 - now);
                },
            });
            num = 0;
        }
    }
    window.localStorage.MSYbackgroundIMG = op.background[click];
}
function goto(apage) {
    $("body").fadeOut(100, function () { window.location.replace(apage); })
};

//对话进行
function next_text() {
    $("#texts").hide();
    $("#name").hide();
    if(op.texts[click] == "none"){
        $("#dialog, #text-box").hide();
    }
    else{
        $("#dialog, #text-box").show();
    }
        
    if (op.name[click] != "旁白") {
        document.getElementById("name").innerHTML = "(" + op.name[click];
    }
    else {
        document.getElementById("name").innerHTML = "<br>";
    }
    document.getElementById("texts").innerHTML = op.texts[click];
    $("#texts").fadeIn();
    $("#name").fadeIn();
    return;
}

function MusicPlayer() {//对话框音效
    var music = document.getElementById("music");
    if(op.music[click] != "none"){
        music.src = "../../bgm/" + op.music[click] + ".mp3";
        music.play();
        music.loop = false;
        music.preload = true;
        music.volume = 1;
    }
}

function MusicPlayer2() {//选择分支音效
    var music = document.getElementById("music2");
    music.play();
    music.loop = false;
    music.preload = true;
    music.volume = 1;
}

//auto功能实现
var autoClickInterval; // 保存定时器的引用
var autoClickEnabled = false; // 记录是否启用自动点击
function startAutoClick() {
    if (autoClickEnabled) {
        // 停止自动点击
        clearInterval(autoClickInterval);
        autoClickEnabled = false;
        document.getElementById('op_auto').style.color = ""; // 恢复按钮文本颜色
    }
    else {
        // 启用自动点击
        autoClickInterval = setInterval(function() {
            // 模拟点击 "SKIP" 按钮
            document.getElementById('move').click();
        }, 2000); // 设置时间间隔，这里是每1.8秒触发一次点击

        autoClickEnabled = true;
        document.getElementById('op_auto').style.color = "#c0d4e7"; // 修改按钮文本颜色为红色
    }
}

//页面转跳函数
function redirectToNewPage(nextpage) {
    // 在上一页中跳转到下一页时传递上一页的 URL
    var nextPageURL = nextpage + "?referrer=" + encodeURIComponent(window.location.href);
    window.location.href = nextPageURL;
}

function next_move(ending) {
    //如果当前未到该页面结束，执行一系列动画
    if (click < count) {
        next_text();
        changeBackground();
        bgmchange();
        click++;
        window.localStorage.nowclick = click;
    }
    else {//本页面已结束
        window.localStorage.nowclick = 0;
        switch (page_type) {
            case 0://自动跳转
                goto("../" + pagename);
                break;
            case 1://分支选择框出现
                $("#selection_box").fadeIn();
                break;
            case 2:
                $("#_selection_box").fadeIn();
                break;
        }
    }
};

function bgmchange(){
    var nowbgm = op.bgm[click];
    if(nowbgm != window.localStorage.nowbgm && nowbgm != "none"){
        window.localStorage.nowbgm = nowbgm;
    }
}

function raise_flag(state){
    var index = window.localStorage.userid;
    if (index == -1 || index == undefined) {
        alert("未能确定当前用户状态，加载失败");
        return;
    }

    var array = JSON.parse(window.localStorage.userArr);
    array[index].MSYflag[state] = 1;
    window.localStorage.userArr = JSON.stringify(array);
}
//存档
function saveCurrentGame(slotIndex){
    const saveData = JSON.parse(localStorage.getItem("myGameSaveSlots")) || [];
    const now = new Date();

    saveData[slotIndex] = {
        date: now.toLocaleString(),
        page: window.location.pathname,   // 当前页面路径
        click: click,                     // 当前对话进度
        background: op.background[click], // 当前背景
        chapter: op.gamename,            // 当前章节名
        userFlags: JSON.parse(localStorage.getItem("userArr")) || null // 用户flag
    };

    localStorage.setItem("myGameSaveSlots", JSON.stringify(saveData));
}
