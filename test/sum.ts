
function sum (...args) {
    return args.reduce((pre,cur) => {
        return pre + cur
    })
}
export { sum };