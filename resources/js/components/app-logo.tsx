import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <AppLogoIcon className="h-auto w-24 text-white filter not-dark:invert dark:text-black" />

            <span className="mt-3.5 truncate text-base text-sm leading-none font-semibold">2025</span>
        </>
    );
}
