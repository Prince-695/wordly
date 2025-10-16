import { api } from '~/trpc/server';
import { TrendingUp, Users, BookOpen, FolderOpen } from 'lucide-react';

const Statistics = async () => {
  const stats = await api.post.getStats();
  const categories = await api.category.getAll();

  const statsData = [
    {
      icon: BookOpen,
      value: `${stats.published}+`,
      label: 'Published Posts',
      description: 'Quality content shared',
    },
    {
      icon: FolderOpen,
      value: categories.length.toString(),
      label: 'Categories',
      description: 'Topics to explore',
    },
    {
      icon: Users,
      value: '500+',
      label: 'Active Readers',
      description: 'Growing community',
    },
    {
      icon: TrendingUp,
      value: '10K+',
      label: 'Monthly Views',
      description: 'And counting',
    },
  ];

  return (
    <section className="relative overflow-hidden border-y bg-gradient-to-b from-muted/50 to-background py-16 lg:py-24">
      <div className="container relative">
        {/* Section title */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Platform in Numbers
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join our thriving community of writers and readers
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border border-muted/40 bg-background/60 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Value */}
              <div className="mb-2 text-4xl font-bold tracking-tight text-primary lg:text-5xl">
                {stat.value}
              </div>

              {/* Label */}
              <div className="mb-1 text-sm font-semibold">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
