import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = Tables["testimonials"]["Row"];

// Mock testimonials data (replace with Supabase data when table is created)
const mockTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "TechCorp Inc.",
        content: "Working with this developer was an absolute pleasure. They delivered high-quality code on time and exceeded our expectations. The attention to detail and problem-solving skills are exceptional.",
        rating: 5,
        avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        created_at: "2024-01-15",
        featured: true
    },
    {
        id: "2",
        name: "Michael Chen",
        role: "CTO",
        company: "StartupXYZ",
        content: "Incredible technical expertise and communication skills. The project was completed ahead of schedule with clean, maintainable code. I would definitely work with them again.",
        rating: 5,
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        created_at: "2024-02-20",
        featured: true
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        role: "Design Lead",
        company: "Creative Agency",
        content: "Perfect collaboration between design and development. They understood our vision and brought it to life with pixel-perfect implementation and smooth animations.",
        rating: 5,
        avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        created_at: "2024-03-10",
        featured: false
    },
    {
        id: "4",
        name: "David Thompson",
        role: "Founder",
        company: "E-commerce Solutions",
        content: "Outstanding work on our e-commerce platform. The performance optimizations and user experience improvements resulted in a 40% increase in conversions.",
        rating: 5,
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        created_at: "2024-04-05",
        featured: false
    }
];

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // For now, we'll use mock data. To switch to Supabase, uncomment the code below:
    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                setIsLoading(true);

                // TODO: Uncomment this when testimonials table is created in Supabase
                // const { data, error } = await supabase
                //   .from("testimonials")
                //   .select("*")
                //   .order("created_at", { ascending: false });
                // 
                // if (error) throw error;
                // setTestimonials(data);

                // For now, use mock data with simulated delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setTestimonials(mockTestimonials);
            } catch (err) {
                console.error("Error loading testimonials:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
            />
        ));
    };

    return (
        <section id="testimonials" className="py-20 bg-secondary/20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl font-bold mb-2">What Clients Say</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
                    <p className="max-w-xl mx-auto text-muted-foreground mb-8">
                        Don't just take my word for it. Here's what my clients have to say about working with me.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : (
                    <Carousel className="w-full">
                        <CarouselContent>
                            {testimonials.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="lg:basis-1/3 md:basis-1/2 basis-full"
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <Quote className="w-8 h-8 text-primary/20 mr-2" />
                                                <div className="flex">{renderStars(testimonial.rating)}</div>
                                            </div>

                                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                                "{testimonial.content}"
                                            </p>

                                            <div className="flex items-center">
                                                <Avatar className="w-12 h-12 mr-4">
                                                    <AvatarImage
                                                        src={testimonial.avatar_url}
                                                        alt={testimonial.name}
                                                    />
                                                    <AvatarFallback>
                                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {testimonial.role} at {testimonial.company}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </Carousel>
                )}
            </div>
        </section>
    );
}