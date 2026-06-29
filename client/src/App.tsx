import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PhotoProvider } from "./contexts/PhotoContext";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const StrategicPlan = lazy(() => import("./pages/StrategicPlan"));
const Programs = lazy(() => import("./pages/Programs"));
const Budget = lazy(() => import("./pages/Budget"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Board = lazy(() => import("./pages/Board"));
const NewsImpact = lazy(() => import("./pages/NewsImpact"));
const NewsPost = lazy(() => import("./pages/NewsPost"));
const Events = lazy(() => import("./pages/Events"));
const EventPost = lazy(() => import("./pages/EventPost"));
const FiftiethAnniversary = lazy(() => import("./pages/FiftiethAnniversary"));
const FiftyYear = lazy(() => import("./pages/FiftyYear"));
const RayCordova = lazy(() => import("./pages/RayCordova"));
const NamingPolicyStudio = lazy(() => import("./pages/NamingPolicyStudio"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/strategic-plan" component={StrategicPlan} />
          <Route path="/programs" component={Programs} />
          <Route path="/budget" component={Budget} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/50-year" component={FiftyYear} />
          <Route path="/foundation/ray-cordova/:slug" component={RayCordova} />
          <Route path="/foundation/ray-cordova" component={RayCordova} />
          <Route path="/ray-cordova" component={RayCordova} />
          <Route path="/board" component={Board} />
          <Route path="/news" component={NewsImpact} />
          <Route path="/news/:slug" component={NewsPost} />
          <Route path="/events" component={Events} />
          <Route path="/50th-anniversary" component={FiftiethAnniversary} />
          <Route path="/50th" component={FiftiethAnniversary} />
          <Route path="/internal/naming-policy-studio" component={NamingPolicyStudio} />
          <Route path="/events/:slug" component={EventPost} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PhotoProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PhotoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
