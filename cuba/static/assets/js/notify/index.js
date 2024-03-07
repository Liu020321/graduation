'use strict';
var notify = $.notify('<i class="fa fa-bell-o"></i><strong>正在加载</strong> 页面，请不要关闭当前页面...', {
    type: 'theme',
    allow_dismiss: true,
    delay: 2000,
    showProgressbar: true,
    timer: 300,
    animate:{
        enter:'animated fadeInDown',
        exit:'animated fadeOutUp'
    }
});

setTimeout(function() {
    notify.update('message', '<i class="fa fa-bell-o"></i><strong>正在加载</strong> 内部数据。');
}, 1000);
