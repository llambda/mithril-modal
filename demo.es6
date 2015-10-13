import m from 'mithril';
import modal from './lib/modal';

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
                // component to render inside the modal:
                innerComponent: m.component(inner),
                // animation class:
                class: 'modal-animation-8',
                // styles can be overridden as well
                style: {
                    dialog: {
                        backgroundColor: '#aaffee',
                        width: '700px'
                    }
                },
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
