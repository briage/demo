"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(...args) {
    return args.reduce((pre, cur) => {
        return pre + cur;
    });
}
exports.sum = sum;
