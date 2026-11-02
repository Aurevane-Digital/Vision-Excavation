import React, { useState, useRef, useEffect } from 'react';
import { CONTACT_INFO, SERVICES } from '../data/siteData';
import { InteractiveMap } from '../components/InteractiveMap';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  prefilledService?: string;
  prefilledMessage?: string;
  onFormSubmitted?: (data: any) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  prefilledService,
  prefilledMessage,
  onFormSubmitted
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: prefilledService || 'Foundation Waterproofing',
    message: prefilledMessage || ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledService, prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = `VE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(ticket);
    setSubmitted(true);
    if (onFormSubmitted) {
      onFormSubmitted({ ...formData, ticketNumber: ticket });
    }
  };

  const focusForm = () => {
    nameInputRef.current?.focus();
    nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="page-view animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-950 text-white pt-28 sm:pt-32 pb-20 text-center border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight mb-4">
            CONTACT VISION EXCAVATION
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ready to protect your property and start your excavation project? Reach out for a free, no obligation inspection. We respond fast and treat every estimate like a handshake.
          </p>
        </div>
      </div>

      {/* Main Two-Column Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Get In Touch */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest block font-mono">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-zinc-950 mt-1">
                  TALK TO A REAL PERSON
                </h2>
              </div>

              <div className="space-y-6 pt-2">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center text-brand-red font-bold text-lg shrink-0">
                    <Phone className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-500 block font-mono">
                      PHONE
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.phoneRaw}`}
                      className="text-lg font-bold text-zinc-950 hover:text-brand-red transition-colors font-mono"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center text-brand-red font-bold text-lg shrink-0">
                    <Mail className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-500 block font-mono">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm font-bold text-zinc-950 hover:text-brand-red transition-colors font-mono"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center text-brand-red font-bold text-lg shrink-0">
                    <MapPin className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-500 block font-mono">
                      SERVICE AREA
                    </span>
                    <p className="text-sm text-zinc-800 font-medium">
                      {CONTACT_INFO.serviceArea}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center text-brand-red font-bold text-lg shrink-0">
                    <Clock className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-500 block font-mono">
                      HOURS
                    </span>
                    <p className="text-sm text-zinc-800 font-medium">
                      Monday to Saturday: 7:00 AM to 6:00 PM
                      <br />
                      Sunday: Emergency On-Call
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="px-6 py-3 bg-black hover:bg-brand-red text-white text-xs font-bold uppercase tracking-widest transition-colors font-mono"
                >
                  CALL {CONTACT_INFO.phone}
                </a>
                <button
                  type="button"
                  onClick={focusForm}
                  className="px-6 py-3 border border-zinc-300 hover:bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer font-mono"
                >
                  SEND MESSAGE
                </button>
              </div>
            </div>

            {/* Right Column: Send Us A Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-50 border border-zinc-200 rounded-none p-8 sm:p-10 shadow-sm">
                <h3 className="font-heading text-xl font-bold uppercase text-zinc-950 mb-1">
                  SEND US A MESSAGE
                </h3>
                <p className="text-xs text-zinc-500 mb-6">
                  Fill out the form and our estimators will be in touch within one business day.
                </p>

                {submitted ? (
                  <div className="p-8 text-center space-y-4 bg-white border border-zinc-200">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold font-heading text-zinc-950">
                      MESSAGE TRANSMITTED
                    </h4>
                    <p className="text-xs font-mono text-zinc-500">
                      Service Ticket: <strong className="text-zinc-900">{ticketNumber}</strong>
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Vision Excavation will contact you shortly at{' '}
                      <strong>{formData.phone || formData.email}</strong> to review your project specs.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: 'Excavation & Site Prep',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-widest font-mono cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 font-mono">
                          NAME *
                        </label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full text-sm border-zinc-300 rounded-none px-3 py-2.5 focus:ring-brand-red focus:border-brand-red"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 font-mono">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full text-sm border-zinc-300 rounded-none px-3 py-2.5 focus:ring-brand-red focus:border-brand-red"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 font-mono">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(613) 000-0000"
                        className="w-full text-sm border-zinc-300 rounded-none px-3 py-2.5 focus:ring-brand-red focus:border-brand-red"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 font-mono">
                        SERVICE INTEREST
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full text-sm border-zinc-300 rounded-none px-3 py-2.5 focus:ring-brand-red focus:border-brand-red bg-white font-mono"
                      >
                        <option value="Excavation & Site Prep">Excavation &amp; Site Prep</option>
                        <option value="Retaining Walls (Armor Stone)">Retaining Walls (Armor Stone)</option>
                        <option value="Water & Sewer Trenching">Water &amp; Sewer Trenching</option>
                        <option value="Septic Installation">Septic Installation</option>
                        <option value="Concrete Solutions">Concrete Solutions</option>
                        <option value="Foundation Waterproofing">Foundation Waterproofing</option>
                        <option value="Other Heavy Civil">Other Heavy Civil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 font-mono">
                        MESSAGE
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project location and timeline..."
                        className="w-full text-sm border-zinc-300 rounded-none px-3 py-2.5 focus:ring-brand-red focus:border-brand-red"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-black hover:bg-brand-red text-white text-xs font-bold uppercase tracking-widest transition-colors shadow cursor-pointer font-mono"
                    >
                      SEND MESSAGE
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section with Interactive Regional Map */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1 font-mono">
            FIND US
          </span>
          <h3 className="text-3xl font-extrabold font-heading text-zinc-950 mb-2">
            SERVING KINGSTON &amp; CENTRAL EASTERN ONTARIO
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm font-mono">
            Kingston, ON • Frontenac County • Lennox &amp; Addington
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMap />
        </div>
      </section>

      {/* Prefer To Talk Now Banner */}
      <section className="bg-zinc-950 text-white py-16 text-center border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-extrabold font-heading mb-3">
            PREFER TO TALK NOW?
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            No phone trees, no hold music. Call us directly and we'll get your inspection scheduled right away.
          </p>
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest transition-colors shadow font-mono"
          >
            CALL {CONTACT_INFO.phone}
          </a>
        </div>
      </section>
    </div>
  );
};
