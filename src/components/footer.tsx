import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, PenSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Blog', href: '/blog' },
      { name: 'Categories', href: '/blog' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/prince-695", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/", label: "LinkedIn" },
    { icon: Mail, href: 'mailto:rathodprince411@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container relative mx-auto px-6 lg:px-8 ">
        {/* Main footer content */}
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:items-start">
          {/* Brand section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-3 inline-flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-110">
                <PenSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold">Wordly</span>
            </Link>
            <p className="mb-4 max-w-xs text-md text-muted-foreground">
              Share your stories with the world.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid - minimalistic 3-column layout */}
          <div className="grid grid-cols-3 gap-8 text-center md:gap-12 md:text-left">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar - ultra minimal */}
        <div className="border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Wordly. Built by Prince Rathod.
          </p>
        </div>
      </div>
    </footer>
  );
}
