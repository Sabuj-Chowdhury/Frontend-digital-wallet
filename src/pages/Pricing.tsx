import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Activity,
  Shield,
  BarChart2,
  Headphones,
  Users,
  FileText,
} from "lucide-react";

const plans = [
  {
    title: "Basic",
    price: "Free",
    features: [
      { text: "Send & Receive Money", icon: <Activity className="w-5 h-5" /> },
      { text: "Wallet Management", icon: <Shield className="w-5 h-5" /> },
      {
        text: "Secure Transactions",
        icon: <CheckCircle className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Pro",
    price: "Free",
    features: [
      { text: "All Basic features", icon: <CheckCircle className="w-5 h-5" /> },
      {
        text: "Transaction Analytics",
        icon: <BarChart2 className="w-5 h-5" />,
      },
      { text: "Priority Support", icon: <Headphones className="w-5 h-5" /> },
    ],
  },
  {
    title: "Enterprise",
    price: "Free",
    features: [
      { text: "All Pro features", icon: <CheckCircle className="w-5 h-5" /> },
      { text: "Multi-User Management", icon: <Users className="w-5 h-5" /> },
      { text: "Custom Reports", icon: <FileText className="w-5 h-5" /> },
    ],
  },
];

const Pricing = () => {
  return (
    <div className="py-16 px-4 container mx-auto space-y-12">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Pricing Plans</h1>
        <p className="text-foreground/80 text-lg">
          Although our Digital Wallet app is completely free, here’s a dummy
          pricing structure to showcase our plans.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.title}
            className="bg-muted hover:shadow-lg transition-shadow relative"
          >
            {/* Optional badge for Pro plan */}
            {/* {plan.title === "Pro" && (
              <Badge className="absolute top-4 right-4 bg-primary text-white">
                Recommended
              </Badge>
            )} */}

            <CardHeader className="text-center space-y-2 py-6 justify-start">
              <CardTitle className="text-2xl font-bold text-foreground ">
                {plan.title}
              </CardTitle>
              {/* <CardDescription className="text-lg text-foreground/80">
                {plan.price}
              </CardDescription> */}
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              <ul className="space-y-2 text-foreground/80">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Badge className="w-full text-center py-2 mt-4 bg-foreground/10 text-foreground">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
