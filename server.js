const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
