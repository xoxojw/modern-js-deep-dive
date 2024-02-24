# 46장. 🪜 제너레이터와 async/await

## 📌 46.1 제너레이터란?

ES6에서 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요할 때 재개할 수 있는 특수한 함수이다.

- 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
    - 양도(yield)할 때 yield한 제너레이터 함수 내부 로직이 실행 → 다음 yield를 만나면 함수 실행을 일시 중지하고 다음 호출을 기다림
- 제너라이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
    - 제너레이터 함수는 함수 호출자에게 결과값을 전달할 수 있고, 함수 호출자로부터 값을 전달받을 수도 있음
- 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
    - 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 객체를 반환

### 이터러블

- 반복가능한 데이터 구조
- 이터러블 객체는 `Symbol.iterator` 속성을 가짐
    - 이 속성은 함수를 가리키며 이 함수는 호출될 때 이터레이터를 반환
- 이터러블의 예시 : 배열, 문자열, Map, Set

### 이터레이터

- 이터러블 객체의 요소들을 순회하는 포인터이자 `next()`라는 메서드를 가지고 있는 객체
    - 이 메서드를 통해 이터러블 객체의 요소에 접근
- `next()` 메서드는 객체를 반환하며, 이 객체는 두 개의 속성을 가짐
    - `value` : 현재 위치의 요소 값
    - `done` : 이터레이터가 모든 요소를 순회했는지를 나타내는 불리언 값

```jsx
let arr = [1, 2, 3];
let iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

<br>

## 📌 46.2 제너레이터 함수의 정의

제너레이터 함수를 정의하는 방법은 다음을 제외하면 일반 함수를 정의하는 방법과 같다.

- `function*` 키워드로 선언하고, 하나 이상의 `yield` 표현식을 포함
- 화살표 함수로 정의할 수 없음
- new 연산자와 함께 생성자 함수로 호출할 수 없음

```jsx
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```

```jsx
// *(애스터리스크)의 위치는 function 키워드와 함수 이름 사이라면 어디든 상관없음

function* genFunc() { yield 1; } // 권장
function * genFunc() { yield 1; }
function *genFunc() { yield 1; }
function*genFunc() { yield 1; }
```

<br>

## 📌 46.3 제너레이터 객체

제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라, **제너레이터 객체를 생성해 반환**한다.

제너레이터 함수가 반환한 제너레이터 객체는 **이터러블이면서 동시에 이터레이터**이다.

<br>

## 📌 46.4 제너레이터의 일시 중지와 재개

제너레이터 함수는 일반 함수처럼 한번에 코드 블록의 모든 코드가 실행되는 것이 아니라, yield 표현식까지만 실행한다.

yield 키워드로 제너레이터 함수 실행을 일시 중지시키고, next 메서드를 호출하여 함수 실행을 재개한다.

yield 키워드는 일시 중지뿐만 아니라 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.

```jsx
generator.next() → yield → generator.next() → yield → ... → generator.next() → return
```

<br>

## 📌 46.5 제너레이터의 활용

### 이터러블의 구현

제너레이터 함수를 사용하면 무한 이터러블을 생성하는 함수를 구현할 수도 있다. ex. 무한 피보나치 수열 등

### 비동기 처리

next 메서드와 yield 표현식을 통해 함수 호출자와 상태를 주고받을 수 있다는 특성을 활용하여 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다.
→ 프로미스 후속처리 메서드 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있다.

실제로 async/await 이전에는 co 라이브러리와 함께 사용되어 비동기 흐름 제어를 단순화하는데 사용하기도 했다.

<br>

## 📌 46.6 async/await

ES8(ECMAScript 2017)에서 도입된 개념으로 async/await를 사용하면 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기처럼 동작하도록 구현할 수 있다.

async/await는 프로미스를 기반으로 동작한다. 하지만 async/await를 사용하면 프로미스의 then/catch/finally 후속 처리 메서드 없이도 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

### async 함수

await 키워드는 반드시 async 함수 내부에서 사용해야 한다.

async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다.

- async 함수가 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve하는 프로미스를 반환

### await 키워드

await 키워드는 프로미스가 settled 상태가 될 때 까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.

await 키워드는 반드시 프로미스 앞에서 사용해야 한다.

### 여러 개의 비동기 처리

- 여러 개의 비동기 처리가 서로 연관이 없고 개별적으로 수행되는 경우
    - 전체 프로미스 앞에 1개의 await 키워드만 붙여주면 됨
    
    ```jsx
    async function foo() {
      const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000))
      ]);
    
      console.log(res); // [1, 2, 3]
    }
    
    foo(); // 약 3초 소요된다.
    ```
    
- 여러 개의 비동기 처리가 서로 연관되어 순차적으로 수행되는 경우
    - 각 비동기 처리문 앞에 await 키워드를 붙여주어야 함
    
    ```jsx
    async function bar(n) {
      const a = await new Promise(resolve => setTimeout(() => resolve(n), 3000));
      // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요하다.
      const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 2000));
      // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요하다.
      const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 1000));
    
      console.log([a, b, c]); // [1, 2, 3]
    }
    
    bar(1); // 약 6초 소요된다.
    ```
    

### 에러 처리

비동기 처리를 위한 콜백 패턴의 단점 중 하나는 에러 처리가 곤란하다는 것이었다. (45.1.2 에러 처리의 한계 참고)

- 에러는 호출자 방향으로 전파됨 → 즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시되어 대기 중인 실행 컨텍스트 방향)으로 전파됨
- 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try … catch문을 사용해 에러를 캐치할 수 없음

하지만 async/await에서 에러 처리는 try … catch문을 사용할 수 있다.

- 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있으므로 호출자가 명확하기 때문

<br>