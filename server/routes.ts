import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertProductSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Products
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(parseInt(req.params.id));
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const parsed = insertProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const product = await storage.createProduct(parsed.data);
    res.status(201).json(product);
  });

  app.patch("/api/products/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const product = await storage.updateProduct(parseInt(req.params.id), req.body);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const success = await storage.deleteProduct(parseInt(req.params.id));
    if (!success) return res.status(404).send("Product not found");
    res.sendStatus(200);
  });

  // Cart
  app.get("/api/cart", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const items = await storage.getCartItems(req.user.id);
    res.json(items);
  });

  app.post("/api/cart", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const item = await storage.addToCart({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(item);
  });

  app.patch("/api/cart/:id", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const item = await storage.updateCartItem(
      parseInt(req.params.id),
      req.body.quantity,
    );
    if (!item) return res.status(404).send("Cart item not found");
    res.json(item);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const success = await storage.removeFromCart(parseInt(req.params.id));
    if (!success) return res.status(404).send("Cart item not found");
    res.sendStatus(200);
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const order = await storage.createOrder({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(order);
  });

  app.get("/api/orders", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const orders = await storage.getOrders(req.user.id);
    res.json(orders);
  });

  const httpServer = createServer(app);
  return httpServer;
}
