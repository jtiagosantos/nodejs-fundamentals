import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Query Parameters 
//  -> Parâmetros nomeados enviados na própria url da requisição. Ex: http://localhost:3333/users?userId=1
//  -> URL Stateful => Filtros para resposta do Back-end, Paginação, Não-Obrigatórios, Busca

// Route Parameteres
//  -> Parâmetros não-nomeados enviados na própria url da requisição. Ex: http://localhost:3333/users/1
//  -> Identificação de recurso (geralmente)

// Request Body
//  -> Envio de informações de um formulário

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  req.url = decodeURIComponent(url);

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  res.writeHead(404).end('Route not found');
});

server.listen(3333);