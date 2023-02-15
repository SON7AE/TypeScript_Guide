// 2. 타입 시스템

// 2.1 타입의 종류
// '타입'은 자바스크립트에서 다루는 값의 형태에 대한 설명이다.
// 여기서 '형태'란 값에 존재하는 속성과 메서드 그리고 내장되어 있는 typeof 연산자가 설명하는 것을 의미한다.
// 타입스크립트의 가장 기본적인 타입은 자바스크립트의 일곱가지 기본 원시 타입(primitive type)과 동일하다.

// null
// undefined
// boolean
// string
// number
// bigint
// symbol

// 2.1.1 타입 시스템
// 타입 시스템은 프로그래밍 언어가 프로그램에서 가질 수 있는 타입을 이해하는 방법에 대한 규칙 집합이다.
// 기본적으로 타입스크립트의 타입 시스템은 다음과 같이 작동한다.

// - 코드를 읽고 존재하는 모든 타입과 값을 이해한다.
// - 각 값이 초기 선언에서 가질 수 있는 타입을 확인한다.
// - 각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인한다.
// - 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류를 표시한다.

// 2.1.2 오류 종류
// 타입스크립트를 작성하는 동안 가장 자주 접하게 되는 오류 두 가지는 다음과 같다.
// - 구문오류 : 타입스크립트가 자바스크립트로 변환되는 것을 차단할 경우
// - 타입오류 : 타입 검사기에 따라 일치하지 않는 것이 감지된 경우

// 구문오류
// 구문오류는 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지할 때 발생한다.
// 이는 타입스크립트가 타입스크립트 파일에서 자바스크립트 파일을 올바르게 생성할 수 없도록 차단한다.

// 타입오류
// 타입오류는 타입스크립트의 타입 검사기가 프로그램의 타입에서 오류를 감지했을 때 발생한다.
// 오류가 발생했다고 해서 타입스크립트 구문이 자바스크립트로 변환되는 것을 차단하지는 않는다.
// 하지만 코드가 실행되면 무언가 충돌하거나 예기치 않게 작동할 수 있음을 나타낸다.

// 2.2 할당 가능성
// 타입스크립트는 변수의 초깃값을 읽고 해당 변수가 허용되는 타입을 결정한다.
// 나중에 해당 변수에 새로운 값이 할당되면, 새롭게 할당된 값의 타입이 변수의 타입과 동일한지 확인한다.
// 타입스크립트에서 함수 호출이나 변수에 값을 제공할 수 있는지 여부를 확인하는 것을 '할당 가능성'이라고 한다.
// 즉, 전달된 값이 예상된 타입으로 할당 가능한지 여부를 확인한다.

'Type...is not assignable to type...'

// 위 형태의 오류는 타입스크립트 코드를 작성할 때 만나게 되는 가장 일반적인 오류 중 하나이다.
// 해당 오류 메시지에서 언급된 첫 번째 type은 코드에서 변수에 할당하려고 시도하는 값이다.
// 두 번째 type은 첫 번째 타입, 즉, 값이 할당되는 변수이다.
