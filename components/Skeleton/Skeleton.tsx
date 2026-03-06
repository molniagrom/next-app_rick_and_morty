import s from "./Skeleton.module.scss";

type SkeletonProps = {
    className?: string;
    label?: string;
}

export const Skeleton = ({className = "", label = "Loading content"}: SkeletonProps) => {
    return <span className={`${s.skeleton} ${className}`.trim()} aria-label={label} role="status"/>;
};
