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
// 4.2.2 초과 속성 검사
// 변수가 객체 타입으로 선언되고, 초깃값에 객체 타입에서 정의된 것보다 많은 필드가 있다면
// 타입스크립트에서 타입 오류가 발생한다. 따라서 변수를 객체 타입으로 선언하는 것은 타입검사기가 해당 타입에 예상되는 필드만 있는지 확인하는 방법이기도 하다.

type Poet = {
    born: number
    name: string
}

// OK: Poet의 필드와 일치함
const poetMatch: Poet = {
    born: 1928,
    name: 'Maya Angelou',
}
const extraProperty: Poet = {
    activity: 'walking',
    born: 1935,
    name: 'Mary Oliver',
}
// 초과 속성검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다.
// 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회한다.

const existingObject = {
    activity: 'walking',
    born: 1935,
    name: 'Mary Oliver',
}

const extraPropertyButOk: Poet = existingObject // OK

// 4.2.3 중첩된 객체 타입
// 자바스크립트 객체는 다른 객체의 멤버로 중첩될 수 있으므로, 타입스크립트의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 한다.
// 이를 구현하는 구문은 이전과 동일하지만 기본 이름 대신에 { ... } 객체 타입을 사용한다.

type Poem = {
    author: {
        firstName: string
        lastName: string
    }
    name: string
}

// OK
const poemMatch: Poem = {
    author: {
        firstName: 'Sylvia',
        lastName: 'Plath',
    },
    name: 'Lady Lazarus',
}
const poemMissMatch: Poem = {
    author: {
        name: 'Sylvia Plath',
    },
    name: 'Tulips',
}

// 4.3 객체 타입 유니언
// 4.3.1 유추된 객체 타입 유니언
// 변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다.
// 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다.
// 객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 선택적(?)타입이지만 각 객체 타입의 구성 요소로 주어진다.

// 4.3.2 명시된 객체 타입 유니언
// 객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있다.
// 코드를 조금 더 작성해야 하지만 객체 타입을 더 많이 제어할 수 있는 이점이 있다.
// 특히 값의 타입이 객체 타입으로 구성된 유니언이라면 타입스크립트의 타입 시스템은 이런 모든 유니언 타입에 존재하는 속성에 대한 접근만 허용한다.

type PoemWithPages = {
    name: string
    pages: number
}
type PoemWithRhymes = {
    name: string
    rhymes: boolean
}
type Poem = PoemWithPages | PoemWithRhymes

const poem: Poem = Math.random() > 0.5 ? { name: 'The Double Image', pages: 7 } : { name: 'Her Kind', rhymes: true }
poem.name // OK
poem.pages // 공통적으로 pages 속성이 없기 때문에 에러 표시
poem.rhymes // 공통ㅇ적으로 rhymes 속성이 없기 때문에 에러 표시

// 잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전을 지킬 수 있다.
// 값이 여러 타입 중 하나일 경우, 모든 타입에 존재하지 않는 속성이 객체에 존재할 거라 보장할 수 없다.
// 리터럴 타입이나 원시 타입 모두, 혹은 둘 중 하나로 이루어진 유니언 타입에서 모든 타입에 존재하지 않은 속성에 접근하기 위해 타입을 좁혀야 하는 것처럼
// 객체 타입 유니언도 타입을 좁혀아 한다.

// 4.3.3 객체 타입 내로잉
// 타입 검사기가 유니언 타입 값에 특정 속성이 포함된 경우에만 코드 영역을 실행할 수 있음을 알게 되면,
// 값의 타입을 해당 속성을 포함하는 구성 요소로만 좁힌다.
// 즉, 코드에서 객체의 형태를 확인하고 타입 내로잉이 객체에 적용된다.

// 명시적으로 입력된 Poem 예제를 계속 살펴보면, poem의 pages가 타입스크립트의 타입 가드 역할을 하여 PoemWithPages임을 나타내는지 확인한다.
// 만일 Poem이 PoemWithPages가 아니라면 PoemWithPhymes이어야 한다.

if ('pages' in poem) {
    poem.pages // OK: poem은 PoemWithPages로 좁혀진다.
} else {
    poem.rhymes // OK: poem은 PoemWithRhymes로 좁혀진다.
}

// 그러나 타입스크립트는 if (poem.pages)와 같은 형식으로 참 거짓 여부를 확인하는 것을 허용하지 않는다.
// 존재하지 않는 객체의 속성에 접근하려고 시도하면 타입 가드처럼 작동하는 방식으로 사용되더라도 타입 오류로 간주된다.

// 4.3.4 판변될 유니언
// 자바스크립트와 타입스크립트에서 유니언 타입으로 된 객체의 또 다른 인기 있는 형태는 객체의 속성이 객체의 형태를 나타내도록 하는 것이다.
// 이러한 타입 형태를 '판별된 유니언'이라 부르고, 객체의 타입을 가리키는 속성이 '판별값'이다.
// 타입스크립트는 코드에서 판별 속성을 사용해 타입 내로잉을 수행한다.
// 타입 내로잉 없이는 값에 존재하는 속성을 보장할 수 없다.

type PoemWithPages2 = {
    name: string
    pages: number
    type: 'pages'
}
type PoemWithRhymes2 = {
    name: string
    rhymes: boolean
    type: 'rhymes'
}
type Poem2 = PoemWithPages2 | PoemWithRhymes2

const poem2: Poem2 = Math.random() > 0.5 ? { name: 'The Double Image', pages: 7, type: 'pages' } : { name: 'Her Kind', rhymes: true, type: 'rhymes' }

if (poem2.type === 'pages') {
    console.log(`It's got pages: ${poem2.pages}`)
} else {
    console.log(`It rhymes: ${poem2.rhymes}`)
}

poem2.type // 타입: 'pages' | 'rhymes'

// 판별된 유니언은 우아한 자바스크립트 패턴과 타입스크립트의 타입 내로잉을 아름답게 결합한다.

// 4.4 교차 타입
