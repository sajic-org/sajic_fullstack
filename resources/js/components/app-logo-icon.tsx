import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return (
    <img
      src="/assets/logo_branco.webp"
      alt=""
      className={props.className}
    />
  );
}
