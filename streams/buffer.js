//buffer -> representação de um espaço na memória do computador, espaço
//esse utilizado para transitar dados rapidamente

//Com buffers é possível salvar na memória, bem como ler da memória, de forma
//rápida, o que traz muita performance para o processamento.
//Por isso esse formato de dados é utilizado ao trabalhar com streams

const buf = Buffer.from('hello');

console.log(buf); //<Buffer 68 65 6c 6c 6f> -> em hexadecimal
console.log(buf.toJSON()); //{ type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] } -> em decimal