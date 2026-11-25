import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Truck, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-12"
      >
        About <span className="text-blue-600">TrendyCart</span>
      </motion.h1>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 leading-relaxed">
            At <span className="font-semibold">TrendyCart</span>, we are dedicated to
            providing high-quality products at affordable prices. Our customers choose
            us because we deliver not just products but also trust and reliability. 
            Every order is handled with care, and we ensure that your shopping 
            experience is smooth, secure, and enjoyable. Our services are built on 
            transparency, fast delivery, and excellent after-sales support.
          </p>
        </motion.section>

        {/* Operations */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-blue-600" />
              <p className="text-gray-600 leading-relaxed">
                Over <span className="font-semibold">500+ skilled employees</span> work
                tirelessly across our warehouses to make sure every order is processed
                with speed and accuracy.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Truck className="w-8 h-8 text-green-600" />
              <p className="text-gray-600 leading-relaxed">
                With a highly optimized logistics network, our deliveries are{" "}
                <span className="font-semibold">fast, reliable, and trackable</span> —
                ensuring products reach you on time, every time.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-500" />
              <p className="text-gray-600">
                TrendyCart HQ,  
                123 Market Street,  
                New York, USA
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-green-500" />
              <p className="text-gray-600">+1 (234) 567-890</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-500" />
              <p className="text-gray-600">support@trendycart.com</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
