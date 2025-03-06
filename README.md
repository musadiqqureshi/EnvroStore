# EnviroStore 🌱

A modern, eco-friendly e-commerce platform designed to provide a sustainable shopping experience. This platform combines elegant design with environmental consciousness, offering a curated selection of sustainable products.

## Features ✨

- **Dark Theme UI**: Sleek, modern interface with a responsive design
- **User Authentication**: Secure login and registration system
- **Product Management**: Admin dashboard for managing products
- **Shopping Cart**: Full-featured cart functionality with real-time updates
- **Category Filtering**: Easy product browsing by categories
- **Search Functionality**: Quick product search capabilities
- **Responsive Design**: Optimized for both mobile and desktop views

## Technologies Used 🛠️

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Shadcn UI components
  - React Query for state management
  - Wouter for routing

- **Backend**:
  - Node.js with Express
  - In-memory storage for data persistence
  - Passport.js for authentication
  - Zod for schema validation

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/musadiqqureshi/EnvroStore.git
   cd EnvroStore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open [http://localhost:5000](http://localhost:5000) in your browser
   - Default admin credentials:
     - Username: admin
     - Password: admin123

## Project Structure 📁

```
EnviroStore/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utility functions
├── server/              # Backend Express application
│   ├── auth.ts         # Authentication logic
│   ├── storage.ts      # Data storage implementation
│   └── routes.ts       # API routes
└── shared/             # Shared types and schemas
```

## Key Features Explained 🔑

### User Authentication
- Secure registration and login system
- Protected routes for authenticated users
- Admin-specific functionalities

### Product Management
- Comprehensive product listing
- Category-based filtering
- Search functionality
- Detailed product views

### Shopping Cart
- Add/remove products
- Quantity adjustment
- Real-time price calculations

### Admin Dashboard
- Product management interface
- Inventory control
- Product creation and deletion

## UI/UX Features 🎨

- **Gradient Backgrounds**: Beautiful gradient transitions from deep purple to vibrant indigo
- **Smooth Animations**: Enhanced user experience with motion effects
- **Responsive Design**: Seamless experience across all devices
- **Dark Theme**: Modern, eye-friendly dark mode design
- **Interactive Elements**: Hover effects and smooth transitions

### Dark Theme Implementation
- Custom color palette optimized for dark mode
- Carefully selected contrast ratios for readability
- Subtle gradients and glass effects for depth
- Smooth transitions between states

### Responsive Features
- Mobile-first design approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions
- Optimized images and assets


## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 👏

- Shadcn UI for the component library
- Unsplash for product images
- Framer Motion for animations
- All contributors who helped shape this project

---

Made with ❤️ by [Musadiq Qureshi](https://github.com/musadiqqureshi)