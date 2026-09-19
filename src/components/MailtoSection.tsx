import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

interface MailtoSectionProps {
  variant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

const MailtoSection: React.FC<MailtoSectionProps> = ({ 
  variant = 'gradient',
  className = '' 
}) => {
  const email = 'contact@furniturepolish.com';

  const getVariantStyles = () => {
    switch (variant) {
      case 'light':
        return {
          wrapper: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100',
          decorativeCircle1: 'bg-amber-200',
          decorativeCircle2: 'bg-orange-200',
          card: 'bg-white/90 backdrop-blur-sm border-amber-100',
          iconWrapper: 'from-amber-400 to-orange-500',
          title: 'text-gray-900',
          subtitle: 'text-gray-600',
          email: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
          emailText: 'text-white',
          divider: 'border-amber-200',
          note: 'text-gray-500',
        };
      case 'dark':
        return {
          wrapper: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
          decorativeCircle1: 'bg-amber-500/20',
          decorativeCircle2: 'bg-orange-500/20',
          card: 'bg-gray-800/90 backdrop-blur-sm border-gray-700',
          iconWrapper: 'from-amber-400 to-orange-500',
          title: 'text-white',
          subtitle: 'text-gray-300',
          email: 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400',
          emailText: 'text-gray-900',
          divider: 'border-gray-700',
          note: 'text-gray-400',
        };
      case 'gradient':
      default:
        return {
          wrapper: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600',
          decorativeCircle1: 'bg-white/10',
          decorativeCircle2: 'bg-white/10',
          card: 'bg-white/95 backdrop-blur-md border-white/30',
          iconWrapper: 'from-amber-500 to-orange-600',
          title: 'text-gray-900',
          subtitle: 'text-gray-600',
          email: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
          emailText: 'text-white',
          divider: 'border-amber-200',
          note: 'text-gray-500',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section className={`relative py-16 md:py-20 overflow-hidden ${styles.wrapper} ${className}`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-64 h-64 ${styles.decorativeCircle1} rounded-full blur-3xl opacity-60`}></div>
        <div className={`absolute -bottom-32 -left-32 w-96 h-96 ${styles.decorativeCircle2} rounded-full blur-3xl opacity-60`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${styles.decorativeCircle1} rounded-full blur-3xl opacity-30`}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`${styles.card} rounded-3xl shadow-2xl border p-8 md:p-12 text-center transform hover:scale-[1.02] transition-all duration-500`}>
          
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className={`relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${styles.iconWrapper} rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-3 transition-transform duration-300`}>
              <Mail className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
              {/* Floating sparkle */}
              <div className="absolute -top-2 -right-2 animate-pulse">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${styles.title} mb-3`}>
            Get In Touch With Us
          </h2>

          {/* Subtitle */}
          <p className={`text-base md:text-lg ${styles.subtitle} mb-8 max-w-xl mx-auto leading-relaxed`}>
            Have questions about our furniture polishing services? We'd love to hear from you. Reach out to us anytime.
          </p>

          {/* Email Button */}
          <a
            href={`mailto:${email}`}
            className={`group inline-flex items-center gap-3 bg-gradient-to-r ${styles.email} ${styles.emailText} px-8 py-4 md:px-10 md:py-5 rounded-2xl font-semibold text-lg md:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300`}
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
            <span>{email}</span>
          </a>

          {/* Divider */}
          <div className={`my-8 border-t ${styles.divider}`}></div>

          {/* Note */}
          <p className={`text-sm ${styles.note}`}>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              We typically respond within 24 hours
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MailtoSection;
