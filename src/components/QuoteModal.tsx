import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../data/siteData';

interface QuoteModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  initialService,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'excavation',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-white text-zinc-950 w-full max-w-xl shadow-2xl relative border border-zinc-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-950">
              QUOTE REQUEST DISPATCHED
            </h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Reference Ticket: <strong className="text-zinc-900 font-bold">{ticketId}</strong>
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>. Our chief estimator will review your site location and contact you within 24 hours to schedule the complimentary on-site survey.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Back To Site
              </button>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="px-6 py-3 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold uppercase tracking-widest text-center"
              >
                Call For Immediate Dig Dispatch
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-6 border-b border-zinc-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono block mb-1">
                Zero Obligation • Fast Turnaround
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-950">
                REQUEST A FREE ESTIMATE
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Tell us about your property. Itemized written bids delivered within 48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John MacDonald"
                    className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(613) 000-0000"
                    className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                    Service Scope
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red bg-white font-mono"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">Other Heavy Earthmoving</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                    Job Location / Municipality
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kingston East, Rideau Lakes"
                    className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 font-mono">
                  Project Notes &amp; Bedrock Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your site, timeline, and whether bedrock or steep slopes are present..."
                  className="w-full text-sm border-zinc-300 rounded-none px-3.5 py-2.5 focus:ring-brand-red focus:border-brand-red"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-zinc-950 hover:bg-brand-red text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors shadow cursor-pointer"
                >
                  Submit Estimate Request
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center font-mono pt-1">
                🔒 WSIB Certified • $5M Liability Insured • Full Locate Coordination
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
