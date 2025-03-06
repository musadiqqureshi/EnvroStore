import { IStorage } from "./storage";
import createMemoryStore from "memorystore";
import session from "express-session";
import { InsertUser, InsertProduct, InsertCartItem, InsertOrder, User, Product, CartItem, Order } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const MemoryStore = createMemoryStore(session);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  sessionStore: session.SessionStore;
  currentId: { [key: string]: number };
  initialized: Promise<void>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.currentId = { users: 1, products: 1, cartItems: 1, orders: 1 };
    this.sessionStore = new MemoryStore({ checkPeriod: 86400000 });

    // Initialize store with sample data
    this.initialized = this.initializeStore();
  }

  private async initializeStore() {
    const hashedPassword = await hashPassword("admin123");
    await this.createUser({
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
    });

    const sampleProducts = [
      {
        name: "Bamboo Water Bottle",
        description: "Sleek and sustainable bamboo water bottle with vacuum insulation. Keeps drinks cold for 24 hours or hot for 12 hours.",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
        category: "Drinkware",
        stock: 50,
      },
      {
        name: "Organic Cotton Tote Bag",
        description: "Durable and washable organic cotton tote bag. Perfect for shopping, beach trips, or everyday use.",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2eb5",
        category: "Bags",
        stock: 100,
      },
      {
        name: "Solar-Powered Power Bank",
        description: "10000mAh power bank with built-in solar charging capability. Includes dual USB ports and LED light.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1620775997780-a01e050a9359",
        category: "Electronics",
        stock: 30,
      },
      {
        name: "Bamboo Cutlery Set",
        description: "Portable bamboo cutlery set including fork, knife, spoon, and chopsticks. Comes with a cotton carrying case.",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7",
        category: "Kitchen",
        stock: 75,
      },
      {
        name: "Recycled Glass Vase",
        description: "Handcrafted vase made from recycled glass. Each piece is unique with slight variations in color.",
        price: "34.99",
        image: "https://images.unsplash.com/photo-1602662942008-51f4ea5f6bb6",
        category: "Home Decor",
        stock: 25,
      },
      {
        name: "Natural Bamboo Toothbrush",
        description: "Biodegradable bamboo toothbrush with charcoal-infused bristles. Comes in a pack of 4.",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
        category: "Personal Care",
        stock: 200,
      },
      {
        name: "Reusable Produce Bags",
        description: "Set of 5 mesh produce bags made from recycled materials. Washable and durable.",
        price: "16.99",
        image: "https://images.unsplash.com/photo-1610419241908-ec8698f04665",
        category: "Kitchen",
        stock: 150,
      },
      {
        name: "Eco-Friendly Yoga Mat",
        description: "Natural rubber yoga mat with cork surface. Non-slip and biodegradable.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
        category: "Fitness",
        stock: 40,
      },
      {
        name: "Stainless Steel Lunch Box",
        description: "Three-compartment stainless steel lunch box with bamboo lid. Includes utensils.",
        price: "24.99",
        image: "https://images.unsplash.com/photo-1531261975993-b4a7ff722fb3",
        category: "Kitchen",
        stock: 60,
      },
      {
        name: "Hemp Backpack",
        description: "Durable hemp backpack with laptop compartment and multiple pockets. Water-resistant.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        category: "Bags",
        stock: 35,
      }
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    await this.initialized;
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.initialized;
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser & { isAdmin?: boolean }): Promise<User> {
    const id = this.currentId.users++;
    const newUser = { ...user, id, isAdmin: user.isAdmin || false };
    this.users.set(id, newUser);
    return newUser;
  }

  async getProducts(): Promise<Product[]> {
    await this.initialized;
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    await this.initialized;
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentId.products++;
    const newProduct = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    await this.initialized;
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    await this.initialized;
    return this.products.delete(id);
  }

  async getCartItems(userId: number): Promise<CartItem[]> {
    await this.initialized;
    return Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId,
    );
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentId.cartItems++;
    const newCartItem = { ...cartItem, id };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    await this.initialized;
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    await this.initialized;
    return this.cartItems.delete(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentId.orders++;
    const newOrder = { ...order, id };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrders(userId: number): Promise<Order[]> {
    await this.initialized;
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
}

export const storage = new MemStorage();