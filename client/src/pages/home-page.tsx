import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LeafIcon, ShoppingBag, Recycle, ArrowRight, Leaf, Globe, Heart } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container relative z-10"
        >
          <div className="max-w-3xl">
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Shop Sustainably,
              <br />
              Live Responsibly
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover our curated collection of eco-friendly products that help
              protect our planet while enhancing your lifestyle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/products">
                <Button size="lg" className="rounded-full text-lg px-8 bg-white text-primary hover:bg-white/90">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Enviro Store?</h2>
            <p className="text-muted-foreground text-lg">
              We're committed to making sustainable living accessible and enjoyable for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Eco-Friendly Products",
                description: "Carefully selected items that minimize environmental impact"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Sustainable Packaging",
                description: "Plastic-free packaging using recyclable materials"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Community Impact",
                description: "Part of profits go to environmental conservation"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of conscious consumers and start making sustainable choices today.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}