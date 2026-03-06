import s from "./Loader.module.scss";

type LoaderProps = {
    className?: string;
    label?: string;
}

export const Loader = ({className = "", label = "Loading"}: LoaderProps) => {
    return <span className={`${s.loader} ${className}`.trim()} role="status" aria-label={label}/>;
};
