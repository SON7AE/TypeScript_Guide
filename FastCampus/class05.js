// 문법 - 식

// 식은 값으로 환원되기 때문에 ;을 찍게 되어있다.
// 식은 하나의 값으로 수렴한다.

// 등호(=) : 할당연산자
// += : 복합 할당연산자
// -= : 복합 할당연산자

// 구조분해 할당
const colors = ['red', 'yellow', 'black']
colors[1] // 어떤 색깔인지 알 수 없다.
// 그래서 아래와 같이 쓰는데
const yellow = colors[1]
// 그러나 코드 타이핑 양이 많아지기 때문에
const [red, , black] = colors // 배열은 위치를 생각해줘야한다.

const Colors = {
    blue: 'blue',
    white: 'white',
    green: 'green',
}
const { green, white } = Colors

// 동등과 일치
let a = 10
let b = '10'

if (a == b) {
    // true
}
if (a === b) {
    // false
}
// 일치 연산자를 반드시 사용한다 생각하고 받아들이면 된다. 동등연산자(==) 보다는 일치연산자(===)를 쓰도록 하자.

// 사칙연산자 중 특이하게 + 연산자만 문자열을 결합시킬 수 있다. 그러나 근래엔 template 리터럴을 주로 쓴다. `` (백틱)
// 괄호로 감싸면 연산자의 우선순위를 지정해줄 수 있다는 것을 명심하자.

;(function foo() {}) // 함수를 괄호로 감싸면 값이 되기도 한다. 참고하자.
