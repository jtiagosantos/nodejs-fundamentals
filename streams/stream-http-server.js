import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

//todas as portas de entrada e saída no Node.js são streams
//req -> ReadableStream
//res -> WritableStream

//consumo de chunk por chunk (ótima opção pora quando o contexto permite processar chunk por chunk)
/* const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res);
}); */


//consumo de uma stream completa (opção para quando o contexto só permite que os chunks sejam lidos todos juntos de uma única vez)
//await em um contexto de streams vai esperar cada chunk ser retornado
const server = http.createServer(async (req, res) => {
  const buffers = [];

  //o await vai garantir que só vai continuar a execução do código após ler todos os chunks
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  //Buffer.concat faz a junção que múltiplos buffers (chunks, nesse caso) para criar um conteúdo apenas
  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  res.end(fullStreamContent);
});

server.listen(3334);