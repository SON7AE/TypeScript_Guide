// 5장 - 함수
// 한쪽 끝에는 함수 인수가 있고, 다른 쪽 끝에는 반환 타입이 있다.

// 5.1 함수 매개변수
// 다음 sing 함수는 song 매개변수를 받아 콘솔에 출력한다.
function sing(song) {
    console.log(`Singing: ${song}!`)
}
// 그러나 여기서 sing 함수를 작성한 개발자가 song 매개벼수를 제공하기 위해 의도한 값의 타입은 무엇일까?
// string일까? 재정의된 toString() 메서드가 있는 객체일까? 이 코드는 버그일까? 누가 알 수 있을까?
// 명시적 타입 정보가 선언되지 않으면 절대 타입을 알 수 없다.
// 타입스크립트가 이를 any 타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있다.

// 변수와 마찬가지로 타입스크립트를 사용하면 타입 애너테이션으로 함수 매개변수의 타입을 선언할 수 있다.
// 다음과 같이 : string을 사용해 song 매개변수가 string 타입임을 타입스크립트에 알린다.
function singOne(song: string) {
    console.log(`Singing: ${song}!`)
}

// 5.1.1 필수 매개변수
// 자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있다.
// 하지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다.
// 함수가 잘못된 수의 인수로 호출되면, 타입스크립트는 타입 오류의 형태로 이의를 제기한다.
// 함수가 너무 적거나 많은 인수로 호출되면 타입스크립트는 인수의 개수를 계산한다.

// 다음 singTwo 함수는 두 개의 매개변수가 필요하므로 하나 혹은 세 개의 인수를 전달하는 것은 모두 허용되지 않는다.
function singTwo(first: string, second: string) {
    console.log(`${first} / ${second}`)
}
singTwo('Ball and Chain') // 2개의 인수가 필요한데 1개의 인수만 가져왔다.
singTwo('I Will Survive!', 'Higher Love') // OK
singTwo('Go Your Own Way', 'The Chain', 'Dreams') // 2개의 인수가 필요한데 3개의 인수를 가져왔다.

// 매개변수는 인수로 받을 것으로 예상되는 함수의 선언을 나타낸다.
// 인수는 함수를 호출할 때 매개변수에 제공되는 값을 나타낸다.
// 이전 예제에서 first, second는 매개변수이고 "Dreams"와 같은 문자열은 인수이다.

// 5.1.2 선택적 매개변수
// 자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인숫값은 undefined으로 기본값이 설정된다는 것을 떠올려보자.
// 때로는 함수 매개변수를 제공할 필요가 없을 때도 있고, undefined 값을 위해 의도적으로 사용할 수도 있다.
// 타입스크립트가 이러한 선택적 매개변수에 인수를 제공하지 못하는 경우, 타입 오류를 보고하지 않았으면 한다.
// 타입스크립트에서는 선택적 객체타입속성과 유사하게 타입 애너테이션읜 : 앞에 ?를 추가해 매개변수가 선택적이라고 표시한다.
// 함수호출에 선택적 매개변수를 제공할 필요는 없다.
// 선택적 매개변수에는 항상 | undefined가 유니언 타입으로 추가되어 있다.

// 다음 announceSong 함수에서 singer 매개변수는 선택 사항으로 표시한다.
// 타입은 string | undefined이며 함수 호출자가 singer 매개변수를 위한 인수를 제공할 필요가 없다.
function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`)

    if (singer) {
        console.log(`Singer: ${singer}`)
    }
}
announceSong('Greensleeves') // OK
announceSong('Greensleeves', undefined) // OK
announceSong('Chandelier', 'Sia') // OK

// 선택적 매개변수는 항상 암묵적으로 undefined가 될 수 있다.
// 이전 코드에서 singer는 string | undefined 타입으로 시작한 후 if 문에 따라 string 타입으로 좁혀진다.
// 선택적 매개변수는 | undefined를 포함하는 유니언 타입 매개변수와는 다르다. ?으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 undefined 일지라도 항상 제공되어야 한다.
