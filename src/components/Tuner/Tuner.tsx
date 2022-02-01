import React, { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen/TunerScreen";
import { MainAudioContext } from '../context';
import { IMainAudioContext } from "../../types/types";
import { PitchReader } from "../../classes/PitchReader";

export const Tuner: React.FC = () => {

    const {context, chain} = useContext(MainAudioContext) as IMainAudioContext;
    const [analyser, setAnalyser] = useState<AnalyserNode>();

    useEffect(() => {
        const anlsr = new AnalyserNode(context.context);
        anlsr.fftSize = 32768;
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
        const pr = new PitchReader(anlsr);
        pr.readOnce(1000).then(response => {
            console.log(response);
        });
    }, []);



    return (
        <div className="tuner-wrapper">

        </div>
    );
}