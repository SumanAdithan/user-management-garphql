import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import { schema } from './schema.js';
import cors from 'cors';

const graphQLPlayground = expressPlayground.default;
const app = express();

app.use(cors());
app.use('/graphql', createHandler({ schema, graphiql: true }));
app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }));

app.listen(8000, () => {
    console.log('server is running at 8000');
});
