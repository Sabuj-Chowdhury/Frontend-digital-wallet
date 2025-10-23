import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Sabuj Chowdhury",
    role: "Founder & CEO",
    image: "/team/sabuj.jpg",
  },
  {
    name: "Amina Rahman",
    role: "Product Manager",
    image: "/team/amina.jpg",
  },
  {
    name: "Rafiqul Islam",
    role: "Lead Developer",
    image: "/team/rafiqul.jpg",
  },
];

const About = () => {
  return (
    <div className="py-16 px-4 container mx-auto space-y-16">
      {/* Service Story */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Our Story</h1>
        <p className="text-foreground/80 text-lg">
          We built the Digital Wallet System to make sending, receiving, and
          managing money effortless, secure, and fast for everyone. Our platform
          connects users, agents, and admins seamlessly to ensure a trustworthy
          financial ecosystem.
        </p>
      </section>

      {/* Mission */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-semibold text-foreground">Our Mission</h2>
        <p className="text-foreground/80 text-lg">
          Empower individuals and businesses to manage their finances
          efficiently while providing top-notch security, real-time
          transactions, and complete transparency.
        </p>
      </section>

      {/* Team */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center text-foreground">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center p-4 bg-muted">
              <CardHeader className="flex flex-col items-center space-y-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-bold">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  {member.role}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
