import { CartSheet } from "@/components/CartSheet";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/context/StoreContext";
import { AdminPage } from "@/pages/AdminPage";
import { StorePage } from "@/pages/StorePage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <StoreProvider>
      <Outlet />
      <Toaster />
    </StoreProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <Navbar />
      <CartSheet />
      <StorePage />
    </>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
