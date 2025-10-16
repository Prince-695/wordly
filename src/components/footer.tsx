import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Blog', href: '/blog' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Testimonials', href: '/#testimonials' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Support', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: 'mailto:hello@wordly.com', label: 'Email' },
  ];

  return (
    <footer className="relative overflow-hidden border-t bg-muted/30">
      <div className="container relative">
        {/* Main footer content */}
        <div className="grid gap-12 py-16 lg:grid-cols-6 lg:gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="text-xl font-bold">W</span>
              </div>
              <span className="text-xl font-bold">Wordly</span>
            </Link>
            <p className="mb-6 text-sm text-muted-foreground">
              A modern blogging platform for everyone.
              Share your stories, build your audience, and make an impact.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-muted/40 bg-background/60 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Newsletter</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Get the latest updates and articles delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-muted/40 bg-background/60 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Wordly. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
