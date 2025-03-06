import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingBag, ArrowRight, Leaf, Globe, Heart, Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="gradient-bg gradient-shimmer relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-2"
            >
              <Star className="mr-2 h-4 w-4 text-purple-400" />
              <span className="text-sm text-white/80">
                Premium Eco-Friendly Products
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-7xl font-bold text-white mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Sustainable Living,
              <br />
              <span className="text-purple-400">Elevated Design</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover our curated collection of premium eco-friendly products.
              Each piece is thoughtfully selected to combine sustainability with elegant design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/products">
                <Button size="lg" className="button-glow rounded-full text-lg px-8 bg-purple-600 hover:bg-purple-500">
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 border-white/10 text-white hover:bg-white/5">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Us?</h2>
            <p className="text-lg text-white/60">
              We combine sustainability with premium design to create products that make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Eco-Conscious Design",
                description: "Carefully curated products that minimize environmental impact while maximizing style"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Sustainable Materials",
                description: "Premium materials sourced responsibly from eco-friendly suppliers"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Community Impact",
                description: "Supporting environmental initiatives with every purchase"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="hover-card rounded-2xl p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 glass-effect">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Make a Difference?</h2>
            <p className="text-lg text-white/60 mb-8">
              Join our community of conscious consumers and elevate your sustainable lifestyle.
            </p>
            <Link href="/products">
              <Button size="lg" className="button-glow rounded-full px-8 bg-purple-600 hover:bg-purple-500">
                Browse Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}