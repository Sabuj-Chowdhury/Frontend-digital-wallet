import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I create a wallet?",
      answer:
        "Sign up as a user or agent, verify your email and phone number, and your wallet will be automatically created.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes! All transactions are encrypted and secured using industry-standard security protocols.",
    },
    {
      question: "Can I send money to other users?",
      answer:
        "Absolutely! You can send money to any verified user using their phone number.",
    },
    {
      question: "Are there any fees?",
      answer:
        "The app is free to use, but a small transaction fee may apply depending on the operation.",
    },
    {
      question: "How do I recover a lost password?",
      answer:
        "Use the 'Forgot Password' link on the login page and follow the instructions to reset your password.",
    },
  ];

  return (
    <section className="py-20 px-4 container mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="flex items-center justify-center text-primary">
          <HelpCircle className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-foreground/80 text-lg">
          Get answers to common questions and quickly understand how our Digital
          Wallet works.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion
        type="single"
        collapsible
        className="space-y-4 max-w-3xl mx-auto p-5 "
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-muted rounded-lg shadow-sm border border-border  p-2"
          >
            <AccordionTrigger className="text-foreground font-medium text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
