import '../icon-button/icon-button';
import BuckeyeElement from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
export default class Dialog extends BuckeyeElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    private readonly localize;
    private modal;
    private originalTrigger;
    dialog: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    open: boolean;
    label: string;
    noHeader: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private requestClose;
    private addOpenListeners;
    private removeOpenListeners;
    private handleDocumentKeyDown;
    handleOpenChange(): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-dialog': Dialog;
    }
}
