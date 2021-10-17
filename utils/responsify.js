function responsify(code, data) {
    const datum = {data}
    const body = {
        "code":code,
        "data":datum
    }
    return body
    
}

module
.exports = responsify