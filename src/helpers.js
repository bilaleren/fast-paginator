'use strict';

function extend(target, source) {
    if(typeof source !== 'object') return target;

    for(let key in source) {
        if(source.hasOwnProperty(key)) {
            if(typeof source[key] === 'object' && !Array.isArray(source[key])) {
                extend(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
}

function replaceArgs(str, args) {
    return (str || '').replace(new RegExp(`(${ Object.keys(args).join('|') })`, 'gm'), replace => {
        replace = (args.hasOwnProperty(replace) ?
            args[replace] : replace);
        return replace;
    });
}

module.exports.extend = extend;
module.exports.replaceArgs = replaceArgs;