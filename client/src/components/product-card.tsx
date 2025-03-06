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
    <Card className="hover-card h-full flex flex-col bg-white overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative group aspect-square">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/40 transition-colors duration-300" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x400/jpeg?text=Product";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 bg-white/90 rounded-full text-sm font-medium">
                View Details
              </span>
            </div>
          </div>
        </Link>

        <div className="p-5">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${parseFloat(product.price.toString()).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-5 pt-0">
        <Button
          className="w-full rounded-full font-medium"
          onClick={addToCart}
          disabled={!user || product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {user ? 'Add to Cart' : 'Sign in to Buy'}
        </Button>
      </CardFooter>
    </Card>
  );
}