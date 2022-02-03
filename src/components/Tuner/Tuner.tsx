import { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen/TunerScreen";
import { MainAudioContext } from '../context';
import { IMainAudioContext } from "../../types/types";
import { FrequencyReader } from "../../libs/FrequencyReader";
import { WidgetFrame } from "../Layout/WidgetFrame";

interface IAudioNodes {
    input: GainNode,
    analyser: AnalyserNode,
    output: GainNode
}

export const Tuner: React.FC = () => {

    const {context, chain} = useContext(MainAudioContext) as IMainAudioContext;
    const [A4, setA4] = useState<number>(440);
    const [audioNodes, setAudioNodes] = useState<IAudioNodes>({
        input: new GainNode(context.context),
        analyser: new AnalyserNode(context.context),
        output: new GainNode(context.context)
    });
    const [tunerData, setTunerData] = useState<[string, number]>();

    useEffect(() => {
        const audioNodesList = Object.entries(audioNodes);
        const notes: string[] = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        audioNodes.input.gain.value = 10;
        audioNodes.output.gain.value = 0.5;
        audioNodes.analyser.fftSize = 4096;
        audioNodesList.forEach((node, id) => {if(audioNodesList[id+1]) node[1].connect(audioNodesList[id+1][1])});
        chain.setChain(prev => {
            let obj = {chainNodeInput: audioNodes.input, chainNodeOutput: audioNodes.output};
            if(prev) return [...prev, obj];
            else return [obj];
        })
        
        const tunerLoop = setInterval(() => {
            const pitch = FrequencyReader.getFrequency(audioNodes.analyser);
            if(pitch){
                const noteNum = Math.round(12 * (Math.log( pitch / A4 )/Math.log(2) ))+69;
                const aim = A4 * Math.pow(2,(noteNum - 69)/12);
                const cents = Math.floor( 1200 * Math.log( pitch / aim)/Math.log(2) );
                setTunerData([notes[noteNum%12], cents]);
            }
        }, 1000/10)
        return () => {
            clearInterval(tunerLoop);
            audioNodesList.forEach((node, id) => {node[1].disconnect()});
        };
    }, []);

    useEffect(() => {
        if(tunerData){
            console.log(tunerData);
        }
    },[tunerData]);



    return (
        <WidgetFrame>
            
        </WidgetFrame>
    );
}