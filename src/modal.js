import m from 'mithril'; // let m = require('mithril');
import style from './style';
import assignStyles from 'assign-styles';
import Prefixer from 'inline-style-prefixer';
// let customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
let prefixer = new Prefixer();
let visible = m.prop(false);

export function show() {
    visible(true);
}

export function hide() {
    visible(false);
}

debugger

export function controller(args, extras) {
    let ctrl = this;
    let origColor = style.base.color;

    ctrl.onunload = function() {
        document.body.removeEventListener('keyup', handleKey)
    }

    ctrl.config = function(element, isInitialized, context) {
        if (!isInitialized) {
            let handleKey = function(e) {
                if (e.keyCode == 27) {
                    visible(false);
                    m.redraw()
                }
            }

            document.body.addEventListener('keyup', handleKey)
        }
    }
}

export function view(ctrl, args, extras) {
    args = args || {}
    args.style = args.style || {}

    return m('div', [
        m(".modal", {
            class: [
                visible() ? "modal-visible" : "",
                args.class
            ].join(" "),
            onclick: hide,
            config: ctrl.config,
            style: prefixer.prefix(assignStyles(style.base, visible() ? style.visible : style.hidden))
        }, [
            m(".modal-dialog", {
                style: prefixer.prefix(assignStyles(style.dialog, args.style.dialog)),
            }, [
                m("a", {
                    onclick: hide,
                    onmouseover: function() {
                        this.style.color = 'white'
                    },
                    onmouseout: function() {
                        this.style.color = 'black'
                    },
                    style: prefixer.prefix(assignStyles(style.close, args.style.close))
                }, args.close ? args.close : '×'),
                args.innerComponent ? args.innerComponent : ''
            ])
        ]),
        m(".modal-overlay", {
            style: prefixer.prefix(assignStyles(style.overlay, args.style.overlay))
        })
    ])
}
