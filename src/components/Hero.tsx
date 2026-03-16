import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-family.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 font-body text-sm text-secondary-foreground/90">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            For Senior Living & Hospice Organizations
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground tracking-tight">
            Every Life Has a Story{" "}
            <span className="text-gradient">Worth Preserving</span>
          </h1>

          <p className="font-body text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
            Observe Life empowers senior living facilities, hospice organizations,
            and therapy departments to capture, preserve, and share the stories
            of residents — connecting generations through video, audio, and the
            power of a single question.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Request a Demo
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="text-base px-8 py-6 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              Watch How It Works
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4 font-body text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              2-Minute Setup
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              No Training Required
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-secondary/20 blur-2xl" />
            <img
              src={heroImage}
              alt="Elderly grandmother sharing stories with family in a warm setting"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-primary/80 backdrop-blur-md p-4 font-body">
              <p className="text-primary-foreground/90 text-sm italic">
                "Mom told us a story about her childhood farm we'd never heard before.
                Now it's preserved forever."
              </p>
              <p className="text-secondary text-xs mt-1 font-semibold">— Sarah M., Family Member</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
