var timeT = document.getElementById("screen");

window.onload = function () {
    cnt = 5;
    countdown();
}

function countdown() {
    if (cnt == 0) {
        sendGet('/Main');
    } else {
        timeT.innerText = "0" + cnt + "초 후 처음 화면으로 돌아갑니다.";
        setTimeout('countdown()', 1000);
        cnt--;
    }
}