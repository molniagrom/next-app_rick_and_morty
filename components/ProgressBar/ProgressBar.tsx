import s from "./ProgressBar.module.scss";

type ProgressBarProps = {
    value?: number;
    max?: number;
    label?: string;
    className?: string;
}

export const ProgressBar = ({value, max = 100, label, className = ""}: ProgressBarProps) => {
    const isDeterminate = typeof value === "number";
    const safeValue = isDeterminate ? Math.max(0, Math.min(value, max)) : undefined;
    const width = isDeterminate ? `${(safeValue! / max) * 100}%` : undefined;
    const rootClassName = `${s.root} ${className}`.trim();

    return (
        <div className={rootClassName} role="status" aria-label={label ?? "Loading progress"}>
            <div
                className={`${s.track} ${!isDeterminate ? s.indeterminate : ""}`.trim()}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={safeValue}
            >
                <span className={s.fill} style={width ? {width} : undefined}/>
            </div>
            {label && <p className={s.label}>{label}</p>}
        </div>
    );
};
