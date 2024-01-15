import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface AppSettingsState {
    defaultLifePoints: number;
    useImage: boolean;
}

const AppSettingsContext = createContext<{
    settings: AppSettingsState;
    setSettings: React.Dispatch<React.SetStateAction<AppSettingsState>>;
}>({
    settings: {
        defaultLifePoints: 50,
        useImage: true
    },
    setSettings: () => { }
});

export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettingsState>({
        defaultLifePoints: 50,
        useImage: true
    });

    return (
        <AppSettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
