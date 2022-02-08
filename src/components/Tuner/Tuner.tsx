import { useContext, useEffect, useState } from "react"
import { TunerScreen } from "./TunerScreen";
import { MainAudioContext, WidgetUpdateChain } from "../context";
import { WidgetFrame } from "components/Layout/Widget/WidgetFrame";
import { TunerEngine } from "./TunerEngine";
import { WidgetSettings } from "components/Layout/Widget/WidgetSettings";

interface IAudioNodes {
    input: GainNode,
    analyser: AnalyserNode,
    output: GainNode
}

export const Tuner: React.FC<{id: number}> = ({id}) => {

    const {updateChain} = useContext(WidgetUpdateChain);

    const {context, updateWidgets} = useContext(MainAudioContext);
    const [tuner, setTuner] = useState<TunerEngine>()
    const [tunerData, setTunerData] = useState<[string,number]>();
    const [audioNodes] = useState<IAudioNodes>({
        input: new GainNode(context),
        analyser: new AnalyserNode(context),
        output: new GainNode(context)
    });
    const [chainObj, setChainObj] = useState<{chainNodeInput: GainNode; chainNodeOutput: GainNode;}>();

    useEffect(() => {
        const audioNodesList = Object.entries(audioNodes);
        audioNodes.input.gain.value = 10;
        audioNodes.output.gain.value = 0.1;
        audioNodes.analyser.fftSize = 16384;
        audioNodesList.forEach((node, id) => {if(audioNodesList[id+1]) node[1].connect(audioNodesList[id+1][1])});
        let chObj = {chainNodeInput: audioNodes.input, chainNodeOutput: audioNodes.output};
        setChainObj(chObj);
        updateChain((prev) => {
            if(prev) return [...prev, chObj];
            else return [chObj];
        })
        setTuner(new TunerEngine(audioNodes.analyser, setTunerData));
        return () => {
            audioNodesList.forEach((node, id) => {node[1].disconnect()});
        };
    }, []);

    useEffect(() => {
        return () => {
            tuner && tuner.destroy();
        }
    },[tuner]);

    const destroy = (id:number) => {
        return () => {
            updateChain(prev => {
                if(prev) {
                    for (const i in prev) if(prev[i] === chainObj) prev.splice(+i, 1);
                    return [...prev];
                }
            });
            updateWidgets((prev) => {
                for (const i in prev) if(prev[+i].id === id) prev.splice(+i, 1);
                return [...prev];
            });
        }
    }

    return (
        <WidgetFrame destroy={destroy(id)} >
            <TunerScreen tunerData={tuner && tunerData}/>
            <WidgetSettings>
                
            </WidgetSettings>
        </WidgetFrame>
    );
}