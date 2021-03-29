var tem = [window.document.hot, window.document.ice]
var back_btn = [window.document.back_btn_not_clicked, window.document.back_btn_clicked]
var btn = [window.document.btn_not_clicked, window.document.btn_clicked]
var option = window.document.getElementById("hot_ice").innerText;
var timeT = document.getElementById("runningtime");
var blender_0_value = parseInt(document.getElementById("text_blender_0_percent").innerText);
var blender_1_value = parseInt(document.getElementById("text_blender_1_percent").innerText);
var blender_2_value = parseInt(document.getElementById("text_blender_2_percent").innerText);

function init() {

    img_hide(back_btn);
    img_hide(btn);

    back_btn[0].hidden = false;
    btn[0].hidden = false;

    if (option == "Hot") {
        tem[1].hidden = true;
        tem[0].hidden = false;
    } else {
        tem[1].hidden = false;
        tem[0].hidden = true;
    }
    cnt_init();
    countdown('/Order_Timeout');

    document.getElementById("back_btn_id").addEventListener("mousedown", function () { mouse_down("1") })
    document.getElementById("btn_id").addEventListener("mousedown", function () { mouse_down("2") })
    document.getElementById("back_btn_id").addEventListener("mouseup", function () { mouse_up("1") })
    document.getElementById("btn_id").addEventListener("mouseup", function () { mouse_up("2") })
    document.getElementById("back_btn_id").addEventListener("mouseleave", function () { mouse_out("1") })
    document.getElementById("btn_id").addEventListener("mouseleave", function () { mouse_out("2") })

    fill_animation("img_round_2_fill", blender_2_value);
    fill_animation("img_round_1_fill", blender_2_value + blender_1_value);
    fill_animation("img_round_0_fill", blender_2_value + blender_1_value + blender_0_value);
}



function mouse_down(value) {
    if (value == "1") {
        img_hide(back_btn);
        back_btn[1].hidden = false;
    }
    else if (value == "2") {
        img_hide(btn);
        btn[1].hidden = false;
    }
}

function mouse_up(value) {
    if (value == "1") {
        sendGet("/Menu_Select_Option");
    }
    else if (value == "2") {
        postForm("/Confirm_Order", "");
    }
}

function mouse_out(value) {
    if (value == "1") {
        img_hide(back_btn);
        back_btn[0].hidden = false;
    }
    else if (value == "2") {
        img_hide(btn);
        btn[0].hidden = false;
    }
}

function fill_animation(id, ratio) {
    id = '#' + id;
    var top_ratio = - 2.25 * ratio;
    console.log(top_ratio);
    $(id).animate({ top: top_ratio }, 10 * ratio);
}
