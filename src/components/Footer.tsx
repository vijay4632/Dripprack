import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-black tracking-[0.2em] text-foreground">
              Dripprack
            </h3>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              Premium Thrift. Real Drip.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-[0.15em] text-foreground">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {["New Drops", "Jackets", "Hoodies", "Vintage"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-[0.15em] text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-[0.15em] text-foreground">
              Connect
            </h4>
            <div className="mt-4 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dripprack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
