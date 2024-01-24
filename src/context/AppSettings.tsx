import React, { Dispatch, createContext, useContext, useReducer } from 'react';

export type GlobalState = {
    [key: string]: any;
};

type Action =
    | { type: 'UPDATE_PARAMETER'; payload: { key: string; value: any } }

export const globalStateReducer = (state: GlobalState, action: Action): GlobalState => {
    switch (action.type) {
        case 'UPDATE_PARAMETER':
            return { ...state, [action.payload.key]: action.payload.value };
        default:
            return state;
    }
};


export const GlobalStateContext = createContext<{
    state: GlobalState;
    dispatch: Dispatch<Action>;
} | undefined>(undefined);

const defaultState: GlobalState = {
    defaultLife: 50,
    useImage: true,
};

export const GlobalStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, defaultState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;

export const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

/*
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
*/