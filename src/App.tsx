import { useEffect, useState } from 'react';
import { Tuner } from './components/Tuner/Tuner';
import { MainAudioContext } from './components/context';
import { WidgetArea } from 'components/Layout/Widget/WidgerArea';

const App = () => {

  const [context] = useState<AudioContext>(new AudioContext());
  const [merger] = useState<ChannelMergerNode>(context.createChannelMerger(1));
  const [destination] = useState<AudioDestinationNode>(context.destination);
  const [widgets, setWidgets] = useState<Array<{id: number, component: JSX.Element}>>([
    { id: 0, component: <Tuner id={0}/>}
  ])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0
        }
    }).then(mediaStream => {
        const src = context.createMediaStreamSource(mediaStream)
        src.connect(merger);
    })
  }, [])

  const addTuner = () => {
    if(widgets.length) setWidgets([...widgets, { id: widgets[widgets.length-1].id+1, component: <Tuner id={widgets[widgets.length-1].id+1}/>}])
    else  setWidgets([...widgets, { id: 0, component: <Tuner id={0}/>}])
  }

  return (
    <div className="App">
      <div className="container">
        {context &&
          <MainAudioContext.Provider value={{context: context, updateWidgets: setWidgets}}>
            <WidgetArea widgets={widgets} input={merger} output={destination}/>
          </MainAudioContext.Provider>
        }
        <button onClick={addTuner}>Add Tuner</button>
      </div>
    </div>
  );
}

export default App;