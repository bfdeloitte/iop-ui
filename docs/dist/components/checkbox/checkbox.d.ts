import '../icon/icon';
import BuckeyeElement from '../../internal/buckeye-element';
import type { BuckeyeFormControl } from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
export default class Checkbox extends BuckeyeElement implements BuckeyeFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    name: string;
    value: string;
    size: 'small' | 'medium' | 'large';
    disabled: boolean;
    checked: boolean;
    indeterminate: boolean;
    defaultChecked: boolean;
    form: string;
    required: boolean;
    get validity(): ValidityState;
    get validationMessage(): string;
    firstUpdated(): void;
    private handleClick;
    private handleBlur;
    private handleInput;
    private handleInvalid;
    private handleFocus;
    handleDisabledChange(): void;
    handleStateChange(): void;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    checkValidity(): boolean;
    getForm(): HTMLFormElement | null;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-checkbox': Checkbox;
    }
}
