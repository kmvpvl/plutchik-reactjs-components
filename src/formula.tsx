import React from 'react'
import { ComplexEmotion, Emotion, IEmotionVector } from './types'
import { ML } from './mlstrings'

export interface IFormulaProps {
    language?: string
    complexEmotion?: ComplexEmotion
    className?: string
    upperCase?: boolean
    vector?: IEmotionVector
    showAllComplexEmotions?: boolean
}

export interface IFormulaState {}

export default class Formula extends React.Component<IFormulaProps, IFormulaState> {
    render(): React.ReactNode {
        const str: Array<[string, number]> = []
        if (this.props.complexEmotion !== undefined) {
            const f = formulas.filter((v) => v[0] === this.props.complexEmotion)[0]
            str.push([
                `${ML(f[0] as ComplexEmotion, this.props.language)} = ${ML(f[1][0] as Emotion, this.props.language)} + ${ML(f[1][1] as Emotion, this.props.language)}`,
                0,
            ])
        }
        if (this.props.vector !== undefined) {
            const nonZeros = Object.entries(this.props.vector).filter((el) => el[1] !== 0)
            if (nonZeros.length === 2) {
                const emList = Array.from(nonZeros, (el) => el[0])
                const fForm = formulas.filter((pair) => pair[1][0] === emList[0] || pair[1][1] === emList[0])
                const sForm = fForm.filter((pair) => pair[1][0] === emList[1] || pair[1][1] === emList[1])
                if (sForm.length === 1)
                    str.push([
                        `${ML(sForm[0][0] as ComplexEmotion, this.props.language)} = ${Array.from(emList, (el) => ML(el, this.props.language)).join(' + ')}`,
                        0,
                    ])
            } else if (nonZeros.length > 2 && this.props.showAllComplexEmotions) {
                const emList = Array.from(nonZeros, (el) => el[0])
                while (emList.length > 1) {
                    const em1 = emList.pop() as Emotion
                    for (const em2 of emList as [Emotion]) {
                        const fForm = formulas.filter((pair) => pair[1][0] === em1 || pair[1][1] === em1)
                        const sForm = fForm.filter((pair) => pair[1][0] === em2 || pair[1][1] === em2)
                        if (sForm.length === 1)
                            str.push([
                                `${ML(sForm[0][0] as ComplexEmotion, this.props.language)} = ${ML(em1, this.props.language)} + ${ML(em2, this.props.language)}`,
                                this.props.vector[em1] ** 2 + this.props.vector[em2] ** 2,
                            ])
                    }
                }
            }
        }
        str.sort((a, b) => b[1] - a[1])
        return (
            <div className={this.props.className}>
                {str.map((s, i) => (
                    <div key={i}>{this.props.upperCase ? s[0].toUpperCase() : s[0]}</div>
                ))}
            </div>
        )
    }
}

const formulas: (Emotion[] | ComplexEmotion)[][] = [
    [ComplexEmotion.love, [Emotion.joy, Emotion.trust]],
    [ComplexEmotion.guilt, [Emotion.joy, Emotion.fear]],
    [ComplexEmotion.delight, [Emotion.joy, Emotion.surprise]],
    [ComplexEmotion.submission, [Emotion.trust, Emotion.fear]],
    [ComplexEmotion.curiosity, [Emotion.trust, Emotion.surprise]],
    [ComplexEmotion.sentimentality, [Emotion.trust, Emotion.sadness]],
    [ComplexEmotion.awe, [Emotion.fear, Emotion.surprise]],
    [ComplexEmotion.despair, [Emotion.fear, Emotion.sadness]],
    [ComplexEmotion.shame, [Emotion.fear, Emotion.disgust]],
    [ComplexEmotion.disappointment, [Emotion.surprise, Emotion.sadness]],
    [ComplexEmotion.unbelief, [Emotion.surprise, Emotion.disgust]],
    [ComplexEmotion.outrage, [Emotion.surprise, Emotion.anger]],
    [ComplexEmotion.remorse, [Emotion.sadness, Emotion.disgust]],
    [ComplexEmotion.envy, [Emotion.sadness, Emotion.anger]],
    [ComplexEmotion.pessimism, [Emotion.sadness, Emotion.anticipation]],
    [ComplexEmotion.contempt, [Emotion.disgust, Emotion.anger]],
    [ComplexEmotion.cynicism, [Emotion.disgust, Emotion.anticipation]],
    [ComplexEmotion.morbidness, [Emotion.disgust, Emotion.joy]],
    [ComplexEmotion.aggression, [Emotion.anger, Emotion.anticipation]],
    [ComplexEmotion.pride, [Emotion.anger, Emotion.joy]],
    [ComplexEmotion.dominance, [Emotion.anger, Emotion.trust]],
    [ComplexEmotion.optimism, [Emotion.anticipation, Emotion.joy]],
    [ComplexEmotion.hope, [Emotion.anticipation, Emotion.trust]],
    [ComplexEmotion.anxiety, [Emotion.anticipation, Emotion.fear]],
]
