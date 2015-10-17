var m = require('mithril');
var modal = require('./modal/modal.js');
var assignStyles = require('assign-styles');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var styler = function (root) {
    var r = getRandomInt(1,16);
    console.log('animation #' + r);

    var main = root.children[0];
    var second = root.children[1];
    main.attrs.class = main.attrs.class + " modal-animation-" + getRandomInt(1,16);

    if (main.attrs.class.indexOf('modal-visible') > -1) {
        // modal visible
        main.attrs.style = assignStyles(main.attrs.style, {
            backgroundColor: '#aaffee',
            width: '700px'
        })
    }

    return root;
}

// top level
var demo = {
    view: function(ctrl) {
        return [
            m("button[type=button]", {
                onclick: function() {
                    modal.show();
                }
            }, "Click to show modal"),
            m.component(modal, {
                innerComponent: m.component(inner),
                transformer: styler,
                // the close string can be suplied:
                close: '✘',
                // close: '×',
                // close: 'x'
            })
        ]
    }
}

// inner component; to be rendered in the modal
var inner = {
    controller: function() {},
    view: function() {
        return m('div',
            m("h1", "Hello world"))
    }
}

m.module(document.body, demo)
