function addAge(age) {
    return age + 1
}

// let age = addAge(30)
let age = addAge('30')

console.log(age) // 301 => 문자열로 인식해 계산해버린다.
