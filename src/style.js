'use strict';
export const base = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: '320px',
    height: 'auto',
    zIndex: '10000',
    transform: 'translateX(-50%) translateY(-50%)'
}

export const hidden = {
    visibility: 'hidden'
}

export const visible = {
    visibility: 'visible',
    backfaceVisibility: 'visible'
}

export const close = {
    cursor: 'pointer',
    color: 'inherit',
    fontSize: '1.6em',
    fontWeight: 'bold',
    right: '10px',
    position: 'absolute',
    textDecoration: 'none',
    top: '5px'
}

export const dialog = {
    position: 'relative',
    background: 'silver',
    minHeight: '400px',
    padding: '10px',
    width: '400px'
}
export const overlay = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    visibility: 'hidden',
    top: '0',
    left: '0',
    zIndex: base.zIndex - 1,
    opacity: '0'
}
