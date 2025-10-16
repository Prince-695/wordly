import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <main className="relative min-h-[100vh] w-full overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="container relative">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8 lg:py-32">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/15">
            <Sparkles className="h-4 w-4" />
            <span>Welcome to the Future of Blogging</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            A blogging platform{" "}
            <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="relative z-10 bg-primary bg-clip-text text-transparent">
                for everyone.
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 blur-sm" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
            Blogging is a journey. Take it with confidence.
            <br className="hidden sm:inline" />
            Create, publish, and share your stories with the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              asChild 
              size="lg" 
              className="group rounded-full text-base shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <Link href="/blog">
                Explore Stories
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full text-base border-primary/20 hover:bg-primary/5"
            >
              <Link href="/auth/signup">Start Writing</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Type-Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Modern Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-primary/30">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-primary/60" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
