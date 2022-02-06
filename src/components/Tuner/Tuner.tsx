import { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen";
import { MainAudioContext } from "../context";
import { IMainAudioContext } from "types/types";
import { WidgetFrame } from "components/Layout/Widget/WidgetFrame";
import { TunerEngine } from "./TunerEngine";
import { WidgetSettings } from "components/Layout/Widget/WidgetSettings";

interface IAudioNodes {
    input: GainNode,
    analyser: AnalyserNode,
    output: GainNode
}

export const Tuner: React.FC = () => {

    const {context, chain} = useContext(MainAudioContext) as IMainAudioContext;
    const [tuner, setTuner] = useState<TunerEngine>()
    const [tunerData, setTunerData] = useState<[string,number]>();
    const [audioNodes] = useState<IAudioNodes>({
        input: new GainNode(context.context),
        analyser: new AnalyserNode(context.context),
        output: new GainNode(context.context)
    });

    useEffect(() => {
        const audioNodesList = Object.entries(audioNodes);
        audioNodes.input.gain.value = 10;
        audioNodes.output.gain.value = 0.1;
        audioNodes.analyser.fftSize = 16384;
        audioNodesList.forEach((node, id) => {if(audioNodesList[id+1]) node[1].connect(audioNodesList[id+1][1])});
        chain.setChain(prev => {
            let obj = {chainNodeInput: audioNodes.input, chainNodeOutput: audioNodes.output};
            if(prev) return [...prev, obj];
            else return [obj];
        })
        setTuner(new TunerEngine(audioNodes.analyser, setTunerData));
        return () => {
            tuner && tuner.destroy();
            audioNodesList.forEach((node, id) => {node[1].disconnect()});
        };
    }, []);


    return (
        <WidgetFrame>
            <TunerScreen tunerData={tuner && tunerData}/>
            <WidgetSettings>
                
            </WidgetSettings>
        </WidgetFrame>
    );
}