import React, { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen/TunerScreen";
import { MainAudioContext } from '../context';
import { IChainNode, IMainAudioContext } from "../../types/types";

export const Tuner: React.FC = () => {

    // console.log(new AudioNode());
    const {context, chain} = useContext(MainAudioContext) as IMainAudioContext;
    const [analyser, setAnalyser] = useState<AnalyserNode>();

    useEffect(() => {
        const anlsr = new AnalyserNode(context.context);
        setAnalyser(anlsr);
        chain.setChain(prev => {
            if(prev){
                return [...prev, {
                    chainNodeInput: anlsr,
                    chainNodeOutput: anlsr
                }]
            } else {
                return [{
                    chainNodeInput: anlsr,
                    chainNodeOutput: anlsr
                }]
            }
        })
    }, []);



    return (
        <div className="tuner-wrapper">

        </div>
    );
}