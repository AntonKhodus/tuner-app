import React, { useEffect, useState } from 'react';
import { Tuner } from './components/Tuner/Tuner';
import { MainAudioContext } from './components/context';
import { IChainNode } from './types/types';

const App = () => {

  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [merger, setMerger] = useState<ChannelMergerNode>();
  const [context, setContext] = useState<AudioContext>();
  const [chain, setChain] = useState<Array<IChainNode>>([]);
  const [destination, setDestination] = useState<AudioDestinationNode>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0
          }
      }).then(mediaStream => {
          const ctx = new AudioContext();
          setContext(ctx);
          setDestination(ctx.destination);
          const src = ctx.createMediaStreamSource(mediaStream)
          setSource(src);
          const mrgr = ctx.createChannelMerger(1);
          setMerger(mrgr);
          src.connect(mrgr);
      })
  }, [])

  useEffect(() => {
    if(chain.length && merger && destination){
      merger.connect(chain[0].chainNodeInput);
      chain.forEach((item:IChainNode, i:number) => {
        if(i+1 < chain.length) item.chainNodeOutput.connect(chain[i+1].chainNodeInput);
        else item.chainNodeOutput.connect(destination);
      });
    }
    return () => {
      if(chain.length && merger && destination){
        chain.forEach((item:IChainNode, i:number) => {
          item.chainNodeInput.disconnect();
          item.chainNodeOutput.disconnect();
        });
      }
    }
  }, [chain]);

  return (
    <div className="App">
      {source && context && merger && chain &&
        <MainAudioContext.Provider value={{
          context: {context, setContext}, 
          chain: {chain, setChain}
        }}>
          <Tuner />
        </MainAudioContext.Provider>
      }
    </div>
  );
}

export default App;