export interface IMainAudioContext {
    context: {
        context: AudioContext,
        setContext: React.Dispatch<React.SetStateAction<AudioContext | undefined>>
    },
    chain: {
        chain: IChainNode[] | undefined;
        setChain: React.Dispatch<React.SetStateAction<IChainNode[] | undefined>>;
    }
}

export interface IChainNode {
    chainNodeInput : AudioNode,
    chainNodeOutput : AudioNode
}