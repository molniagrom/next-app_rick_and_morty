import s from "../page.module.scss";

export type FavoritesTab = "characters" | "locations" | "episodes";

export type FavoritesTabOption = {
    key: FavoritesTab;
    label: string;
}

type FavoritesTabsProps = {
    tabs: FavoritesTabOption[];
    activeTab: FavoritesTab;
    onChangeTab: (tab: FavoritesTab) => void;
}

export const FavoritesTabs = ({tabs, activeTab, onChangeTab}: FavoritesTabsProps) => {
    return (
        <div className={s.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`${s.tab} ${activeTab === tab.key ? s.tabActive : ""}`}
                    onClick={() => onChangeTab(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
