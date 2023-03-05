// 예외
// 예외가 발생하면 프로그램이 종료가 된다.
// 예외처리의 일원화를 하는 것도 클린코드의 시작이다.

function doException() {
    throw new Error('이것은 오류입니다.')
}
function noException() {
    return true
}
function callException(type) {
    if (type === 'do') {
        doException()
    } else {
        noException()
    }
}

function main() {
    try {
        callException('do')
    } catch (error) {
        console.log(error)
    } finally {
        console.log('Done!!')
    }
}

main()
