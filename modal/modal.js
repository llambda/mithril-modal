var m = require('mithril');
var visible = m.prop(false);
var style = require('./style');
var assignStyles = require('assign-styles');

module.exports.show = function() {
    visible(true);
}

var hide = function() {
    visible(false);
}
module.exports.hide = hide;

module.exports.controller = function(args, extras) {
    var ctrl = this;
    var origColor = style.base.color;

    ctrl.onunload = function() {
        document.body.removeEventListener('keyup', handleKey)
    }

    ctrl.config = function(element, isInitialized, context) {
        if (!isInitialized) {
            var handleKey = function(e) {
                if (e.keyCode == 27) {
                    visible(false);
                    m.redraw()
                }
            }

            document.body.addEventListener('keyup', handleKey)
        }
    }
}

module.exports.view = function(ctrl, args, extras) {
    args = args || {}

    var vdom = m('div', [
        m(".modal", {
            class: visible() ? "modal-visible" : "",
            onclick: hide,
            config: ctrl.config,
            style: assignStyles(visible() ? style.visible : style.hidden, style.base)
        }, [
            m(".modal-dialog", {
                style: style.dialog
            }, [
                m("a", {
                    onclick: hide,
                    onmouseover: function() {
                        this.style.color = 'white'
                    },
                    onmouseout: function() {
                        this.style.color = 'black'
                    },
                    style: style.close
                }, args.close ? args.close : '×'),
                args.innerComponent ? args.innerComponent : ''
            ])
        ]),
        m(".modal-overlay", {
            style: style.overlay
        })
    ])

    if (args.transformer) {
        return args.transformer(vdom);
    } else {
        return vdom;
    }
}
