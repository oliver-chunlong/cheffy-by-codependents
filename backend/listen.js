const app = require('./app');
const run = require('./utils/updateRecipeLabels.js');

const PORT = process.env.PORT || 3000;

run().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to update recipe labels:', err);
  process.exit(1);
});
