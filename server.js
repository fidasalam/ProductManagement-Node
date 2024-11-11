const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const logger = require("./utils/logger");
const uploadRouter = require("./utils/upload")
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRouter");
const inventoryRoutes = require("./routes/inventoryRouter");
const warehouseRoutes = require("./routes/warehouseRouter");
const invoiceRouter = require("./routes/invoiceRouter");
const saleItemRouter = require("./routes/saleItemRouter");
const ledgerRouter = require("./routes/ledgerRouter");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) }}));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/invoices", invoiceRouter);
app.use("/api/sale-items", saleItemRouter);
app.use("/api/ledger", ledgerRouter);
app.use("/api/upload", uploadRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
