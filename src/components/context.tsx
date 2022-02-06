import React from "react";

export const MainAudioContext = React.createContext({});

interface IWidgetFrameContext {
    body: {
        hidden: boolean
    },
    setBody: Function
}
export const WidgetFrameContext = React.createContext<IWidgetFrameContext>({body: {hidden: false}, setBody: function(){}});