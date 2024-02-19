# 44장. 🏚️ REST API

- **REST** : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- **REST API** : REST를 기반으로 서비스 API를 구현한 것

## 📌 44.1 REST API의 구성

- REST API는 **자원**, **행위**, **표현** 3가지 요소로 구성된다.
- REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

| 구성 요소 | 내용 | 표현 방법 |
| --- | --- | --- |
| 자원 resource | 자원 | URI(엔드포인트) |
| 행위 verb | 자원에 대한 행위 | HTTP 요청 메서드 |
| 표현 representations | 자원에 대한 행위의 구체적 내용 | 페이로드 |

<br>

## 📌 44.2 REST API 설계 원칙

REST에서 가장 중요한 기본적인 원칙은 다음 두 가지다.

### 1. URI는 리소스를 표현해야 한다.

URI는 리소스를 표현하는 데 중점을 두어야 한다.

리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. 따라서 이름에 get같은 행위에 대한 표현이 들어가서는 안 된다.

```
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

### 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다.

주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현한다.

```
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

<br>