import { useRef, useEffect, useState } from "react";
import { useSpring, animated, useInView } from "@react-spring/web";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check, FileText, Clock, Zap } from "lucide-react";

const QuoteAppointmentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleQuoteClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSd5UN-OlwfamTG3yUWR5szACkF8MYQL3q-XP-5UroK05wTuXg/viewform?usp=header",
      "_blank"
    );
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sectionSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-background"
      id="quote-appointment"
    >
      <div className="container">
        <animated.div
          style={sectionSpring}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">
                Get a Quote & Consultation
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ready to start your project? Request a detailed quote and
                schedule a free consultation to discuss your needs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Detailed Project Scope</h3>
                  <p className="text-muted-foreground">
                    Comprehensive breakdown of deliverables, timeline, and costs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Turnaround</h3>
                  <p className="text-muted-foreground">
                    Receive your detailed quote within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">No Obligation</h3>
                  <p className="text-muted-foreground">
                    Free consultation with zero commitment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1.5 rounded-full">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Transparent Pricing</h3>
                  <p className="text-muted-foreground">
                    Clear pricing with no hidden fees or surprises
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleQuoteClick} size="lg" className="mt-6 gap-2">
              <FileText className="h-5 w-5" />
              Request a Quote
            </Button>
          </div>

          {/* Right Column - Quote Form Card */}
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">
                Project Quote Request
              </CardTitle>
              <CardDescription>
                Fill out this form to get a detailed estimate
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">
                    What's included in your quote:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Detailed cost breakdown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">
                        Project timeline and milestones
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">
                        Technology recommendations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">
                        Maintenance and support options
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleQuoteClick}
                    size="lg"
                    className="w-full"
                  >
                    Get Your Free Quote
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  You'll be redirected to our secure form. Your information is
                  never shared with third parties.
                </p>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </section>
  );
};

export default QuoteAppointmentSection;
