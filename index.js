//importando módulo
var conexao = require("./conexaobanco");

//Rotas
var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json()); //pega o que foi digitado transforma os dados em html (objeto)

app.use(bodyParser.urlencoded({ extended: true })); //aprova, dá o ok

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/");
});

// Rota para processar o formulário
app.post("/", (req, res) => {
  // Aqui você pode acessar os dados enviados pelo formulário
  const {
    nome,
    sobrenome,
    email,
    whatsapp,
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  } = req.body;

  //prevenindo SQL injection
  var sql =
    "INSERT INTO clientes(nome, sobrenome, email, whatsapp, cep, logradouro, bairro, cidade, estado) VALUES (?,?,?,?,?,?,?,?,?)";

  conexao.query(
    sql,
    [nome, sobrenome, email, whatsapp, cep, logradouro, bairro, cidade, estado],
    function (error, result) {
      if (error) throw error;
      //res.send("Estudante cadastrado com sucesso! " +result.insertId);
      res.redirect("/");
    }
  );
});

// Você pode salvar esses dados em um banco de dados ou realizar outras ações

// Resposta para o usuário (pode ser uma página de confirmação ou um redirecionamento)

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
