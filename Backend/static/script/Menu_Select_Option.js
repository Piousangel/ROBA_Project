var radio_hot = [window.document.img_hot_unselect, window.document.img_hot_selected, window.document.img_hot_clicked];
var radio_ice = [window.document.img_ice_unselect, window.document.img_ice_selected, window.document.img_ice_clicked];
var radio_can = [window.document.img_can_unselected, window.document.img_hotcan_selected, window.document.img_icecan_selected];
var btn = [window.document.img_not_yet, window.document.img_yet, window.document.img_clicked]

var img_hot_temp = 0;
var img_ice_temp = 0;
var btn_temp = 0;
var can_temp = 0;

function init() {
    img_hide(radio_hot);
    img_hide(radio_ice);
    img_hide(btn);
    img_hide(radio_can);

    var option_get = document.getElementById("option").innerText;
    if (option_get == "none") {
        img_hot_temp = 0;
        img_ice_temp = 0;
        can_temp = 0;
    } else if (option_get == "0") {
        img_hot_temp = 0;
        img_ice_temp = 1;
        btn_temp = 1;
        can_temp = 2;
        document.getElementById("btn_order").addEventListener("mouseup", function () { mouse_up("Btn") })
    } else if (option_get == "1") {
        img_hot_temp = 1;
        img_ice_temp = 0;
        btn_temp = 1;
        can_temp = 1;
        document.getElementById("btn_order").addEventListener("mouseup", function () { mouse_up("Btn") })
    }
    radio_hot[img_hot_temp].hidden = false;
    radio_ice[img_ice_temp].hidden = false;
    btn[btn_temp].hidden = false;
    radio_can[can_temp].hidden = false;

    document.getElementById("radio_hot").addEventListener("mouseup", function () { mouse_up("Hot") })
    document.getElementById("radio_hot").addEventListener("mousedown", function () { mouse_down("Hot") })
    document.getElementById("radio_hot").addEventListener("mouseleave", function () { mouse_out("Hot") })

    document.getElementById("radio_ice").addEventListener("mouseup", function () { mouse_up("Ice") })
    document.getElementById("radio_ice").addEventListener("mousedown", function () { mouse_down("Ice") })
    document.getElementById("radio_ice").addEventListener("mouseleave", function () { ouse_out("Ice") })

    document.getElementById("btn_order").addEventListener("mousedown", function () { mouse_up("Btn") }) //추가
    cnt_init();
    countdown('/Order_Timeout');
}

function mouse_down(value) { //hot : 1, ice : 0
    cnt = 10;

    if (value == "Hot") {
        img_hide(radio_hot);
        radio_hot[2].hidden = false;
    } else if (value == "Ice") {
        img_hide(radio_ice);
        radio_ice[2].hidden = false;
    }

}

function mouse_out(value) {
    if (value == "Hot") {
        img_hide(radio_hot);
        radio_hot[img_hot_temp].hidden = false;
    } else if (value == "Ice") {
        img_hide(radio_ice);
        radio_ice[img_ice_temp].hidden = false;
    }
}

function mouse_up(value) {
    img_hide(radio_hot);
    img_hide(radio_ice);
    img_hide(radio_can);
    if (value == "Hot") {
        img_hot_temp = 1;
        img_ice_temp = 0;
        can_temp = 1;
        img_hide(btn);
        btn_temp = 1;
        document.getElementById("btn_order").addEventListener("mouseup", function () { mouse_up("Btn") })
        btn[btn_temp].hidden = false
    } else if (value == "Ice") {
        img_hot_temp = 0;
        img_ice_temp = 1;
        can_temp = 2;
        img_hide(btn);
        btn_temp = 1;
        document.getElementById("btn_order").addEventListener("mouseup", function () { mouse_up("Btn") })
        btn[btn_temp].hidden = false
    } else if (value == "Btn") {
        if (img_hot_temp == 1 || img_ice_temp == 1) {
            img_hide(btn);
            btn[2].hidden = false;
            document.getElementById("btn_order").addEventListener("mouseup", function () { postForm("/Menu_Select_Option", img_hot_temp) })
            document.getElementById("btn_order").addEventListener("mouseleave", function () {
                img_hide(btn);
                btn[1].hidden = false;
            })
        }
    }
    radio_hot[img_hot_temp].hidden = false;
    radio_ice[img_ice_temp].hidden = false;
    radio_can[can_temp].hidden = false;
}