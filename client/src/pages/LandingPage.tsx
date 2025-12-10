import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Validation Schemas
const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  city: z.string().min(2, "City is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function LandingPage() {
  const { projects, clients, addContact, addSubscriber } = useAppStore();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Contact Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onContactSubmit = (data: ContactFormValues) => {
    addContact(data);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });
    form.reset();
  };

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email.",
        variant: "destructive",
      });
      return;
    }
    addSubscriber(newsletterEmail);
    toast({
      title: "Subscribed!",
      description: "Thank you for joining our newsletter.",
    });
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container relative z-10 px-4 text-center space-y-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-tight"
          >
            Building Tomorrow's World Today
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80"
          >
            We deliver premium architectural and construction solutions that stand the test of time.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" className="gap-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}>
              View Our Projects <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Our Projects</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore our portfolio of award-winning residential and commercial developments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-secondary/20">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Happy Clients</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it. Here's what our partners have to say.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clients.map((client) => (
              <Card key={client.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={client.imageUrl} alt={client.name} />
                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-muted-foreground italic">"{client.description}"</p>
                    <div>
                      <h4 className="font-bold text-foreground">{client.name}</h4>
                      <p className="text-sm text-primary font-medium">{client.designation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Get In Touch</h2>
                <p className="text-muted-foreground">Ready to start your next project? Contact us today for a consultation.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Visit Us</h4>
                    <p className="text-muted-foreground">123 Innovation Drive, Tech City, Indore</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Call Us</h4>
                    <p className="text-muted-foreground">+9301806898</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-muted-foreground">hello@apexconstruction.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-lg border-muted">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Full Name" {...form.register("fullName")} />
                    {form.formState.errors.fullName && <span className="text-xs text-destructive">{form.formState.errors.fullName.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Input placeholder="Email Address" type="email" {...form.register("email")} />
                    {form.formState.errors.email && <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Input placeholder="Mobile Number" {...form.register("mobile")} />
                    {form.formState.errors.mobile && <span className="text-xs text-destructive">{form.formState.errors.mobile.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Input placeholder="City" {...form.register("city")} />
                    {form.formState.errors.city && <span className="text-xs text-destructive">{form.formState.errors.city.message}</span>}
                  </div>

                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Submit Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold">Subscribe to Our Newsletter</h2>
            <p className="text-primary-foreground/80">Stay updated with our latest projects, insights, and industry news.</p>
          </div>
          
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-primary-foreground text-primary border-transparent placeholder:text-primary/50 focus-visible:ring-offset-primary"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <Button variant="secondary" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Apex Construction. All rights reserved.</p>
      </footer>
    </div>
  );
}
