export class Tuner{
    
    private analyser: AnalyserNode;
    private bufferData: Float32Array;
    private A4: number;
    private notes: string[] = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

    constructor(analyser:AnalyserNode, A4 = 440){
        this.analyser = analyser;
        this.A4 = A4;
        this.bufferData = new Float32Array(this.analyser.frequencyBinCount);
    }

    public getTunerData = ():[string,number] | false => {
        const pitch = this.autoCorrelate(this.updateBufferData(), this.analyser.context.sampleRate);
        if(!pitch) return false;
        const noteNum = Math.round(12 * (Math.log( pitch / this.A4 )/Math.log(2) ))+69;
        const aim = this.A4 * Math.pow(2,(noteNum - 69)/12);
        const cents = Math.floor( 1200 * Math.log( pitch / aim)/Math.log(2) );
        return [this.notes[noteNum%12], cents];
    }

    private updateBufferData = ():Float32Array => {
        this.analyser.getFloatTimeDomainData(this.bufferData);
        return this.bufferData;
    }

    private autoCorrelate = ( buffer:Float32Array, sampleRate:number ): number | false => {
        // Implements the ACF2+ algorithm
        let bufferSize = buffer.length;

        let rms = 0;
        buffer.forEach(item => {rms += item**2});
        rms = Math.sqrt(rms/bufferSize);
        if (rms<0.01) return false; // Not enough signal
    
        let r1=0, r2=bufferSize-1, thresh=0.2;
        for (let i=0; i<bufferSize/2; i++)
            if (Math.abs(buffer[i])<thresh) { r1=i; break; }
        for (let i=1; i<bufferSize/2; i++)
            if (Math.abs(buffer[bufferSize-i])<thresh) { r2=bufferSize-i; break; }
    
        buffer = buffer.slice(r1,r2);
        bufferSize = buffer.length;
    
        let c = new Array(bufferSize).fill(0);
        for (let i=0; i<bufferSize; i++)
            for (let j=0; j<bufferSize-i; j++)
                c[i] = c[i] + buffer[j]*buffer[j+i];        
    
        let d=0; while (c[d]>c[d+1]) d++;
        let maxval=-1, maxpos=-1;
        for (let i=d; i<bufferSize; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
        let T0 = maxpos;
    
        let x1=c[T0-1], x2=c[T0], x3=c[T0+1];
        let a = (x1 + x3 - 2*x2)/2;
        let b = (x3 - x1)/2;
        if (a) T0 = T0 - b/(2*a);
    
        return sampleRate/T0;
    }
}