import Link from "next/link";
import { ArrowRight, Database, Folder, Sparkles, Tag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { AppRouts } from "../lib/app-routes";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full border-b flex justify-center">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="font-mono text-primary">&lt;/&gt;</span>
            <span>SnipStash</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href={AppRouts.auth.signIn}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Button asChild>
              <Link href={AppRouts.auth.signUp}>Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 ">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 flex justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Smart Code Snippet Organization
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Save, categorize, and retrieve your code snippets with intelligent
              auto-tagging and powerful search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href={AppRouts.auth.signUp}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={AppRouts.auth.signIn}>Log in</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 flex justify-center">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Spend less time organizing, more time coding
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg p-6 border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Folder className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Snippets</h3>
                <p className="text-muted-foreground">
                  Quick and easy storage for code snippets from any source.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Auto-Categorize</h3>
                <p className="text-muted-foreground">
                  Smart detection automatically tags code based on content and
                  patterns.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Tags</h3>
                <p className="text-muted-foreground">
                  Add your own tags to create a personalized organization
                  system.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  Find any snippet fast with powerful search and filtering
                  capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted flex justify-center">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to organize your code snippets?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join today and start building your personal snippet library.
            </p>
            <Button asChild size="lg">
              <Link href={AppRouts.auth.signUp}>Get Started For Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 flex justify-center">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-primary">&lt;/&gt;</span>
              <span className="font-medium">SnipStash</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SnipStash. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
