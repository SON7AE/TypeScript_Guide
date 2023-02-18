// 3장 - 유니언과 리터럴

// 타입스크립트가 해당 값을 바탕으로 추론을 수행하는 두 가지 핵심개념을 소개하고자 한다.
// - 유니언 : 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
// - 내로링 : 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

// 종합하자면 유니언과 내로잉은 다른 주요 프로그래밍 언어에서는 불가능하지만 타입스크립트에서는 가능한 '코드 정보에 입각한 추론'을 해내는 강력한 기능이다.

// 3.1 유니언 타입
// 다음 mathematician 변수를 보겠다.

let mathematician = Math.random() > 0.5 ? undefined : 'Mark Goldberg'

// 위 변수 mathematician은 어떤 타입일까?
// 둘 다 잠재적인 타입이긴 하지만 무조건 undefined 이거나 혹은 무조건 string인 것도 아니다.
// 즉, mathematician은 undefined이거나 string일 수 있다. '이거 혹은 저거'와 같은 타입을 유니언이라고 한다.
// 유니언 타입은 값이 정확히 어떤 타입인지 모르지만, 두개 이상의 옵션 중 하나라는 것을 알고 있는 경우에 코드를 처리하는 훌륭한 개념이다.

// 타입스크립트는 가능한 값 또는 구성 요소 사이에 | (수직선) 연산자를 사용해 유니언 타입을 나타낸다.
// 위에 선언한 mathematician은 string | undefined 타입으로 간주된다.

// 3.1.1 유니언 타입 선언
// 변수의 초깃값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용한다.
// 다음 예제에서 thinker의 초깃값은 null이지만 잠재적으로 null 대신 string이 될 수 있음을 알려준다.
// 명시적으로 string | null 타입 애너테이션은 타입스크립트가 thinker의 값으로 string 타입의 값을 할당할 수 있음을 의미한다.

let thinker: string | null = null

if (Math.random() > 0.5) {
    thinker = 'Susanne Langer' // OK
}

// 유니언 타입 선언은 타입 애너테이션으로 타입을 정의하는 모든 곳에서 사용할 수 있다.
// 유니언 타입 선언의 순서는 중요하지 않다. 타입스크립트에서는 boolean | number 와 number | boolean 모두 똑같이 취급한다.

// 3.1.2 유니언 속성
// 값이 유니언 타입일 때 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.
// 유니언 외의 타입에 접근하려고 하면 타입 검사 오류가 발생한다.

let physicist = Math.random() > 0.5 ? 'Marie Curie' : 84
physicist.toString() // OK

physicist.toUpperCase() // 공통적으로 있는 속성만 사용할 수 있다.
physicist.toFixed() // 공통적으로 있는 속성만 사용할 수 있다.

// 유니언 타입으로 정의된 여러 타입 중 하나의 타입으로 된 값의 소성을 사용하려면 코드에서 값이 보다 구체적인 타입 중 하나라는 것을 타입스크립트에 알려야 한다.
// 이 과정을 내로잉이라고 한다.

// 3.2 내로잉
// 내로잉 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
// 타입스크립트가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게되면 값을 더 구체적인 타입으로 취급한다.
// 타입을 좁히는 데 사용할 수 있는 논리적 검사를 타입가드(Type Guard)라고 한다.

// 3.2.1 값 할당을 통한 내로잉
// 변수에 값을 직접 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.
// 다음 admiral 변수는 초기에 number | string으로 선언했지만, 'Grace Hopper' 값이 할당된 이후 타입스크립트는 admiral 변수가 string 타입이라는 것을 알게 된다.

let admiral: string | number

admiral = 'Grace Hopper'
admiral.toUpperCase() // OK: string
admiral.toFixed() // toFixed() 메서드는 숫자를 고정 소수점 표기법(fixed-point notation)으로 표시합니다.

// 다음 코드에서 invertor는 number | string 타입으로 선언되었지만 초깃값으로 문자열이 할당되었기 때문에 타입스크립트는 즉시 string 타입으로 바로 좁혀졌다는 것을 알고 있다.

let inventor: number | string = 'Hedy Lamarr'
inventor.toUpperCase() // OK: string
inventor.toFixed()

// 3.2.2 조건 검사를 통한 내로잉
// 일반적으로 타입스크립트에서는 변수가 알려진 값과 같은지 확인하는 if문을 통해 변수의 값을 좁히는 방법을 사용한다.
// 타입스크립트는 if문 내에서 변수가 알려진 값과 동일한 타입인지 확인한다.

// scientist: number | string 타입
let scientist = Math.random() > 0.5 ? 'Rosalind Franklin' : 51

if (scientist === 'Rosalind Franklin') {
    // scientist: string의 타입
    scientist.toUpperCase()
}
// scientist: number | string의 타입
scientist.toUpperCase()

// 3.2.3 typeof 검사를 통한 내로잉
// 타입스크립트는 직접 값을 확인해 타입을 좁히기도 하지만, typeof 연산자를 사용할 수도 있다.
// scientist 예제와 유사하게 다음 if 문에서 typeof researcher가 'string'인지 확인해 타입스크립트에 researcher의 타입이 string임을 나타낸다.

let researcher = Math.random() > 0.5 ? 'Rosalind Franklin' : 51

if (!(typeof researcher === 'string')) {
    researcher.toFixed() // OK: number
} else {
    researcher.toUpperCase() // OK: string
}

// 이러한 코드 스니펫은 타입 내로잉에서도 지원되는 삼항 연산자를 이용해 다시 작성할 수 있다.
typeof researcher === 'string' ? researcher.toUpperCase() : researcher.toFixed()

// 3.3 리터럴 타입
// 두 개 이상의 잠재적 타입이 될 수 있는 값을 다루기 위해 유니언 타입과 내로잉을 살펴봤다.
// 다음으로 리터럴 타입을 알아보자. 리터럴 타입은 좀 더 구체적인 버전의 원시타입이다.
