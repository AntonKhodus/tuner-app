import React from "react";
import { IChainNode } from "types/types";


interface IMainAudioContext {
    context: BaseAudioContext,
    updateWidgets: React.Dispatch<React.SetStateAction<{
        id: number;
        component: JSX.Element;
    }[]>>
}

export const MainAudioContext = React.createContext<IMainAudioContext>({context: new AudioContext, updateWidgets: () => {}});

interface IWidgetAreaContext {
    chain: Function,
}

export const WidgetAreaContext = React.createContext<IWidgetAreaContext>({chain: () => {}});

interface IWidgetUpdateChain {
    updateChain: React.Dispatch<React.SetStateAction<IChainNode[] | undefined>>,
}

export const WidgetUpdateChain = React.createContext<IWidgetUpdateChain>({updateChain: () =>{}})

interface IWidgetFrameContext {
    body: {
        hidden: boolean
    },
    setBody: Function,
    destroy: Function
}

export const WidgetFrameContext = React.createContext<IWidgetFrameContext>({body: {hidden: false}, setBody: ()=>{}, destroy: () => {}});