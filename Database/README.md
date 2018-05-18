Custom Database

## useage

* config.json
```
 데이터가 저장되는 위치를 설정할 수 있습니다.
```

* dbClient require
```
 require로 dbClient를 가져옵니다.

 예로 QRCodeGenerator/routes 안의 파일에서는
 var DBClient = require('../../../Database/dbClient')로 가져오면 됩니다.
```

* DBClient 객체 만들기
```
 DBClient 객체를 만듭니다.
 
 var dbClient = new DBClient();
```

* 임시번호 들고오기
```
 속성이름과 값을 넣으면 거기에 매칭되는 임시번호를 들고옵니다.
 속성은 id, QRCode 등이 있습니다.
 
 var temporaryNumber = dbClient.getTemporaryNumber('id', 'hhm');
```

* QRCode 들고오기
```
 속성 이름과 값을 넣으면 거기에 매칭되는 QR코드를 들고옵니다.
 속성은 id, QRCode 등이 있습니다.

 var qr_code = dbClient.getQRCode('id', 'hhm');
```

* 데이터 post
```
 데이터를 post 할 때는
 dbClient.postData(data) 해주시면 됩니다.
 argument로 들어가는 data의 스키마는 아래와 같아야합니다.
```

* 데이터 스키마
```
 데이터의 형태는 이렇습니다. 데이터를 넣을때는 이런 형식의 데이터를 넣어주세요.
 {
   'id' : 'hhm',
   'pw' : '1234hh',
   'phoneNum', '010-1234-5678'
   'QRCode' : '1234v',
   'fakeNum' : '050-1111-1234'
 }
```
