
var recommend = [[document.getElementById("img_recommend_btn_0_select"), document.getElementById("img_recommend_btn_0_unselect")],
[document.getElementById("img_recommend_btn_1_select"), document.getElementById("img_recommend_btn_1_unselect")],
[document.getElementById("img_recommend_btn_2_select"), document.getElementById("img_recommend_btn_2_unselect")]];

var blender_0_ratio = parseInt(document.getElementById("text_blender_0_percent").innerText);
var blender_1_ratio = parseInt(document.getElementById("text_blender_1_percent").innerText);
var blender_2_ratio = parseInt(document.getElementById("text_blender_2_percent").innerText);
var remain_ratio = 100 - blender_0_ratio - blender_1_ratio - blender_2_ratio;

var btn = [window.document.img_not_yet, window.document.img_yet, window.document.img_pushed]

function init() {
    cnt_init();
    countdown('/Order_Timeout');

    img_hide(recommend[0]);
    img_hide(recommend[1]);
    img_hide(recommend[2]);

    recommend[0][0].hidden = false;
    recommend[1][0].hidden = false;
    recommend[2][0].hidden = false;

    img_hide(btn);
    btn[0].hidden = false;

    var btn_recommend = [document.getElementById("img_recommend_btn_0"),
    document.getElementById("img_recommend_btn_1"),
    document.getElementById("img_recommend_btn_2")];

    for (let i = 0; i < btn_recommend.length; i++) {
        btn_recommend[i].addEventListener("mousedown", function () {
            recommend_change(i)
        });
    }

    var ratio = [[document.getElementById("blender_0_up"), document.getElementById("blender_0_down")],
    [document.getElementById("blender_1_up"), document.getElementById("blender_1_down")],
    [document.getElementById("blender_2_up"), document.getElementById("blender_2_down")]];

    for (let blender = 0; blender < ratio.length; blender++) {
        for (let btn_ud = 0; btn_ud < ratio[0].length; btn_ud++) {
            ratio[blender][btn_ud].addEventListener("mousedown", function () {
                ratio_change(blender, btn_ud)
            });
        }
    }

    document.getElementById("text_remain_ratio").innerText = remain_ratio.toString() + "%";

    if (remain_ratio == 0) {
        img_hide(btn);
        btn[1].hidden = false;
    }

    btn_order = document.getElementById("btn_order")
    btn_order.addEventListener("mousedown", function () {

        if (remain_ratio == 0) {
            img_hide(btn);
            btn[2].hidden = false;
        }
    })
    btn_order.addEventListener("mouseup", function () {
        if (remain_ratio == 0) {
            postForm("/Menu_Select_Blending", [blender_0_ratio, blender_1_ratio, blender_2_ratio]);
        }
    })
    btn_order.addEventListener("mouseleave", function () {

        if (remain_ratio == 0) {
            img_hide(btn);
            btn[1].hidden = false;
        }
        else {
            btn[0].hidden = false;
        }
    })

    fill_animation("img_blender_0_fill", blender_0_ratio);
    fill_animation("img_blender_1_fill", blender_1_ratio);
    fill_animation("img_blender_2_fill", blender_2_ratio);
}

function recommend_change(value) {

    img_hide(recommend[0]);
    img_hide(recommend[1]);
    img_hide(recommend[2]);
    if (value == 0) {
        blender_0_ratio = 50;
        blender_1_ratio = 20;
        blender_2_ratio = 30;
        remain_ratio = 0;
        recommend[0][1].hidden = false;
        recommend[1][0].hidden = false;
        recommend[2][0].hidden = false;
    } else if (value == '1') {
        blender_0_ratio = 30;
        blender_1_ratio = 40;
        blender_2_ratio = 30;
        remain_ratio = 0;
        recommend[0][0].hidden = false;
        recommend[1][1].hidden = false;
        recommend[2][0].hidden = false;
    } else if (value == '2') {
        blender_0_ratio = 40;
        blender_1_ratio = 20;
        blender_2_ratio = 40;
        remain_ratio = 0;
        recommend[0][0].hidden = false;
        recommend[1][0].hidden = false;
        recommend[2][1].hidden = false;
    }

    img_hide(btn);
    btn[1].hidden = false;

    document.getElementById("text_blender_0_percent").innerText = blender_0_ratio.toString() + "%";
    document.getElementById("text_blender_1_percent").innerText = blender_1_ratio.toString() + "%";
    document.getElementById("text_blender_2_percent").innerText = blender_2_ratio.toString() + "%";
    document.getElementById("text_remain_ratio").innerText = remain_ratio.toString() + "%";

    fill_animation("img_blender_0_fill", blender_0_ratio);
    fill_animation("img_blender_1_fill", blender_1_ratio);
    fill_animation("img_blender_2_fill", blender_2_ratio);
}

function ratio_change(blender, btn_ud) {
    if (btn_ud == 0) {
        ratio_up(blender);
    } else {
        ratio_down(blender);
    }
}

function ratio_down(value) {
    if (value == 0) {
        if (blender_0_ratio != '0') {
            blender_0_ratio -= 10;
            remain_ratio += 10;
        }
    } else if (value == '1') {
        if (blender_1_ratio != 0) {
            blender_1_ratio -= 10;
            remain_ratio += 10;
        }
    } else if (value == '2') {
        if (blender_2_ratio != 0) {
            blender_2_ratio -= 10;
            remain_ratio += 10;
        }
    }

    if (remain_ratio != 0) {
        img_hide(btn);
        btn[0].hidden = false;
    }
    document.getElementById("text_blender_0_percent").innerText = blender_0_ratio.toString() + "%";
    document.getElementById("text_blender_1_percent").innerText = blender_1_ratio.toString() + "%";
    document.getElementById("text_blender_2_percent").innerText = blender_2_ratio.toString() + "%";
    document.getElementById("text_remain_ratio").innerText = remain_ratio.toString() + "%";

    fill_animation("img_blender_0_fill", blender_0_ratio);
    fill_animation("img_blender_1_fill", blender_1_ratio);
    fill_animation("img_blender_2_fill", blender_2_ratio);
}

function ratio_up(value) {
    if (remain_ratio != 0) {
        if (value == '0') {
            if (blender_0_ratio != 100) {
                blender_0_ratio += 10;
                remain_ratio -= 10;
            }
        } else if (value == '1') {
            if (blender_1_ratio != 100) {
                blender_1_ratio += 10;
                remain_ratio -= 10;
            }
        } else if (value == '2') {
            if (blender_2_ratio != 100) {
                blender_2_ratio += 10;
                remain_ratio -= 10;
            }
        }
    }

    if (remain_ratio == 0) {
        img_hide(btn);
        btn[1].hidden = false;
    }

    document.getElementById("text_blender_0_percent").innerText = blender_0_ratio.toString() + "%";
    document.getElementById("text_blender_1_percent").innerText = blender_1_ratio.toString() + "%";
    document.getElementById("text_blender_2_percent").innerText = blender_2_ratio.toString() + "%";
    document.getElementById("text_remain_ratio").innerText = remain_ratio.toString() + "%";
    fill_animation("img_blender_0_fill", blender_0_ratio);
    fill_animation("img_blender_1_fill", blender_1_ratio);
    fill_animation("img_blender_2_fill", blender_2_ratio);
}



function fill_animation(id, ratio) {
    id = '#' + id;
    var height_ratio = ratio * 1.2;
    var top_ratio = 132 - height_ratio;

    $(id).animate({ top: top_ratio, height: height_ratio }, 200);
}