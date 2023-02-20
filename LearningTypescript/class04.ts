// 4장 - 객체

// 4.1 객체 타입
// 4.1.1 객체 타입 선언
// 기존 객체에서 직접 타입을 유추하는 방법도 굉장히 좋지만, 결국에는 객체의 타입을 명시적으로 선언하고 싶다.
// 명시적으로 타입이 선언된 객체와는 별도로 객체의 형태를 설명하는 방법이 필요하다.
// 객체 타입은 객체 리터럴과 유사하게 보이지만, 필드 값 대신 타입을 사용해 설명한다.
// 타입스크립트가 타입 할당 가능성에 대한 오류 메시지에 표시하는 것과 동일한 구문하다.

// poetLater 변수는 boran: number와 name: string으로 이전과 동일한 타입이다.

let poetLater: {
    born: number
    name: string
}
poetLater = { born: 1935, name: 'Mary Oliver' }
poetLater = 'Sappho' // 'string' 형식은 '{ born: number; name: string; }' 형식에 할당할 수 없습니다.

// 4.1.2 별칭 객체 타입
// { born: number, name: string }과 같은 객체 타입을 계속 작성하는 일은 매우 귀찮다.
// 각 객체 타입에 타입 별칭을 할당해 사용하는 방법이 더 일반적입니다.

// 다음과 같이 이전 코드 스니펫은 Poet 타입으로 다시 작성할 수 있으며, 타입스크립트의 할당가능성 오류 메시지를 좀 더 직접적으로 읽기 쉽게 만드는 추가 이점이 있다.
type Poet = {
    born: number
    name: string
}

let poetLater2: Poet

// OK
poetLater2 = {
    born: 1935,
    name: 'Sara Teasdale',
}
poetLater2 = 'Emily Dickinson' // 'string' 형식은 'Poet' 형식에 할당할 수 없습니다.

// 4.2 구조적 타이핑
// 타입스크립트의 타입 시스템은 '구조적으로 타입화' 되어 있다. 즉, 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다.
// 다시 말하자면, 매개변수나 변수가 특정 객체 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 있어야 한다고 말해야한다.

type WithFirstName = {
    firstName: string
}

type WithLastName = {
    lastName: string
}

const hasBoth = {
    firstName: 'Lucille',
    lastName: 'Clifton',
}
// OK: 'hasBoth'는 'string' 타입의 'firstName'을 포함함
let WithFirstName: WithFirstName = hasBoth
// OK: 'hasBoth'는 'string' 타입의 'lastName'을 포함함
let WithLastName: WithLastName = hasBoth

// 구조적 타이핑은 덕 타이핑(duck typing)과는 다르다.
// 덕 타이핑은 '오리처럼 보이고 오리처럼 꽥꽥거리면, 오리일 것이다.'라는 문구에서 유래했다.

// - 타입스크립트의 타입 검사기에서 구조적 타이핑은 정적 시스템이 타입을 검사하는 경우이다.
// - 덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것을 말한다.

// 요약하면 자바스크립트는 덕 타입인 반면, 타입스크립트는 구조적으로 타입화이다.

// 4.2.1 사용검사
// 객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인한다.
// 할당하는 값에는 객체 타입의 필수 속성이 있어야 한다.
// 객체 타입에 필요한 멤버가 객체에 없다면 타입스크립트는 타입 오류를 발생시킨다.

type FirstAndLastName = {
    first: string
    last: string
}

// OK
const hasBoth: FirstAndLastName = {
    first: 'Sarojini',
    last: 'Naidu',
}
const hasOnlyOne: FirstAndLastName = {
    first: 'Sappho',
}
