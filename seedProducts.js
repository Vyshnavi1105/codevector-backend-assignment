const pool = require('./db');

const categories = [
  'Electronics',
  'Fashion',
  'Accessories',
  'Books',
  'Home'
];

async function seedProducts() {
  try {
    console.log('Deleting old products...');

    await pool.query('TRUNCATE TABLE products RESTART IDENTITY');

    const batchSize = 5000;
    const totalProducts = 200000;

    console.log('Generating 200000 products...');

    for (let start = 1; start <= totalProducts; start += batchSize) {

      let values = [];
      let placeholders = [];
      let index = 1;

      for (
        let i = start;
        i < start + batchSize && i <= totalProducts;
        i++
      ) {
        const category =
          categories[i % categories.length];

        placeholders.push(
          `($${index++}, $${index++}, $${index++})`
        );

        values.push(
          `Product ${i}`,
          category,
          Math.floor(Math.random() * 10000) + 100
        );
      }

      await pool.query(
        `
        INSERT INTO products
        (name, category, price)
        VALUES
        ${placeholders.join(',')}
        `,
        values
      );

      console.log(
        `${Math.min(
          start + batchSize - 1,
          totalProducts
        )} products inserted`
      );
    }

    console.log(
      '200000 products inserted successfully'
    );

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();