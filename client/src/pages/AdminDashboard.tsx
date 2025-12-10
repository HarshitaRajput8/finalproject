import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LayoutDashboard, Building2, Users, MessageSquare, Mail, Plus, Trash2, LogOut, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { projects, clients, contacts, subscribers, addProject, deleteProject, addClient, deleteClient } = useAppStore();
  const { toast } = useToast();

  // Project Form
  const projectForm = useForm({
    defaultValues: { name: '', description: '', imageUrl: '' }
  });

  // Client Form
  const clientForm = useForm({
    defaultValues: { name: '', description: '', designation: '', imageUrl: '' }
  });

  const handleAddProject = (data: any) => {
    // Simple mock image if none provided
    const payload = {
       ...data,
       imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800"
    };
    addProject(payload);
    projectForm.reset();
    toast({ title: "Project Added", description: "The project has been successfully added." });
  };

  const handleAddClient = (data: any) => {
    // Simple mock image if none provided
    const payload = {
        ...data,
        imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
    };
    addClient(payload);
    clientForm.reset();
    toast({ title: "Client Added", description: "The client has been successfully added." });
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border px-6 font-serif font-bold text-lg">
          Apex Admin
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-2">
            <div className="px-2 py-1.5 text-xs text-sidebar-foreground/50 uppercase tracking-wider font-bold">Management</div>
            <Button variant="secondary" className="justify-start gap-2 w-full">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80">
              <Building2 className="h-4 w-4" /> Projects
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80">
              <Users className="h-4 w-4" /> Clients
            </Button>
            
            <div className="mt-6 px-2 py-1.5 text-xs text-sidebar-foreground/50 uppercase tracking-wider font-bold">Inquiries</div>
            <Button variant="ghost" className="justify-start gap-2 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80">
              <MessageSquare className="h-4 w-4" /> Contact Forms
            </Button>
             <Button variant="ghost" className="justify-start gap-2 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80">
              <Mail className="h-4 w-4" /> Subscriptions
            </Button>
          </nav>
        </div>
        <div className="border-t border-sidebar-border p-4">
          <Button variant="destructive" className="w-full gap-2" onClick={() => setLocation('/')}>
            <LogOut className="h-4 w-4" /> Logout to Site
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:hidden">
          <span className="font-serif font-bold">Apex Admin</span>
          <div className="ml-auto">
             <Button size="sm" variant="ghost" onClick={() => setLocation('/')}>Back to Site</Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and view submissions.</p>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="bg-background border">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="contacts">Contact Forms</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">All Projects</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="gap-2"><Plus className="h-4 w-4" /> Add Project</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add New Project</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input {...projectForm.register('name', { required: true })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea {...projectForm.register('description', { required: true })} />
                      </div>
                       <div className="space-y-2">
                        <Label>Image URL (Optional)</Label>
                        <div className="flex gap-2">
                            <Input {...projectForm.register('imageUrl')} placeholder="https://..." />
                            <Button size="icon" variant="outline"><ImageIcon className="h-4 w-4" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground">We'll auto-crop this for you (simulated).</p>
                      </div>
                      <Button onClick={projectForm.handleSubmit(handleAddProject)} className="w-full">Save Project</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img src={project.imageUrl} alt={project.name} className="object-cover w-full h-full" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </CardContent>
                     <div className="p-4 pt-0 flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                     </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">All Clients</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="gap-2"><Plus className="h-4 w-4" /> Add Client</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add New Client</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="space-y-2">
                        <Label>Client Name</Label>
                        <Input {...clientForm.register('name', { required: true })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Designation</Label>
                        <Input {...clientForm.register('designation', { required: true })} placeholder="e.g. CEO, Designer" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description / Testimonial</Label>
                        <Textarea {...clientForm.register('description', { required: true })} />
                      </div>
                       <div className="space-y-2">
                        <Label>Image URL (Optional)</Label>
                        <Input {...clientForm.register('imageUrl')} placeholder="https://..." />
                      </div>
                      <Button onClick={clientForm.handleSubmit(handleAddClient)} className="w-full">Save Client</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((client) => (
                  <Card key={client.id}>
                    <CardContent className="pt-6 flex items-start gap-4">
                       <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                           <img src={client.imageUrl} alt={client.name} className="h-full w-full object-cover" />
                       </div>
                       <div className="space-y-1 flex-1">
                           <h4 className="font-bold">{client.name}</h4>
                           <p className="text-xs text-primary font-medium uppercase">{client.designation}</p>
                           <p className="text-sm text-muted-foreground mt-2">"{client.description}"</p>
                       </div>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteClient(client.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                    <CardTitle>Contact Form Submissions</CardTitle>
                    <CardDescription>View all inquiries from the landing page.</CardDescription>
                </CardHeader>
                <CardContent>
                    {contacts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No messages yet.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">{contact.fullName}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.mobile}</TableCell>
                                        <TableCell>{contact.city}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(contact.submittedAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscribers Tab */}
            <TabsContent value="subscribers">
              <Card>
                <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                     {subscribers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No subscribers yet.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email Address</TableHead>
                                    <TableHead>Subscribed At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscribers.map((sub) => (
                                    <TableRow key={sub.id}>
                                        <TableCell>{sub.email}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(sub.subscribedAt).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
}
