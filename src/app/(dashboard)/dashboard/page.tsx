"use client";
import { Suspense } from "react";
import SnippetContainer from "../_components/snipet-container";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Snippets</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your code snippets
          </p>
        </div>
        <SnippetContainer />
      </div>
    </Suspense>
  );
}
