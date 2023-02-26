function addAge(age: number): number {
    return age + 1
}

let age: number = addAge(30)
let test: number = addAge('30') // 'string' 형식의 인수는 'number' 형식의 매개 변수에 할당될 수 없습니다.

console.log(age)

// 타입스크립트의 가장 큰 장점은 타입스크립트 앱을 사용자가 사용하고 있는 상황이 아니라
// 개발자가 개발하고 있는 순간 즉, 컴파일 타임에 오류를 잡아내 준다고 하는 것이 가장 큰 가치이다.
