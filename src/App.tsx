import React from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute } from './lib/tanstack-router';
import { RootLayout } from './routes/__root';
import { HomePage } from './routes/index';
import { PricingPage } from './routes/pricing';
import { ThemesPage } from './routes/themes';
import { HowToCreatePage } from './routes/how-to-create';
import { AboutPage } from './routes/about';
import { FAQPage } from './routes/faq';
import { BlogPage } from './routes/blog';
import { VideoPage } from './routes/video';
import { CetakPage } from './routes/cetak';
import { LoginPage } from './routes/login';
import { RegisterPage } from './routes/register';
import { OtpPage } from './routes/otp';

// Setup file-based route tree
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const hargaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/harga',
  component: PricingPage,
});

const themesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/themes',
  component: ThemesPage,
});

const temaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tema',
  component: ThemesPage,
});

const howToCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-to-create',
  component: HowToCreatePage,
});

const websiteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/website',
  component: HowToCreatePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FAQPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video',
  component: VideoPage,
});

const cetakRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cetak',
  component: CetakPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: RegisterPage,
});

const otpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/otp',
  component: OtpPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  pricingRoute,
  hargaRoute,
  themesRoute,
  temaRoute,
  howToCreateRoute,
  websiteRoute,
  aboutRoute,
  faqRoute,
  blogRoute,
  videoRoute,
  cetakRoute,
  loginRoute,
  signinRoute,
  registerRoute,
  signupRoute,
  otpRoute,
]);

const router = createRouter({
  routeTree,
});

export default function App() {
  return <RouterProvider router={router} />;
}
