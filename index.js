const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  api = require("./api"),
  { sequelize } = require("./models"),
  cors = require("cors"),
  models = require("./models")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static("public"))
app.use(express.static("views"));
app.set('view engine','ejs');
app.set('views', './views/')

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공")
  })
  .catch((err) => {
    console.error(err)
  })

app.use("/api", api)
app.get("/", (req, res) => {
  res.send(`SERVER ON PORT  : ${port}`)
})

// app.get('/post', async function (req, res) {
//   const data = await models.Board.findAll();
//   res.render('post.ejs', {data : data});
// });
app.get('/post2', async function (req, res, next) {
  const data = await models.Board.findAll();
  if(data){
    for(let Board of data){
      let result2 = await models.Board.findOne({
        include: {
          model :models.reply,
          where : {
            idx : Board.idx
          }
        }
      })
      if(result2){
        Board.replies = result2.replies
      }
    }
  }
  res.render('post2', {data : data});
});

app.get('/postView/:id',function(req,res,next){
  const idx = req.params.id;
  models.Board.findOne({
    where : {idx : idx}
  })
  .then(result => {
    res.render('postView',{board:result})
  })
  .catch( err =>{
    console.log("데이터조회실패");
  })
})
//글쓰기
app.get('/post2_insert',function(req,res){
  res.render('write.ejs')
});
app.post('/write',function(req,res,next){
const body = req.body;
models.Board.create({
  id : body.id,
  title : body.title,
  content : body.content
})
.then(result => {
  res.redirect("/post2")
})
.catch( err => {
  console.log("데이터 추가 실패");
})
})

app.post("/comment/:idx", function(req, res, next){
  let idx = req.params.idx;
  let body = req.body;

  models.reply.create({
    idx: idx,
    writer: body.replywriter,
    content: body.replycontent
  })
  .then( results => {
    res.redirect("/post2");
  })
  .catch( err => {
    console.log(err);
  });
});

const port = 8080
app.listen(port, () => console.log(`SERVER ON PORT ${port}`))
