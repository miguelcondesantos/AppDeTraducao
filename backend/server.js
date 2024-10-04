const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectDB, client } = require('./db');
const Jimp = require('jimp');
const ascii = require('ascii-art');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

connectDB()

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 👉 ${PORT}, ou seja, casa do Lucca Francês `);
});

async function IMAGEM() {
    try {
        const imagem = await Jimp.read('franca.png');
        await imagem.resize(50, Jimp.AUTO).writeAsync('imagem-processada.jpg');

        ascii.image({
            filepath: `${__dirname}/imagem-processada.jpg`,
            alphabet: 'variant2'
        }, (err, convertido) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(convertido)
        });
    } catch (error) {
        console.error("Erro ao processar e mostrar imagem:", error)
    }
}
IMAGEM()

app.post('/feedback', async (req, res) => {
    try {
        const database = client.db('Tradução')
        const colecao = database.collection('Feedback')

        const { texto } = req.body;

        const feedback = {
            texto
        }

        const resultado = await colecao.insertOne(feedback)
        console.log('Deu certo :)');          
        res.status(201).send({message:"Feedback enviado com sucesso!!!!!!!!!!!!!!", texto, resultado})
    } catch (e) {
        console.log("Não deu certo :(");        
        res.status(500).send(e)
    }
})