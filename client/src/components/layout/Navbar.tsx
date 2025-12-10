import { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll handling
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 font-serif text-2xl font-bold cursor-pointer" 
          onClick={() => setLocation('/')}
        >
          <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
             <span className="text-primary-foreground font-sans text-xl font-bold">A</span>
          </div>
          <span>Apex<span className="text-primary/70">.</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setLocation('/admin')}
            className="gap-2"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                 <Button 
                    variant="default" 
                    onClick={() => {
                        setIsOpen(false);
                        setLocation('/admin');
                    }}
                    className="w-full justify-start gap-2 mt-4"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
