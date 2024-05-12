const express = require("express");
const router = express.Router();
const db = require('../model/db');
const { where } = require("sequelize");

const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");
const url = "https://finance.naver.com/sise/lastsearch2.nhn"

router.get("/crawling", function(req, res){
    
    axios({url:url, method:"GET",responseType:"arraybuffer"}).then(function(html){
        const content = iconv.decode(html.data, "EUC-KR").toString()
        const $ = cheerio.load(content)
        
        const table = $(".type_5 tr td")
        table.each(function(i,tag){
            console.log($(tag).text().trim())
        })

        res.send({success:200});

    })

    
})

router.get("/excel", function(req, res){
    res.render("excel")
})

router.get("/excel/down",function(req,res){
    let = excel_data = [{"A":1, "B":2, "C":3, "D":4}]
    res.xls('data.xlsx', excel_data);
})

router.get("/",function(req, res){

//    let query = req.query;
//  console.log(query);
//  res.send({"key":"value"});
// get방식으로 데이터를 넘겨줄 때 /?key=val&key2=val2 이런 식으로 넘길 때 
// 위와 같은 방식으로 하면 dic형태로 query에 저장됨
    res.render('main',{title:"영화리뷰 사이트"});
    // render는 이미지파일을 전달해 줄 때 사용
})
// get은 주소를 만들어줌, "/"에 주소, func에 주소에 들어가면 실행할 함수, 
// 사용자의 요청은 req에 응답은 res에 담김
// 모든 웹페이지 홈에는 "/"가 숨겨져 있음 여기서 주소에 "/"를 넣은 것은 홈을
// 만든 것


router.post("/review/create", function(req,res){
    let movie_id = req.body.movie_id;
    let review = req.body.review;

    if(movie_id == "" || movie_id == 0){
        res.send({success:400})
    }else{
        db.reviews.create({
            movie_id:movie_id,
            review:review
        }).then(function(result){
            res.send({success:200});
        })
    }
})

router.get("/review/read", function(req, res){
    let movie_id = req.query.movie_id;

    db.reviews.findAll({where:{movie_id:movie_id}}).then(function(result){
        res.send({success:200, data:result});
    })
})

router.get("/about", function(req, res){
    res.send('About page');
    //send는 문자 숫자열등의 데이터를 전달할 때 사용
})

router.post("/postapi",function(req, res){
    let body = req.body;
    console.log(body);
    res.send("this is post");
})
// post는 위와 같은 방식으로 주소로 넘기는 것이 아닌 코드 내에서 이루어 져야함

router.get("/data/create", function(req,res){
    let user_id = parseInt(Math.random()*10000);
    db.users.create({user_id:user_id}).then(function(result){
        res.send({success:200});
    })
})

router.get("/data/read",function(req,res){
    db.users.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})

router.post("/data/update",function(req,res){
    let target_id =req.body.target_id;
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
        res.send({success:200});
    })
})

router.post("/data/delete",function(req,res){
    let target_id = req.body.target_id;
    db.users.destroy({where:{user_id:target_id}}).then(function(result){
        res.send({success:200});
    })
})

module.exports = router;
// 라우터라는 주소가 담겨있는 변수를 밖(app.js)으로 내보내 주는 것
