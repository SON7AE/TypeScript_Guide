// 반복문

// 반복할 소스 데이터로 배열을 만들어보자.
const arr = ['a', 'b', 'c', 'd']

// 가장 많이 쓰는 반복문인 for
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}

let i = 0
while (i < arr.length) {
    console.log(arr[i])
    i++
}

i = 0
do {
    console.log(arr[i])
    i++
} while (i < arr.length)

// for .. of 구문 : 배열에서의 반복을 위해 순회할 때 / 배열의 특정 위치에 관심이 없는 상황에서 굉장히 쓰기 편한다.
for (const item of arr) {
    console.log(item)
}

// for ... in 구문 : arr에 있는 키 값 즉, 위치 값을 넘겨준다.
// for ... in 구문 : 배열을 순회하는 용도로 사용하기에는 적절하지 않다.
// 배열이든 객체든 그 키의 값을 하나씩 꺼내올 때 사용하는 반복문이다.
for (const index in arr) {
    console.log(arr[index])
}

const obj = {
    color: 'red',
    width: 200,
    height: 200,
}

for (const key in obj) {
    console.log(key) // 'color', 'width', 'height'
}
