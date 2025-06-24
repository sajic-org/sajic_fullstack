interface Props {
  name: string;
  img: string;
  link: string;
}

function DevCard({ name, img, link }: Props) {
  return (
    <li className="">
      <a
        href={link}
        title={name}
        className="group flex items-center gap-2"
      >
        <img
          src={img}
          alt={name}
          className="peer size-6 transition-transform duration-200 ease-in-out hover:scale-150"
        />

        <span className="hidden text-xs leading-tight font-semibold peer-hover:block">
          {name}
        </span>
      </a>
    </li>
  );
}

export default DevCard;
