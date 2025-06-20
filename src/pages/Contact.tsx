
import { Instagram, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleInstagram = () => {
    window.open('https://instagram.com/the.littleknots', '_blank');
  };

  return (
    <div className="min-h-screen bg-accent/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions about our products, 
            want to place a custom order, or just want to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-100 p-3 rounded-full">
                        <Instagram className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Instagram</h3>
                        <p className="text-gray-600 mb-3">
                          Follow us for the latest updates and behind-the-scenes content!
                        </p>
                        <Button 
                          onClick={handleInstagram}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          @the.littleknots
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                        <p className="text-gray-600 mb-3">
                          Send us an email and we'll respond within 24 hours.
                        </p>
                        <p className="text-blue-600 font-medium">hello@littleknots.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Location</h3>
                        <p className="text-gray-600 mb-3">
                          Handcrafted with love in India
                        </p>
                        <p className="text-green-600 font-medium">India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">🕒 Response Time</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We typically respond to messages within 24 hours. For urgent inquiries, 
                please reach out via Instagram for faster response times.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Orders Welcome!</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a specific design in mind? We love creating custom pieces! Whether it's a special color, 
            size, or completely unique design, we're here to bring your vision to life. Each custom piece 
            takes 3-7 days to complete, depending on complexity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
