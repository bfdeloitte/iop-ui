import '../button-group/button-group';
import '../button/button';
import '../dropdown/dropdown';
import '../icon/icon';
import '../input/input';
import '../visually-hidden/visually-hidden';
import BuckeyeElement from '../../internal/buckeye-element';
import type { BuckeyeFormControl } from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
import type Dropdown from '../dropdown/dropdown';
import type Input from '../input/input';
export default class ColorPicker extends BuckeyeElement implements BuckeyeFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    private isSafeValue;
    private readonly localize;
    base: HTMLElement;
    input: Input;
    dropdown: Dropdown;
    previewButton: HTMLButtonElement;
    trigger: HTMLButtonElement;
    private hasFocus;
    private isDraggingGridHandle;
    private isEmpty;
    private inputValue;
    private hue;
    private saturation;
    private brightness;
    private alpha;
    value: string;
    defaultValue: string;
    label: string;
    format: 'hex' | 'rgb' | 'hsl' | 'hsv';
    inline: boolean;
    size: 'small' | 'medium' | 'large';
    noFormatToggle: boolean;
    name: string;
    disabled: boolean;
    hoist: boolean;
    opacity: boolean;
    uppercase: boolean;
    swatches: string | string[];
    form: string;
    required: boolean;
    get validity(): ValidityState;
    get validationMessage(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private handleCopy;
    private handleFocusIn;
    private handleFocusOut;
    private handleFormatToggle;
    private handleAlphaDrag;
    private handleHueDrag;
    private handleGridDrag;
    private handleAlphaKeyDown;
    private handleHueKeyDown;
    private handleGridKeyDown;
    private handleInputChange;
    private handleInputInput;
    private handleInputKeyDown;
    private handleInputInvalid;
    private handleTouchMove;
    private parseColor;
    private setColor;
    private setLetterCase;
    private syncValues;
    private handleAfterHide;
    private handleEyeDropper;
    private selectSwatch;
    private getHexString;
    private stopNestedEventPropagation;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    handleValueChange(oldValue: string | undefined, newValue: string): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva'): string;
    checkValidity(): boolean;
    getForm(): HTMLFormElement | null;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-color-picker': ColorPicker;
    }
}