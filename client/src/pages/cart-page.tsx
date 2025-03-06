import { useQuery } from "@tanstack/react-query";
import { CartItem, Product } from "@shared/schema";
import CartItemCard from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { toast } = useToast();

  const { data: cartItems, isLoading: isLoadingCart } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoadingCart || isLoadingProducts) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="container py-8 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  const cartProducts = cartItems
    .map((item) => ({
      item,
      product: products?.find((p) => p.id === item.productId),
    }))
    .filter((item): item is { item: CartItem; product: Product } => !!item.product);

  const total = cartProducts.reduce(
    (sum, { item, product }) =>
      sum + item.quantity * parseFloat(product.price.toString()),
    0
  );

  const checkout = async () => {
    try {
      await apiRequest("POST", "/api/orders", {
        status: "pending",
        total,
      });

      // Clear cart after successful order
      for (const { item } of cartProducts) {
        await apiRequest("DELETE", `/api/cart/${item.id}`);
      }

      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });

      toast({
        title: "Order placed",
        description: "Your order has been placed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <div className="mt-8 divide-y">
          {cartProducts.map(({ item, product }) => (
            <CartItemCard key={item.id} item={item} product={product} />
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button className="w-full" size="lg" onClick={checkout}>
            Proceed to Checkout
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
