(function () {
    if (typeof eruda === 'undefined') {
        var script = document.createElement('script');
        script.src = '//cdn.jsdelivr.net/npm/eruda';
        document.body.appendChild(script);
        script.onload = function () {
            eruda.init();
            console.log('Eruda console initialized.');
        };
    } else {
        console.log('Eruda is already loaded.');
    }
})();
