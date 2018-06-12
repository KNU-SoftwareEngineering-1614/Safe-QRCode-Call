Custom Database

## useage

* database 실행
```
  맨 처음 실행할때는 npm install 하시고
  node app.js로 실행

  그 다음부터는
  node app.js로 실행

  port는 808임
```

* config.json
```
 데이터가 저장되는 위치를 설정할 수 있습니다.
```

* 반환 데이터
```
성공이든 실패든 모두 json 형태

성공시에는 조금씩 다름. 자세한 내용은 아래에서

 실패시 
 {
   'success' : 0
   'error' : '에러 원인'
 }
```


* 데이터 스키마
```
 데이터의 형태는 이렇습니다. 데이터를 넣을때는 이런 형식의 데이터를 넣어주세요.
 {
   'username' : 'hhm',
   'password' : '1234hh',
   'number', '010-1234-5678'
   'qr_code' : '1234v',
   'fake_num' : '050-1111-1234'
 }
```



* /database/list
```
 userList를 json 형태로 반환

  성공 시 
  {
    'success' : 1,
    'list':{ 
      'num' : 1,
     'users' : 
      [
        {
        'username' : 'hhm',
        'password' : '1234hh',
        'number', '010-1234-5678'
        'qr_code' : '1234v',
        'fake_num' : '050-1111-1234'
        }
      ]
    }
  }
  이런 형태

  체크할때 success체크 후 num도 확인해줘야함
```

* /database/getUser/:username
```
 username을 가지고 user information을 찾아서 반환해줌
 성공 시 
 {
   {'success' : 1},
   {
     'data' : {
      'username' : 'hhm',
      'password' : '1234hh',
      'number', '010-1234-5678'
      'qr_code' : '1234v',
      'fake_num' : '050-1111-1234'
      }
   }
 }
```

* /database/postUser/:username
```
  user 정보를 새로 만들거나 업데이트 할 때

  body를 데이터 스키마에 맞게 해서 json형태로 해서 post해야함.
  test할때는 postman을 쓰면 편함.

  성공 시 
    {'success' : 1}
  
```

* /database/deleteUser/:username
```
 user 정보를 삭제함

 성공 시 
    {'success' : 1}
```

* /database/fakeNum/:qr_code
```
 qr_code를 가지고 fake_num을 찾음

 성공 시 
 {"fake_num" : "가상번호"}
```
