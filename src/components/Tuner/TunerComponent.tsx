import React, { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen/TunerScreen";
import { MainAudioContext } from '../context';
import { IMainAudioContext } from "../../types/types";
import { Tuner } from "../../classes/Tuner";

export const TunerComponent: React.FC = () => {

    const {context, chain} = useContext(MainAudioContext) as IMainAudioContext;
    // const [analyser, setAnalyser] = useState<AnalyserNode>();

    useEffect(() => {
        const anlsr = new AnalyserNode(context.context);
        const input = new GainNode(context.context);
        const output = new GainNode(context.context);
        input.gain.value = 10;
        output.gain.value = 0.5;
        input.connect(anlsr);
        anlsr.connect(output);
        anlsr.fftSize = 32768;
        chain.setChain(prev => {
            if(prev){
                return [...prev, {
                    chainNodeInput: input,
                    chainNodeOutput: output
                }]
            } else {
                return [{
                    chainNodeInput: input,
                    chainNodeOutput: output
                }]
            }
        })
        const tuner = new Tuner(anlsr);
        setInterval(() => {
            const tunerData = tuner.getTunerData();
            if(tunerData){
                
            }
        }, 1000/20)
    }, []);



    return (
        <div className="tuner-wrapper">

        </div>
    );
}