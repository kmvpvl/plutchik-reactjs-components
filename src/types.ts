/**List of emotions by Plutchik */
export enum Emotion {
    joy = 'joy',
    trust = 'trust',
    fear = 'fear',
    surprise = 'surprise',
    sadness = 'sadness',
    disgust = 'disgust',
    anger = 'anger',
    anticipation = 'anticipation',
}
/**List of complex emotions */
export enum ComplexEmotion {
    love = 'love',
    guilt = 'guilt',
    delight = 'delight',
    submission = 'submission',
    curiosity = 'curiosity',
    sentimentality = 'sentimentality',
    awe = 'awe',
    despair = 'despair',
    shame = 'shame',
    disappointment = 'disappointment',
    unbelief = 'unbelief',
    outrage = 'outrage',
    remorse = 'remorse',
    envy = 'envy',
    pessimism = 'pessimism',
    contempt = 'contempt',
    cynicism = 'cynicism',
    morbidness = 'morbidness',
    aggression = 'aggression',
    pride = 'pride',
    dominance = 'dominance',
    optimism = 'optimism',
    hope = 'hope',
    anxiety = 'anxiety',
}

export type EmotionType = keyof typeof Emotion
export type ComplexEmotionType = keyof typeof ComplexEmotion
/**Emotional vector interface*/
export interface IEmotionVector {
    joy: number
    trust: number
    fear: number
    surprise: number
    sadness: number
    disgust: number
    anger: number
    anticipation: number
}
/**
 * Emotional vector class can add vectors and scalar multiple
 * @constructor dkjd
 */
export class EmotionVector implements IEmotionVector {
    joy: number = 0
    trust: number = 0
    fear: number = 0
    surprise: number = 0
    sadness: number = 0
    disgust: number = 0
    anger: number = 0
    anticipation: number = 0
    /**
     * Creates new instance of emotional vector class
     *
     * @param [av] - IEmotionVector structure
     */

    constructor(ev?: IEmotionVector) {
        for (const i in Emotion) (this as any)[i] = ev === undefined ? 0 : (ev as any)[i]
    }

    /**Scalar multiplication of the emotional vector
     *
     * @a scalar number to mult every coord of vector
     */
    mult(a: number) {
        const v = Object.entries(this as IEmotionVector)
        for (const [i, f] of v) (this as any)[i] = f * a
    }

    add(av: IEmotionVector) {
        const v = Object.entries(this as IEmotionVector)
        for (const [i, f] of v) (this as any)[i] = f + (av as any)[i]
    }

    align(): EmotionVector {
        if (this.joy - this.sadness > 0) {
            this.joy = this.joy - this.sadness
            this.sadness = 0
        } else {
            this.sadness = this.sadness - this.joy
            this.joy = 0
        }
        if (this.trust - this.disgust > 0) {
            this.trust = this.trust - this.disgust
            this.disgust = 0
        } else {
            this.disgust = this.disgust - this.trust
            this.trust = 0
        }
        if (this.fear - this.anger > 0) {
            this.fear = this.fear - this.anger
            this.anger = 0
        } else {
            this.anger = this.anger - this.fear
            this.fear = 0
        }
        if (this.surprise - this.anticipation > 0) {
            this.surprise = this.surprise - this.anticipation
            this.anticipation = 0
        } else {
            this.anticipation = this.anticipation - this.surprise
            this.anticipation = 0
        }
        return this
    }
    norm(): EmotionVector {
        const arr = Object.entries(this)
        const v: any = {}
        Object.assign(v, this)
        const mx = arr.reduce((pEl, cEl) => (pEl[1] > cEl[1] ? pEl : cEl), [0, -1])[1]
        for (const el of arr) {
            v[el[0]] = el[1] / mx
            v[el[0]] = v[el[0]] < 0.1 ? 0.0 : v[el[0]]
        }
        Object.assign(this, v)
        return this
    }
}
