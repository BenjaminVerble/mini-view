/**
 * http://www.2ality.com/2012/08/underscore-extend.html
 * Axel Rauschmayer
**/

function update(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        Object.getOwnPropertyNames(source).forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
    });
    return target;
};
/**
 * http://www.2ality.com/2012/08/underscore-extend.html
 * Axel Rauschmayer
**/
function clone(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    update(copy, obj);
    return copy;
}

/**
 * https://github.com/Leaflet/Leaflet/blob/master/src/core/Util.js#L108-L118
 *
**/

function interpolate(str, data) {
    return str.replace(/\{{ *([\w_]+) *\}}/g, function (str, key) {
        var value = data[key];
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        } else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    });
}

function createView(opts) {

    var view = clone(opts);

    if (!opts || !opts.template) {
        throw new Error('createView: an options object with a template property (string) must be provided when calling createView');
    }

    var templateFunc = interpolate.bind(undefined, opts.template);

    var $tempEl = document.createElement('div');

    $tempEl.innerHTML = templateFunc(opts.context);

    view.$el = $tempEl.children[0];

    if (opts.init) {
        opts.init(view);
    }
    return view;
}

createView.cache = {};

/*
 * https://github.com/umdjs/umd/blob/master/returnExports.js
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(this, function () {
    return createView;
}));