import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ className = '' }: { className?: string }) {
  return (
    <>
      <AppLogoIcon
        className={cn(
          'h-auto w-24 text-white filter not-dark:invert dark:text-black',
          className,
        )}
      />

      <span className="mt-4 truncate text-base leading-none font-semibold">
        2025
      </span>
    </>
  );
}
