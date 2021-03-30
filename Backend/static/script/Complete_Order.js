var line_gif = [window.document.loading_line, window.document.complete_line];
function init(){
    cnt = 5;
    countdown('/Main');
    setTimeout("changegif()", 1000);

    img_hide(line_gif);
    line_gif[0].hidden = false
}

function changegif() {
    line_gif[0].hidden = true;
    line_gif[1].hidden = false;
}