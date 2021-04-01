var timeT = document.getElementById("runningtime");
var order_btn = [window.document.order, window.document.order_clicked];

function init() {
    cnt = 10;
    countdown('/Main');
    
    img_hide(order_btn);

    order_btn[0].hidden = false;

    document
        .getElementById("order_confirm")
        .addEventListener("touchstart", function () {
            order_btn[0].hidden = true;
            order_btn[1].hidden = false;
        })
    document
        .getElementById("order_confirm")
        .addEventListener("touchend", function () {
            postForm("/Main", "");
        })
    document
        .getElementById("order_confirm")
        .addEventListener("mouseleave", function () {
            order_btn[0].hidden = false;
            order_btn[1].hidden = true;
        })
}

function img_hide(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].hidden = true;
    }
}