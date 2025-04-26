import { QueryClientProvider } from "@tanstack/react-query";
import QueryClientProviders from "./queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProviders>{children}</QueryClientProviders>;
}
