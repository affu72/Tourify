
import app from "./app.js";
// console.log(process.env.NODE_ENV);
// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));

