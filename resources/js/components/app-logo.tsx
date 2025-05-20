import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <AppLogoIcon className="h-auto w-24 text-white filter not-dark:invert dark:text-black" />

            <span className="mt-4 truncate text-base leading-none font-semibold">2025</span>
        </>
    );
}
