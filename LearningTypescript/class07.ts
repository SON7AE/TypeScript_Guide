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
