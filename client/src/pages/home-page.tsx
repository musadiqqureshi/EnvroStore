import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LeafIcon, ShoppingBag, Recycle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold sm:text-6xl">
            Shop Sustainably
            <br />
            Live Responsibly
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Discover our curated collection of eco-friendly products that help
            protect our planet while enhancing your lifestyle.
          </p>
          <div className="mt-8">
            <Link href="/products">
              <Button size="lg" className="rounded-full">
                Shop Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-muted py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Why Choose Us?</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary p-4">
                <LeafIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Eco-Friendly</h3>
              <p className="mt-2 text-muted-foreground">
                All our products are carefully selected to minimize environmental
                impact.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary p-4">
                <ShoppingBag className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Quality Products</h3>
              <p className="mt-2 text-muted-foreground">
                High-quality, sustainable alternatives to everyday products.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary p-4">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Sustainable Packaging</h3>
              <p className="mt-2 text-muted-foreground">
                Plastic-free packaging and recyclable materials.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
