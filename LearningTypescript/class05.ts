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
singTwo("Ball and Chain") // 2개의 인수가 필요한데 1개의 인수만 가져왔다.
singTwo("I Will Survive!", "Higher Love") // OK
singTwo("Go Your Own Way", "The Chain", "Dreams") // 2개의 인수가 필요한데 3개의 인수를 가져왔다.

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
announceSong("Greensleeves") // OK
announceSong("Greensleeves", undefined) // OK
announceSong("Chandelier", "Sia") // OK

// 선택적 매개변수는 항상 암묵적으로 undefined가 될 수 있다.
// 이전 코드에서 singer는 string | undefined 타입으로 시작한 후 if 문에 따라 string 타입으로 좁혀진다.
// 선택적 매개변수는 | undefined를 포함하는 유니언 타입 매개변수와는 다르다. ?으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 undefined 일지라도 항상 제공되어야 한다.

function announceSongBy(song: string, singer: string | undefined) {
    /* ... */
}
announceSongBy("Greensleeves") // singer의 인수가 제공되지 않아서 에러 표시
announceSongBy("Greensleeves", undefined) // OK
announceSongBy("Chandelier", "Sia") // OK

// 함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다.
// 필수 매개변수 전에 선택적 매개변수를 위치시키면 다음과 같이 타입스크립트 구문 오류가 발생한다.

function announceSinger(singer?: string, song: string) {} // 필수 매개변수는 선택적 매개변수 뒤에 올 수 없다.

// 5.1.3 기본 매개변수
// 자바스크립트에서 선택적 매개변수를 선언할 때 =와 같이 포함된 기본값을 제공할 수 있다.
// 즉, 선택적 매개변수에는 기본적으로 값이 제공되기 때문에 해당 타입스크립트 타입에는 암묵적으로 함수 내부에 | undefined 유니언 타입이 추가된다.
// 타입스크립트는 함수의 매개변수에 대해 인수를 누락하거나 undefined 인수를 사용해서 호출하는 것을 여전히 허용한다.
// 타입스크립트의 타입 추론은 초기 변숫값과 마찬가지로 기본 함수 매개변수에 대해서도 유사하게 작동한다.
// 매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기반으로 매개변수 타입을 유추한다.

// 다음 rateSong 함수에서 rating은 number 타입으로 유추되지만, 함수를 호출하는 코드에서는 선택적 number | undefined가 된다.

function rateSong(song: string, rating = 0) {
    console.log(`${song} gets ${rating}/5 stars!`)
}
rateSong("Photograph") // OK
rateSong("Set Fire to the Rain", 5) // OK
rateSong("Set Fire to the Rain", undefined) // OK

rateSong("At Last!!", "100") // 두 번째 인자의 타입은 number | undefined 이기 때문에 string 타입은 올 수 없다.

// 5.1.4 나머지 매개변수
// 자바스크립트의 일부 함수는 임의의 수의 인수로 호출할 수 있도록 만들어진다.
// ... 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 '나머지 rest' 인수가 모두 단일 배열에 저장되어야 함을 나타낸다.
// 타입스크립트는 이러한 나머지 매개변수의 타입을 일반 매개변수와 유사하게 선언할 수 있다. 단, 인수 배열을 나타내기 위해 끝에 [] 구문이 추가된다는 점만 다르다.

function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`)
    }
}

singAllTheSongs("Alicia Keys") // OK
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face") // OK
singAllTheSongs("Ella Fitzgerald", 2000) // 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

// 5.2 반환 타입
// 타입스크립트는 지각적이다. 함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있다.
// 이번 예제에서 singSongs는 타입스크립트에서 number를 반환하는 것으로 파악된다.

// 타입: (songs: siring[]) => number
function singSongs(songs: string[]) {
    for (const song of songs) {
        console.log(`${song}`)
    }
    return songs.length
}

// 함수에 다른 값을 가진 여러 개의 반환문을 포함하고 있다면, 타입스크립트는 반환 타입을 가능한 모든 반환 타입의 조합으로 유추한다.
// 다음 코드에서 getSongAt 함수는 string | undefined를 반환하는 것으로 유추된다. 두 가지 가능한 반환값이 각각 string과 undefined이기 때문이다.
// 타입: (songs: string[], index: number) => string | undefined
function getSongAt(songs: string[], index: number) {
    return index < songs.length ? songs[index] : undefined
}

// 5.2.1 명시적 반환 타입
// 변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋다.
// 그러나 특히 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용하다.

// - 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제한다.
// - 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부한다.
// - 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있다.

// 함수 선언 반환 타입 애너테이션은 매개변수 목록이 끝나는 ) 다음에 배치된다.
// 함수 선언의 경우는 { 앞에 배치된다.

function singSongRecursive(songs: string[], count = 0): number {
    return songs.length ? singSongRecursive(songs.slice(1), count + 1) : count
}

// 화살표 함수의 경우 => 앞에 배치된다.
const singSongRecursive2 = (songs: string[], count = 0): number => (songs.length ? singSongRecursive2(songs.slice(1), count + 1) : count)

// 함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하는 경우 타입스크립트는 할당 가능성 오류를 표시한다.
// 다음 getSongRecordingDate 함수는 Date | undefined를 반환하도록 명시적으로 선언되었지만, 반환문 중 하나가 string을 반환하도록 잘못 제공하고 있다.
function getSongRecordingDate(song: string): Date | undefined {
    switch (song) {
        case "Strange Fruit":
            return new Date("April 20, 1939")
        case "GreensLeeves":
            return "unknown" //'string' 형식은 'Date' 형식에 할당할 수 없습니다.
        default:
            return undefined // OK
    }
}

// 5.3 함수 타입
// 자바스크립트에서는 함수를 값으로 전달할 수 있다.
// 즉, 함수를 가지기 위한 매개변수 또는 변수의 타입을 선언하는 방법이 필요하다.
// 함수타입 구문은 화살표 함수와 유사하지만 함수 본문 대신 타입이 있다.
// 다음 nothingInGivesString 변수 타입은 매개변수가 없고 string 타입을 반환하는 함수임을 설명한다.

let nothingInGivesString: () => string

// 다음 inputAndOutput 변수 타입은 string[] 매개변수와 count 선택적 매개변수 및 number값을 반환하는 함수임을 설명한다.
let inputAndOutput: (songs: string[], count?: number) => number

// 함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용된다.

// 예를 들어 다음 runOnSongs 함수는 getSongAt 매개변수의 타입을 index: number를 받고 string을 반환하는 함수로 선언했다.
// getSongAt을 전달하면 해당 타입과 일치하지만, longSong은 매개변수로 number 대신 string을 사용하므로 반환값을 가져오는데 실패한다.
const songs = ["Juice", "Shake It Off", "What's up"]

function runOnSongs(getSongAt: (index: number) => string) {
    for (let i = 0; i < songs.length; i += 1) {
        console.log(getSongAt(i))
    }
}
function getSongAt(index: number) {
    return `${songs[index]}`
}
runOnSongs(getSongAt) // OK

function logSong(song: string) {
    return `${song}`
}
runOnSongs(logSong)

// runOnSongs(logSong)에 대한 오류 메시지는 할당 가능성 오류의 예로 몇 가지 상세한 단계까지 제공한다.
// 두 함수를 서로 할당할 수 없다는 오류를 출력할 때 타입스크립트는 일반적으로 세 가지 상세한 단계를 제공한다.
// 각 단계는 다음과 같이 점점 자세한 내용을 담고 있다.

// - 첫 번째 들여쓰기 단계는 두 함수 타입을 출력한다.
// - 다음 들여쓰기 단계는 일치하지 않는 부분을 지정한다.
// - 마지막 들여쓰기 단계는 일치하지 않는 부분에 대한 정확한 할당 가능성 오류를 출력한다.

// 5.3.1 함수 타입 괄호
// 함수타입은 다른 타입이 사용되는 모든 곳에 배치할 수 있다.
// 여기에는 유니언 타입도 포함된다.
// 유니언 타입의 애너테이션에서 함수 반환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용한다.

// 타입은 string | undefined 유니언을 반환하는 함수
let returnStringOrUndefined: () => string | undefined

// 타입은 undefined나 string을 반환하는 함수
let maybeReturnString: (() => string) | undefined

// 5.3.2 매개변수 타입 추론
// 매개변수로 사용되는 인라인 함수를 포함하여 작성한 모든 함수에 대해 매개변수를 선언해야 한다면 번거로울 것이다.
// 다행히도 타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있다.
let singer: (song: string) => string
singer = function (song) {
    // song: string의 타입
    return `Singing: ${song.toUpperCase()}!` // OK
}

// 함수를 매개변수로 갖는 함수에 인수로 전달된 함수는 해당 매개변수 타입도 잘 유추할 수 있다.
// 예를 들어 다음 song과 index 매개변수는 타입스크립트에 따라 각각 string과 number로 유추된다.
const songs = ["Call Me", "Jolene", "The Chain"]
// song: string
// index: number
songs.forEach((song, index) => {
    console.log(`${song} is at index ${index}`)
})

// 5.3.3 함수 타입 별칭
type StringToNumber = (input: string) => number

let stringToNumber: StringToNumber
stringToNumber = (input) => input.length // OK
stringToNumber = (input) => input.toUpperCase() // 'string' 형식은 'number' 형식에 할당할 수 없습니다.

// 비슷하게 함수 매개변수도 함수 타입을 참조하는 별칭을 입력할 수 있다.
// 다음 useNumberToString 함수는 함수 타입 별칭인 NumberToString의 단일 매개변수를 갖는다.
type NumberToString = (input: number) => string

function usesNumberToString(numberToString: NumberToString) {
    console.log(`The string is: ${numberToString(1234)}`)
}
usesNumberToString((input) => `${input}! Hooray`) // OK
usesNumberToString((input) => input * 2) // 'number' 형식은 'string' 형식에 할당할 수 없습니다.

// 타입 별칭은 특히 함수 타입에 유용하다.
// 타입 별칭을 이용하면 반복적으로 작성하는 매개변수와 반환 타입을 갖는 코드 공간을 많이 절약할 수 있다.

// 5.4 그 외 반환 타입
// 지금부터 void와 never, 두 반환 타입에 대해 알아보자.

// 5.4.1 void 반환 타입
// 일부 함수는 어떤 값도 반환하지 않는다.
// 예를 들면 return 문이 없는 함수이거나 값을 반환하지 않는 return 문을 가진 함수일 경우이다.
// 타입스크립트는 void 키워드를 사용해 반환값이 없는 함수의 반환 타입을 확인할 수 있다.

// 반환 타입이 void인 함수는 값을 반환하지 않을 수 있다.
// 다음 logSong 함수는 void를 반환하도록 선언되었으므로 값 반환을 허용하지 않는다.
function logSong(song: string | undefined): void {
    if (!song) {
        return // OK
    }
    console.log(`${song}`)
    return true // 'boolean' 형식은 'void' 형식에 할당할 수 없습니다.
}

// 함수 타입 선언시 void 반환 타입은 매우 유용하다. 함수 타입을 선언할 때 void를 사용하면 함수에서 반환되는 모든 값은 무시된다.
let songLogger: (song: string) => void

songLogger = (song) => {
    console.log(`${song}`)
}
songLogger("Heart of Glass") // OK

// 자바스크립트 함수는 실젯값이 반환되지 않으면 기본으로 모두 undefined를 반환하지만 void는 undefined와 동일하지 않다.
// void는 함수의 반환 타입이 무시된다는 것을 의미하고 undefined는 반환되는 리터럴 값이다.
// undefined를 포함하는 대신 void 타입의 값을 할당하려고 하면 타입 오류가 발생한다.
function returnsVoid() {
    return
}
let lazyValue: string | undefined
lazyValue = returnsVoid()

// undefined와 void를 구분해서 사용하면 매우 유용하다.
// 특히 void를 반환하도록 선언된 타임 위치에 전달된 함수가 반환된 모든 값을 무시하도록 설정할 때 유용하다.

// 예를 들어 배열의 내장 forEach 메서드는 void를 반환하는 콜백을 받는다.
// forEach에 제공되는 함수는 원하는 모든 값을 반환할 수 있다.

// 다음 saveRecords 함수의 records.push(record)는 number(배열의 .push()에서 반환된 값)를 반환하지만, 여전히 newRecords.forEach에 전달된 화살표 함수에 대한 반환값이 허용된다.
const records: string[] = []

function saveRecords(newRecords: string[]) {
    newRecords.forEach((record) => records.push(record))
}
saveRecords(["21", "Come On Over", "The Bodyguard"])

// void 타입은 자바스크립트가 아닌 함수의 반환 타입을 선언하는데 사용하는 타입스크립트 키워드이다.
// void 타입은 함수의 반환값이 자체적으로 반환될 수 있는 값도 아니고, 사용하기 위한 것도 아니라는 표시임을 기억하자.

// 5.4.2 never 반환 타입
// 일부 함수는 값을 반환하지 않을 뿐만 아니라 반환할 생각도 전혀 없다.
// never 반환 함수는 (의도적으로) 항상 오류를 발생시키거나 무한 루프를 실행하는 함수이다.
// 함수가 절대 반환하지 않도록 의도하려면 명시적 : never 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타낸다.
// 다음 fail 함수는 오류만 발생시키므로 param의 타입을 string으로 좁혀서 타입스크립트의 제어 흐름 분석을 도와준다.
function fail(message: string): never {
    throw new Error(`Invariant failure: ${message}`)
}
function workWithUnsafeParam(param: unknown) {
    if (typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`)
    }
    // 여기에서 param의 타입은 string으로 알려진다.
    param.toUpperCase() // OK
}
