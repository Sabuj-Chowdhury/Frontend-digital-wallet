import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Wallet,
  Send,
  Users,
  ShieldCheck,
  BarChart2,
  LifeBuoy,
} from "lucide-react";

const featuresData = [
  {
    title: "Secure Wallet",
    description:
      "Your funds are protected with top-notch security measures and encrypted transactions.",
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
  },
  {
    title: "Send & Receive Money",
    description:
      "Easily send or receive money to any user via phone or email in real-time.",
    icon: <Send className="w-10 h-10 text-primary" />,
  },
  {
    title: "Manage Wallet Balance",
    description:
      "Quickly check your wallet balance, deposit, or withdraw funds with a few clicks.",
    icon: <Wallet className="w-10 h-10 text-primary" />,
  },
  {
    title: "User & Agent Management",
    description:
      "Admins and agents can monitor, approve, or block accounts efficiently.",
    icon: <Users className="w-10 h-10 text-primary" />,
  },
  {
    title: "Transaction Analytics",
    description:
      "Visualize transaction trends with interactive charts, graphs, and reports.",
    icon: <BarChart2 className="w-10 h-10 text-primary" />,
  },
  {
    title: "24/7 Support",
    description:
      "Get round-the-clock assistance for any queries or issues you face.",
    icon: <LifeBuoy className="w-10 h-10 text-primary" />,
  },
];

const Features = () => {
  return (
    <div className="py-16 px-4 container mx-auto space-y-12">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Our Features</h1>
        <p className="text-foreground/80 text-lg">
          Explore the powerful functionalities of our Digital Wallet System
          designed for Users, Agents, and Admins.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          <Card
            key={feature.title}
            className="bg-muted hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-col items-center space-y-4 py-6">
              {feature.icon}
              <CardTitle className="text-xl font-semibold text-foreground">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-foreground/80 text-center">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
