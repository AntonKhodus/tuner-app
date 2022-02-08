import { WidgetUpdateChain } from "components/context";
import React, { useEffect, useState } from "react";
import { IChainNode } from "types/types"

interface WidgetAreaProps {
    widgets: Array<{id: number, component: JSX.Element}>,
    input: AudioNode,
    output: AudioDestinationNode
}

export const WidgetArea: React.FC<WidgetAreaProps> = ({widgets, input, output}) => {

    const [chain, setChain] = useState<Array<IChainNode>>();

    useEffect(() => {
        if(chain && chain.length) {
            for (const id in chain) {
                if(chain[+id+1]) chain[id].chainNodeOutput.connect(chain[+id+1].chainNodeInput);
                else chain[id].chainNodeOutput.connect(output);
            }
            input.connect(chain[0].chainNodeInput);
        } else input.connect(output);

        return () => {
            input.disconnect(); output.disconnect();
            if(chain && chain.length) for (const node of chain) node.chainNodeOutput.disconnect();
        }
    }, [chain]);

    return (
        <WidgetUpdateChain.Provider value={{updateChain: setChain}}>{widgets.map((comp) => {
            return (
                <React.Fragment key={"widget_"+comp.id}>
                    {comp.component}
                </React.Fragment>
            );
        })}</WidgetUpdateChain.Provider>
    )
}