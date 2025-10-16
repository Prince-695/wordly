import { Card, CardContent } from './ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Blogger",
    content: "Wordly has transformed the way I publish content. The markdown editor is intuitive, and the live preview feature saves me so much time. Highly recommended!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Developer Advocate",
    content: "As a developer, I appreciate the clean code and type-safe API. The platform is fast, reliable, and makes blogging enjoyable again.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    content: "I was skeptical at first, but Wordly exceeded my expectations. The category system helps my readers find content easily, and the analytics are insightful.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonials
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stories from the community
          </h2>
          <p className="text-lg text-muted-foreground lg:text-xl">
            See what our users have to say about their blogging journey with Wordly.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group relative border-muted/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <CardContent className="pt-6">
                {/* Quote icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>

              {/* Hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Join thousands of writers sharing their stories
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
