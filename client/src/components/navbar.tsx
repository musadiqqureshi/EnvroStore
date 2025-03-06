import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Enviro Store</span>
          </a>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link href="/products">
              <a className="text-sm font-medium transition-colors hover:text-primary">
                Products
              </a>
            </Link>
            {user?.isAdmin && (
              <Link href="/admin">
                <a className="text-sm font-medium transition-colors hover:text-primary">
                  Admin
                </a>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Link href="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => logoutMutation.mutate()}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
