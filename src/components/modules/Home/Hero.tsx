import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative bg-muted py-24 px-4 rounded-2xl shadow-lg text-foreground">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6">
        {/* Headline / Tagline */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Your Money. Smarter. Safer.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
          Manage your funds, send and receive money instantly, and track
          transactions—all in one secure digital wallet platform.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            className="bg-foreground text-background hover:bg-foreground/90"
            size="lg"
          >
            <Link to="/registration"> Get Started</Link>
          </Button>
          <Button
            variant="outline"
            className="text-foreground border-foreground hover:bg-foreground/5"
            size="lg"
          >
            <Link to="/about"> Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
