const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configura o CORS para permitir requisições do seu front-end (Ex: http://127.0.0.1:5500)
// Se você está rodando localmente, use * para liberar TUDO, mas em produção, especifique o domínio.
app.use(cors());

// Rota de proxy para consulta de CNPJ
app.get('/cnpj/:cnpj', async (req, res) => {
    const cnpj = req.params.cnpj.replace(/\D/g, ''); // Limpa o CNPJ
    
    // URL da API que você prefere (ReceitaWS, por exemplo)
    const apiURL = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;

    try {
        // A requisição AGORA É FEITA PELO SERVIDOR, que não tem restrição de CORS.
        const response = await axios.get(apiURL);
        
        // Retorna a resposta da API externa diretamente para o seu Front-end
        return res.json(response.data);

    } catch (error) {
        console.error('Erro ao consultar CNPJ:', error.message);
        // Em caso de erro (ex: 404, rate limit), repassa uma mensagem de erro
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ status: 'ERROR', message: 'Falha interna do servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server rodando em http://localhost:${PORT}`);
    console.log('Use Ctrl+C para parar.');
});

// Para iniciar: node server.js