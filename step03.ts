// 3. 코드 생성과 타입이 관계없음을 이해하기

// 런타임에는 타입 체크가 불가능하다.
interface Square {
    width: number;
}
interface Rectangle extends Square {
    height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        // 'Rectangle'은(는) 형식만 참조하지만, 여기서는 값으로도 사용되고 있다.
        return shape.width * shape.height; // 'Shape' 형식에 'height' 속성이 없다.
    } else {
        return shape.width * shape.width;
    }
}

// 타입 정보를 유지하는 또 다른 방법으로는 런타임에 접금 가능한 타입 정보를 명시적으로 저장하는 '태그' 기법이 있다.
interface Square {
    kind: 'square';
    width: number;
}
interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}
type Shape2 = Square | Rectangle;

function calculateArea2(shape: Shape) {
    if (shape.kind === 'rectangle') {
        shape; // 타입이 Rectangle
        return shape.width * shape.height;
    } else {
        shape; // 타입이 Square
        return shape.width * shape.width;
    }
}
