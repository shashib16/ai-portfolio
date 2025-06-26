import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle, Send, User, MessageSquare } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactFormShowcase: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="w-full bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
            <p className="text-gray-400 mb-6">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-2">What happens next?</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✅ Your message has been received</li>
                <li>📧 You'll get a confirmation email shortly</li>
                <li>⏰ I'll respond within 24 hours</li>
                <li>🤝 Let's discuss your project!</li>
              </ul>
            </div>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get In <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg">Let's discuss your next project or collaboration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">dev.shashib16@gmail.com</p>
                    <p className="text-gray-500 text-xs">Preferred for project inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-semibold">+91 7763009294</p>
                    <p className="text-gray-500 text-xs">Available Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-semibold">Bangalore, Karnataka</p>
                    <p className="text-gray-500 text-xs">Open to remote/Hybrid/WFH opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Response Time</p>
                    <p className="text-white font-semibold">Within 24 hours</p>
                    <p className="text-gray-500 text-xs">Usually much faster!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h4 className="text-white font-semibold mb-4">Why work with me?</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">98%</div>
                  <div className="text-xs text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">&lt;24h</div>
                  <div className="text-xs text-gray-400">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-xs text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">5★</div>
                  <div className="text-xs text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={24} className="text-blue-400" />
              <h3 className="text-xl font-bold text-white">Send me a message</h3>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    <User size={16} className="inline mr-1" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700 border ${
                    errors.subject ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                >
                  <option value="">Select a subject</option>
                  <option value="job-opportunity">Job Opportunity</option>
                  <option value="project-collaboration">Project Collaboration</option>
                  <option value="freelance-work">Freelance Work</option>
                  <option value="technical-question">Technical Question</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
                {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700 border ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors`}
                  placeholder="Tell me about your project, requirements, timeline, or any questions you have..."
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                <p className="text-gray-500 text-xs mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-gray-500 text-xs text-center">
                By sending this message, you agree to our privacy policy. 
                Your information will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-2">💡 Pro Tip</h4>
            <p className="text-gray-400">
              Include specific details about your project, timeline, and budget for faster response. 
              The more information you provide, the better I can help you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormShowcase;