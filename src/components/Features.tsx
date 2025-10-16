import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Zap, Shield, Users, Search, Pencil, Layout } from "lucide-react";

const features = [
  {
    icon: Pencil,
    title: "Intuitive Writing",
    description: "Beautiful markdown editor with live preview. Focus on your content, we handle the rest.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js 15 for incredible performance and instant page loads.",
  },
  {
    icon: Layout,
    title: "Clean Design",
    description: "Minimalist interface that puts your content first. Beautiful typography included.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with industry-standard security and authentication.",
  },
  {
    icon: Users,
    title: "Category System",
    description: "Organize posts with categories and help readers discover your best content.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Full-text search with filters to help readers find exactly what they need.",
  },
];

const Features = () => {
  return (
    <section className="relative w-full overflow-hidden border-y bg-muted/30 py-24 lg:py-32">
      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Features
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get directions on
            <br className="hidden sm:inline" />
            <span className="text-primary">the road to blogging</span>
          </h2>
          <p className="text-lg text-muted-foreground lg:text-xl">
            Your journey through blogging is unique. Each feature is designed
            to help you create, publish, and grow your audience effortlessly.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-muted/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
