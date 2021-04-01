function sendGet(action) {
    var form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', action);
    document.charset = "utf-8"
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}

function sendPost(action, params) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);
    document.charset = "utf-8";
    for (var key in params) {
        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}

/* hidden="hidden" 처리 */
function img_hide(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].hidden = true;
    }
}

function postForm(action, value) {
    var json = "";
    if (action == "/Menu_Select_Option") {
        json = {
            "Option_Select": value
        };
    }
    else if (action == "/Menu_Select_Blending") {
        json = {
            "Blender_1": value[0],
            "Blender_2": value[1],
            "Blender_3": value[2]
        };
    }
    else {
        json = {
            "None": value
        };
    }
    sendPost(action, json);
}

var cnt = 10;

/* 주문 가능시간 조절 함수 */
function cnt_init() {
    cnt = 30;
}

/*function countdown(action) {
    if (cnt == 0) {
        sendGet(action);
    } else {
        setTimeout(countdown, 1000, action);
        cnt--;
    }
}*/