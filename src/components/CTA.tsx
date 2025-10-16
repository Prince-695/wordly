import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight, Pencil } from 'lucide-react'

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-2xl backdrop-blur-sm sm:p-12 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
            
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
                <Pencil className="h-8 w-8 text-primary" />
              </div>

              {/* Heading */}
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Wordly is here to simplify
                <br className="hidden sm:inline" />
                <span className="text-primary"> your blogging journey.</span>
              </h2>

              {/* Description */}
              <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
                We&apos;ll work with you to create a personalized blogging experience that
                <br className="hidden sm:inline" />
                incorporates all the tools you need by focusing on what matters most to you.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="group rounded-full text-base shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  <Link href="/auth/signup">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full text-base border-primary/20 hover:bg-primary/5"
                >
                  <Link href="/blog">Explore Stories</Link>
                </Button>
              </div>

              {/* Trust badge */}
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>No credit card required • Free to start</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA