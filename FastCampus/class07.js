// 조건문

// if문에서 else 조차 생략되고 if문만 있을 때, 코드가 한 줄이면 브레이스를 생갹하여 작성할 수도 있으나
// 처음부터 1줄의 코드만 있다하더라고 브레이스를 생략하지 않는 컨벤션을 작성하는 습관을 들이자.

// 기본적으로 형 변환, 타입 캐스트 룰에 의해서
// 0은 거짓으로 판정하고, 그 외 나머지 숫자는 참으로 판정한다.
// 문자열은 모두 참으로 판정하고, 문자열이 ""처럼 비어있을 땐 거짓으로 판정한다.
// null - 거짓으로 판정한다.
// undefined - 거짓으로 판정한다.
// 모든 객체는 참으로 판정한다. 안에 값이 비어있든 속성이 비어있든 간에 상관없이 참으로 판정한다.

// ---------- ---------- ---------- ---------- ----------

// switch문
// case문의 특징은 이 값을 평가해서 일치되는 케이스까지 이동한 다음에 그 아래 코드를 바로 실행한다.

// 코드의 중단점을 브레이크로 명확하게 설정을 해줘야 한다.
