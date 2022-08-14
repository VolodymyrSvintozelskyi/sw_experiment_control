function make_notification(title, text, type='info', delay = 1000){
    new PNotify({
        title: title,
        text: text,
        type: type,
        stack: {"dir1": "up", "dir2": "right", "push": "top"},
        addclass: 'stack-bottomleft',
        delay: delay
    });
}