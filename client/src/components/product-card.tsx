import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const addToCart = async () => {
    if (!user) return;

    try {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
      });

      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardContent className="p-0">
          <Link href={`/products/${product.id}`}>
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Details</span>
              </div>
            </div>
          </Link>
          <div className="p-4">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
            <p className="text-lg font-bold text-primary mt-2">
              ${parseFloat(product.price.toString()).toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto p-4 pt-0">
          <Button
            className="w-full transition-transform active:scale-95"
            onClick={addToCart}
            disabled={!user}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}