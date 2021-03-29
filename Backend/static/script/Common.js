function sendGet(action) {
    var form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', action);
    document.charset = "utf-8";
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    form.appendChild(hiddenField);
    document
        .body
        .appendChild(form);
    form.submit();
}