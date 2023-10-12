import app from "./app";

//obtendo as variáveis de ambiente
const port = parseInt(`${process.env.PORT}`);

// Startando o server
app.listen(port, () => {
    console.log(`## INFO ## - Start Server in port ${port}`);
});