const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Produtos = require("./database/Produtos")

connection
    .authenticate()
    .then(()=> {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro) =>{
        console.log(msgErro)
    })

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());


app.set("view engine","ejs");
app.use(express.static('public'));

//Rotas

// TRAZ OS DADOS PARA A HOME
app.get("/",(req, res)=>{
    Produtos.findAll({raw:true})
    .then(produtos =>{
        res.render("index",{
            produtos:produtos            
        })
        console.log(produtos)
    })   
})

//ESSA É A TELA create data QUE NÃO RECEBE NADA SÓ cria
app.get("/admin",(req, res)=>{
    res.render('admin/createData')
})

 
//PEGA OS DADOS E LEVA PARA O DB
app.post('/produtos',(req,res)=>{
    var title = req.body.title;
    var briefDescription = req.body.briefDescription;
    var largeDescription = req.body.largeDescription;
    var price = req.body.price;
    var category = req.body.category;
    var img = req.body.img;
  
    Produtos.create({
        title:title,
        briefDescription:briefDescription,
        largeDescription:largeDescription,
        price:price,
        category:category,
        img:img
    }).then(()=> {
        res.redirect("/")
    })
})

//Abre a view edit com todos os intens para delete ou edit
//disparado pelo bontao delete/edit dentro da view createData 
app.get("/admin/edit",(req,res)=>{
    Produtos.findAll({raw:true})
    .then(produtos =>{
        res.render("admin/edit",{
            produtos:produtos
        })      
    })  
})



//Disparado na view edit pelo botão editar traz o id
// e abre a linha do id referente e carrega só esse item na
//view editing

app.get("/teste/:id",(req, res)=>{
    var id = req.params.id
    Produtos.findOne({
        where:{
            id:id
        }
    }).then((produtos)=>{
        res.render("admin/editing",{
            produtos:produtos
        })
    })  
})


//disparado a partiro do botão delete da view edit
// vai direto para o banco e reflete na home
app.post("/admin/delete",(req,res)=>{
    let id = req.body.id;
    if(id!= undefined)
    Produtos.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/")
    })    
})

//Traz os dados editados da view editing e vai mandar para o banco de
//dados no seu respectivo id
app.post("/produtos/update", (req,res)=>{
    var title = req.body.title;
    var briefDescription = req.body.briefDescription;
    var largeDescription = req.body.largeDescription;
    var price = req.body.price;
    var category = req.body.category;
    var img = req.body.img;
    var showcase 
    var id = req.body.id;
    req.body.showcase != undefined ?showcase= true: showcase =false;  
    Produtos.update({title:title, briefDescription:briefDescription,
        largeDescription:largeDescription, price: price,category:category,
        img:img,view:showcase
    },{
        where:{
            id:id
        }
        }).then(() =>{     
            res.redirect("/")
    }).catch((err)=>{
        console.log(err)
        res.redirect("/admin/edit")
    })
})


app.listen(3000, ()=>{
    console.log("Estamos na porta 8081")
})

