/* process.stdin
  .pipe(process.stdout) */

//process.stdin -> tudo que receber de entrada (cada pedaço)
//pipe -> encaminhar para algum lugar
//process.stdout -> saída do processo
//Nesse caso, tudo o que essa strem receber, ela vai encaminhar para a saída

//Buffer é o tipo de dado que o Node.js usa para transitar dados entre streams

import { Readable, Writable, Transform } from 'node:stream';

//uma classe que extende Readable tem um único método chamado _read
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      //o método push é usado para enviar respostas para quem está consumindo a stream
      if (i > 100) {
        this.push(null); //indica que a stream foi totalmente consumida
      } else {
        const buf = Buffer.from(String(i));
        
        this.push(buf);
      }
    }, 1000);
  }
}

//uma stream de escrita recebe dados de uma stream de leitura e faz algum processamento com esses dados,
//não deve retornar nada, não pode passar os dados para uma outra stream
//uma classe que extende Writable tem um único método chamado _write
class MultiplyByTenStream extends Writable {
  //chunk -> cada pedaço processado pela stream (vindo da stream de leitura)
  //enconding -> como o dado está codificado
  //callback ->  função que a stream deve chamar assim que terminar de processar o dado
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

//uma stream de transformação serve para transformar um dado em outro
//uma classe que extende Transform tem um único método chamado _transform
class InverseNumberStream extends Transform {
  //chunk -> cada pedaço processado pela stream (vindo da stream de leitura)
  //enconding -> como o dado está codificado
  //callback ->  função que a stream deve chamar assim que terminar de processar o dado
     //primeiro parâmetro: algum erro; caso não tenha, então pode colocar null
     //segundo parâmetro: o dado transformado (precisa ser um buffer)
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTwoStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * 2;

    callback(null, Buffer.from(String(transformed)));
  }
}

//é possível ter múltiplos encaminhamentos (pipe)
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

/* new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTwoStream())
  .pipe(process.stdout); */