import {TABS, toLabel} from "@/app/genetic-data/lib/calculations";
import {TabKey} from "@/app/genetic-data/lib/types";
import s from "../page.module.scss";

type TabsProps = {
    tab: TabKey;
    onChangeTab: (tab: TabKey) => void;
}

export const Tabs = ({tab, onChangeTab}: TabsProps) => {
    return (
        <div className={s.tabs}>
            {TABS.map((tabKey) => (
                <button
                    key={tabKey}
                    className={`${s.tab} ${tab === tabKey ? s.tabActive : ""}`}
                    onClick={() => onChangeTab(tabKey)}
                    type="button"
                >
                    {toLabel(tabKey)}
                </button>
            ))}
        </div>
    );
};
