import '../icon/icon';
import '../popup/popup';
import '../tag/tag';
import BuckeyeElement from '../../internal/buckeye-element';
import type { BuckeyeFormControl } from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
import type Option from '../option/option';
import type Popup from '../popup/popup';
export default class SlSelect extends BuckeyeElement implements BuckeyeFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    private readonly hasSlotController;
    private readonly localize;
    private typeToSelectString;
    private typeToSelectTimeout;
    popup: Popup;
    combobox: HTMLSlotElement;
    displayInput: HTMLInputElement;
    valueInput: HTMLInputElement;
    listbox: HTMLSlotElement;
    private hasFocus;
    displayLabel: string;
    currentOption: Option;
    selectedOptions: Option[];
    name: string;
    value: string | string[];
    defaultValue: string | string[];
    size: 'small' | 'medium' | 'large';
    placeholder: string;
    multiple: boolean;
    maxOptionsVisible: number;
    disabled: boolean;
    clearable: boolean;
    open: boolean;
    hoist: boolean;
    filled: boolean;
    pill: boolean;
    label: string;
    placement: 'top' | 'bottom';
    helpText: string;
    form: string;
    required: boolean;
    get validity(): ValidityState;
    get validationMessage(): string;
    connectedCallback(): void;
    private addOpenListeners;
    private removeOpenListeners;
    private handleFocus;
    private handleBlur;
    private handleDocumentFocusIn;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    private handleLabelClick;
    private handleComboboxMouseDown;
    private handleComboboxKeyDown;
    private handleClearClick;
    private handleClearMouseDown;
    private handleOptionClick;
    private handleDefaultSlotChange;
    private handleTagRemove;
    private getAllOptions;
    private getFirstOption;
    private setCurrentOption;
    private setSelectedOptions;
    private toggleOptionSelection;
    private selectionChanged;
    private handleInvalid;
    handleDisabledChange(): void;
    handleValueChange(): void;
    handleOpenChange(): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    checkValidity(): boolean;
    getForm(): HTMLFormElement | null;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-select': SlSelect;
    }
}
