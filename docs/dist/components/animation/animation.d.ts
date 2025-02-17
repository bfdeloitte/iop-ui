import BuckeyeElement from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
export default class SlAnimation extends BuckeyeElement {
    static styles: CSSResultGroup;
    private animation?;
    private hasStarted;
    defaultSlot: Promise<HTMLSlotElement>;
    name: string;
    play: boolean;
    delay: number;
    direction: PlaybackDirection;
    duration: number;
    easing: string;
    endDelay: number;
    fill: FillMode;
    iterations: number;
    iterationStart: number;
    keyframes?: Keyframe[];
    playbackRate: number;
    get currentTime(): number;
    set currentTime(time: number);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleAnimationFinish;
    private handleAnimationCancel;
    private handleSlotChange;
    private createAnimation;
    private destroyAnimation;
    handleAnimationChange(): void;
    handlePlayChange(): boolean;
    handlePlaybackRateChange(): void;
    cancel(): void;
    finish(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-animation': Animation;
    }
}
