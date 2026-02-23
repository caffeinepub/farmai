import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'farmai-app';

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">FARMAI</h3>
            <p className="text-sm text-muted-foreground">
              Empowering farmers with intelligent agriculture solutions through AI-driven insights and direct market access.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/crop-prediction" className="hover:text-primary transition-colors">Crop Prediction</a></li>
              <li><a href="/cost-calculator" className="hover:text-primary transition-colors">Cost Calculator</a></li>
              <li><a href="/profit-calculator" className="hover:text-primary transition-colors">Profit Calculator</a></li>
              <li><a href="/marketplace" className="hover:text-primary transition-colors">Marketplace</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Contact</h3>
            <p className="text-sm text-muted-foreground">
              For support and inquiries, reach out to our team to learn more about FARMAI solutions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} FARMAI. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
