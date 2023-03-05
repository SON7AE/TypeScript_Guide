// 7장 - 인터페이스

// 인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법이다.
// 인터페이스는 별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호된다.

// 7.1 타입 별칭 vs 인터페이스
// 다음은 born: number와 name: string을 가진 객체를 타입 별칭으로 구현하는 간략한 구문이다.

type Poet = {
    born: number
    name: string
}
interface Poet {
    born: number
    name: string
}
// 위 두 코드는 동일한 구문이다.

// 세미콜론(;)을 선호하는 타입스크립트 개발자는 대부분 인터페이스 뒤가 아닌 타입 별칭 뒤에 세미콜론을 넣는다.
// 이 기본 설정은 세미콜론을 사용해 변수를 선언하는 것과 세미콜론 없이 클래스 또는 함수를 선언하는 것의 차이를 반영한다.

// 인터페이스에 대한 타입스크립트의 할당 가능성 검사와 오류 메시지는 객체 타입에서 실행되는 것과 거의 동일하다.
// Poet이 인터페이스 또는 타입 별칭인 경우 valueLater 변수에 할당하는 것에 대한 할당 가능성 오류는 거의 동일하다.

let valueLater: Poet

// OK
valueLater = {
    born: 1935,
    name: 'Sara Teasdale',
}
valueLater = 'Emily Dickinson' // 'string' 형식은 'Poet' 형식에 할당할 수 없습니다.
valueLater = {
    born: true, // 'boolean' 형식은 'number' 형식에 할당할 수 없습니다.
    name: 'Sappho',
}

// 그러나 인터페이스와 타입 별칭 사이에는 몇 가지 주요 차이점이 있다.

// - 인터페이스는 속성 증가를 위해 병합(merge)할 수 있다. 이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용하다.
// - 인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만, 타입 별칭은 사용할 수 없다.
// - 일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다. 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기 보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.
// - 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름(명명된) 객체로 간주되므로 어려운 특이케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.
// 가능하다면 인터페이스 사용을 추천한다. 즉, 타입 별칭의 유니언 타입과 같은 기능이 필요할 때까지는 인터페이스를 사용하는 것이 좋다.

// 7.2 속성 타입
// getter와 setter를 포함해, 가끔 존재하는 속성, 또는 임의의 속성 이름을 사용하는 등 자바스크립트 객체를 실제로 사용할 때 낯설고 이상할 수 있다.
// 타입스크립트는 인터페이스가 이런 이상한 부분을 모델링할 수 있도록 유용한 타입 시스템 도구를 제공한다.

// Tip : 인터페이스와 타입 별칭은 매우 비슷하게 작동하므로 이 장에서 소개하는 속성 타입은 별칭 객체 타입에도 사용할 수 있다.

// 7.2.1 선택적 속성
// 객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필요는 없다.
// 타입 애너테이션 : 앞에 ?를 사용해 인터페이스의 속성이 선택적 속성임을 나타낼 수 있다.

// 다음 Book 인터페이스는 필수 속성 pages와 선택적 속성 author를 갖는다.
// Book 인터페이스를 사용하는 객체에 필수 속성만 제공된다면 선택적 속성은 제공되거나 생략할 수 있다.
interface Book {
    author?: string
    pages: number
}
// OK
const ok: Book = {
    author: 'Rita Dove',
    pages: 80,
}
const missing: Book = {
    pages: 80,
}
// undefined를 포함한 유니언 타입의 선택적 속성과 일반 속성 사이의 차이점과 관련된 주의 사항은 객체 타입뿐만 아니라 인터페이스에도 적용된다.

// 7.2.2 읽기 전용 속성
// 경우에 따라 인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶다.
// 타입스크립트는 속성 이름 앞에 readonly 키워드를 추가해 다른 값으로 설정될 수 없음을 나타낸다.
// 이러한 readonly 속성은 평소대로 읽을 수 있지만 새로운 값으로 재할당하지 못한다.

// 예를 들어 다음 Page 인터페이스의 text 속성에 접근하면 string을 반환하지만, text에 새로운 값을 할당하면 타입 오류가 발생한다.
interface Page {
    readonly text: string
}

function read(page: Page) {
    // OK: text 속성을 수정하지 않고 읽는 것
    console.log(page.text)

    page.text += '!'
}
// readonly 제한자는 타입 시스템에만 존재하며 인터페이스에서만 사용할 수 있다.
// readonly 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적용되지 않는다.
// Page 예제에서 text 속성의 부모 객체는 함수 내부에서 text로 명시적으로 사용되지 않았기 때문에 함수 밖에서 속성을 수정할 수 있다.
// 쓰기 가능한 속성을 readonly 속성에 할당할 수 있으므로 pageIsh는 Page로 사용할 수 있다. 가변(쓰기 가능한) 속성은 readonly 속성이 필요한 모든 위치에서 읽을 수 있다.

const pageIsh = {
    text: 'Hello, world!!',
}
// OK: pageIsh는 Page 객체가 아니라 text가 있는, 유추된 객체 타입이다.
pageIsh.text += '!'

// OK: pageIsh의 더 구체적인 버전인 Page를 읽는다.
read(pageIsh)

// 명시적 타입 애너테이션인 : Page로 변수 pageIsh를 선언하면 타입스크립트에 text 속성이 readonly라고 가리키게 된다.
// 하지만 유추된 타입은 readonly가 아니었다.

// readonly 인터페이스 멤버는 코드 영역에서 객체를 의도치 않게 수정하는 것을 막는 편리한 방법이다.
// 그러나 readonly는 타입 시스템 구성 요소일 뿐 컴파일된 자바스크립트 출력 코드에는 존재하지 않는다.
// readonly는 단지 타입스크립트 타입 검사기를 사용해 개발 중에 그 속성이 수정되지 못하도록 보호하는 역할을 한다.

// 7.2.3 함수와 메서드
// 자바스크립트에서 객체 멤버가 객체 함수가 되는 것은 매우 일반적이다.
// 타입스크립트에서도 인터페이스 멤버를 앞서 5장 '함수'에서 다뤘던 함수 타입으로 선언할 수 있다.

// 타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공한다.
// - 메서드 구문 : 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
// - 속성 구문 : 인터페이스의 멤버를 member: () => void와 같이 독립 함수와 동일하게 선언

// 두 가지 선언 방법은 자바스크립트에서 객체를 함수로 선언하는 방법과 동일하다.
// 다음 코드의 method와 property 멤버는 둘 다 매개변수 없이 호출되어 string을 반환한다.

interface HasBothFunctionTypes {
    property: () => string
    method(): string
}
const hasBoths: HasBothFunctionTypes = {
    property: () => '',
    method() {
        return ''
    },
}
hasBoths.property() // OK
hasBoths.method() // OK

// 두 가지 방법 모두 선택적 속성 키워드인 ?를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있다.

interface OptionalReadonlyFunctions {
    optionalProperty?: () => string
    optionalMethod?(): string
}

// 메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있다.
// 이 책에서 다루는 메서드와 속성의 주요 차이점은 다음과 같다.

// - 메서드는 readonly로 선언할 수 없지만 속성은 가능하다.
// - 이번 장 후반부에서 살펴볼 인터페이스 병합은 메서드와 속성을 다르게 처리한다.
// - 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리한다.

// 타입스크립트의 향후 버전에서는 메서드와 속성 함수의 차이점에 대해 더 엄격한 옵셔을 추가할지 모른다.
// 현 시점에서 추천하는 스타일 가이드는 다음과 같다.

// - 기본 함수가 this를 참조할 수 있다는 것을 알고 있다면 메서드 함수를 사용하자. 가장 일반적으로 클래스의 인스턴스에서 사용된다.
// - 반대의 경우는 속성 함수를 사용하자.

// 이 두 가지를 혼동하거나 차이점을 이해하지 못한다고 해도 걱정하지 말자. this 스코프와 선택한 방식을 의도하지 않는 한 코드에 거의 영향을 주지 않는다.

// 7.2.4 호출 시그니처
// 인터페이스와 객체 타입은 호출 시그니처(call signature)로 선언할 수 있다.
// 호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명이다. 호출 시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있다.
// 즉, 할당 가능한 매개변수와 반환 타입을 가진 함수이다.
// 호출 시그니처는 함수 타입과 비슷하지만, 콜론(:) 대신 화살표(=>)로 표시한다.

// 다음 FunctionAlias와 CallSignature 타입은 모두 동일한 함수 매개변수와 반환 타입을 설명한다.

type FunctionAlias = (input: string) => number

interface CallSignature {
    (input: string): number
}

// 타입: (input: string) => number
const typeFunctionAlias: FunctionAlias = (input) => input.length // OK

// 타입: (input: string) => number
const typeCallSignature: CallSignature = (input) => input.length // OK

// 호출 시그니처는 사용자 정의 속성을 추가로 갖는 함수를 설명하는 데 사용할 수 있다.
// 타입스크립트는 함수 선언에 추가된 속성을 해당 함수 선언의 타입에 추가하는 것으로 인식한다.

// 다음 keepsTrackOfCalls 함수 선언에는 number 타입인 counter 속성이 주어져 FunctionWithCount 인터페이스에 할당할 수 있다.
// 따라서 FunctionWithCount 타입의 hasCallCount 인수에 할당할 수 있다.
// 다음 코드의 마지막 함수에는 count 속성이 주어지지 않았다.

interface FunctionWithCount {
    count: number
    (): void
}

let hasCallCount: FunctionWithCount

function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`)
}
keepsTrackOfCalls.count = 0
hasCallCount = keepsTrackOfCalls // OK

function doesNotHaveCount() {
    console.log('No idea!!')
}
hasCallCount = doesNotHaveCount // 'count' 속성이 '() => void' 형식에 없지만 'FunctionWithCount' 형식에서 필수입니다.
