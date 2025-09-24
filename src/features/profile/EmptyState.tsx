import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  message?: string;
  description?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message = 'هیچ آیتمی برای نمایش وجود ندارد', description, className = '' }) => {
  return (
    <div className={`flex flex-col justify-center items-center p-6 gap-y-4 text-text/60 ${className}`}>
      {icon && icon}
      <p className="text-center text-base md:text-xl font-medium">{message}</p>
      {description && <p className="text-center text-sm md:text-base text-text/80">{description}</p>}
    </div>
  );
};

export default EmptyState;
