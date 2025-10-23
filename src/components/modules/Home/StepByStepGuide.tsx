import { CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create an account as a User or Agent. Verify your email and phone number to activate your wallet.",
  },
  {
    title: "Add Money",
    description:
      "Deposit funds into your wallet securely via agents or supported payment methods.",
  },
  {
    title: "Send & Receive",
    description:
      "Easily transfer money to other users using their phone number or email.",
  },
  {
    title: "Track Transactions",
    description:
      "View your recent transactions, fees, and status in a clear and organized dashboard.",
  },
  {
    title: "Secure & Manage",
    description:
      "Update your profile, manage security settings, and enjoy full control over your wallet.",
  },
  {
    title: "Get Support",
    description:
      "Need help? Our 24/7 customer support team is here to assist you with any issues.",
  },
];

const StepByStepGuide = () => {
  return (
    <section className="py-20 px-4 container mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
        <p className="text-foreground/80 text-lg">
          Follow these simple steps to start using your Digital Wallet
          effortlessly.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-muted p-6 rounded-2xl shadow-lg flex flex-col space-y-4 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="text-foreground/80">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepByStepGuide;
