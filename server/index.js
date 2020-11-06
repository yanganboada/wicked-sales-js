require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(res => res.json(res.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
  `;

  db.query(sql)
    .then(res => {
      const products = res.rows;
      res.status(200).json(products);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = `
    select *
      from "products"
      where "productId" = $1
  `;

  const values = [req.params.productId];

  db.query(sql, values)
    .then(res => {
      if (res.rowCount === 0) {
        next(new ClientError(`"productId" ${productId} does not exist in the database`, 404));
      } else {
        res.status(200).json(res.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {

  if (!req.session.cartId) {
    res.status(200).json([]);
  } else {
    const sql = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartId" = $1
      `;

    const values = [req.session.cartId];

    db.query(sql, values)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
}
);

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  } else {
    const sql = `
    select "price"
      from "products"
     where "productId" = $1
  `;

    const values = [productId];

    db.query(sql, values)
      .then(result => {
        if (!result.rows[0]) {
          throw new ClientError(`productId ${productId} is not in database`, 400);
        } else {

          const price = result.rows[0].price;

          if (req.session.cartId) {
            return { cartId: req.session.cartId, price };
          } else {
            const sql = `
            insert into "carts" ("cartId", "createdAt")
                 values (default, default)
              returning "cartId"
          `;
            return (
              db.query(sql)
                .then(result => {
                  const cartId = result.rows[0].cartId;
                  const newCart = {
                    cartId,
                    price
                  };
                  return newCart;
                })
            );
          }
        }
      })
      .then(result => {
        req.session.cartId = result.cartId;

        const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;

        const values = [result.cartId, productId, result.price];

        return (
          db.query(sql, values)
            .then(result => result.rows[0])
        );
      })
      .then(result => {

        const sql = `
        select "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
             from "cartItems" as "c"
             join "products" as "p" using ("productId")
            where "c"."cartItemId" = $1
      `;

        const values = [result.cartItemId];

        return (
          db.query(sql, values)
            .then(result => {
              return res.status(201).json(result.rows[0]);
            })
        );
      })
      .catch(err => next(err));

  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
