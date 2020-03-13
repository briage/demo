"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_1 = require("./sum");
// test.only('testonly', () => {
//     expect(sum(1, 2)).toBe(3);
// })
test('test', () => {
    expect(sum_1.sum(1, 2, 3)).toBe(6);
});
test('test1', () => {
    expect(sum_1.sum(1, 2, 3, 4)).toBe(10);
});
afterAll(() => {
    console.log('end');
});
afterEach(() => {
    console.log('endeach');
});
