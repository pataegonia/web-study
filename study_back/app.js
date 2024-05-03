const express = require('express');
const helmet =  require("helmet");
// express를 사용할때 express라는 변수에 할당
const app =  express();
const ejs = require("ejs");
const db = require("./model/db")

app.set('view engine', 'ejs');
// view파일을 사용할때 ejs라는 엔진을 사용할 것이다.
// 그 파일의 확장자는 ejs가 됨
// 좀 헷갈리니까 나중에 chap2 마지막 강의 한번 더보기
app.set('views', './views');
// 내가 사용할 view파일은 옆에 주소에 있다.
app.use('/public',express.static(__dirname + '/public'));
// ?

// app.use(helmet());
// 사이트에 요청을 하고, 이후 응답이 오는 사이에 있는 것이 middleware이다.
// middleware는 요청을 받고 응답을 하기 전에 만족 시켜야 하는 일종의 규칙이다.
//  
app.use(express.json());
app.use(express.urlencoded());
// post방식으로 하기 위해 꼭 넣어줘야하는 코드

const mainRouter = require('./router/mainRouter')
// mainRouter에서 내보낸 것을 가져오는 코드
app.use('/', mainRouter)
//app.use('/test',mainRouter);
// mainRouter에서 주소를 가져올 때 middleware로 조건을 /test라는 주소를
// 가지고 있어야지만 접속하게 함


app.listen(3000, function(req,res){

    db.sequelize.sync({force:false});
    console.log("server on")
})
//listen은 컴퓨터를 키는 역할 3000번 포트에 키고, 켜지면 func을 실행