import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItem, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItemProps {
  item: CartItem;
  product: Product;
}

export default function CartItemCard({ item, product }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { toast } = useToast();

  const updateQuantity = async (newQuantity: number) => {
    try {
      await apiRequest("PATCH", `/api/cart/${item.id}`, {
        quantity: newQuantity,
      });
      setQuantity(newQuantity);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async () => {
    try {
      await apiRequest("DELETE", `/api/cart/${item.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${parseFloat(product.price.toString()).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => quantity > 1 && updateQuantity(quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => updateQuantity(parseInt(e.target.value))}
          className="w-20 text-center"
          min={1}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={removeItem}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
