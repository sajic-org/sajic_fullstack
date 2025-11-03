import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/assets/logo_nova-branca.png"
            alt=""
            className={props.className}
        />
    );
}
