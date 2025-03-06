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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <Link href={`/products/${product.id}`}>
            <div className="relative group">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wide">
                  View Details
                </span>
              </div>
            </div>
          </Link>
          <div className="p-5">
            <h3 className="font-semibold text-lg line-clamp-1 text-slate-900">
              {product.name}
            </h3>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              {product.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-bold text-slate-900">
                ${parseFloat(product.price.toString()).toFixed(2)}
              </p>
              <span className="text-sm text-slate-600">
                {product.stock} in stock
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto p-5 pt-0">
          <Button
            className="w-full transition-all duration-300 hover:shadow-lg"
            onClick={addToCart}
            disabled={!user || product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {user ? 'Add to Cart' : 'Sign in to Buy'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}