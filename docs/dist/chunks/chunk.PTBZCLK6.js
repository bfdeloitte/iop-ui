import {
  textarea_styles_default
} from "./chunk.35X7JAH5.js";
import {
  l as l2
} from "./chunk.MYLHODQX.js";
import {
  defaultValue
} from "./chunk.URL2FFBH.js";
import {
  FormControlController
} from "./chunk.2NG3IXEM.js";
import {
  l
} from "./chunk.ECDOB2MG.js";
import {
  HasSlotController
} from "./chunk.WVHZIUTV.js";
import {
  o
} from "./chunk.26WLO5GK.js";
import {
  watch
} from "./chunk.VQ3XOPCT.js";
import {
  BuckeyeElement,
  e,
  e2,
  i,
  t
} from "./chunk.5DKFNGO3.js";
import {
  x
} from "./chunk.D4QE2MLU.js";
import {
  __decorateClass
} from "./chunk.LKA3TPUC.js";

// src/components/textarea/textarea.ts
var Textarea = class extends BuckeyeElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["bui-blur", "bui-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.hasFocus = false;
    this.title = "";
    this.name = "";
    this.value = "";
    this.size = "medium";
    this.filled = false;
    this.label = "";
    this.helpText = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
    this.defaultValue = "";
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("bui-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    this.emit("bui-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("bui-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.emit("bui-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  setTextareaHeight() {
    if (this.resize === "auto") {
      this.input.style.height = "auto";
      this.input.style.height = `${this.input.scrollHeight}px`;
    } else {
      this.input.style.height = void 0;
    }
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleRowsChange() {
    this.setTextareaHeight();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
    this.setTextareaHeight();
  }
  /** Sets focus on the textarea. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }
  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number")
        this.input.scrollTop = position.top;
      if (typeof position.left === "number")
        this.input.scrollLeft = position.left;
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode) {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return x`
      <div
        part="form-control"
        class=${o({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${o({
      textarea: true,
      "textarea--small": this.size === "small",
      "textarea--medium": this.size === "medium",
      "textarea--large": this.size === "large",
      "textarea--standard": !this.filled,
      "textarea--filled": this.filled,
      "textarea--disabled": this.disabled,
      "textarea--focused": this.hasFocus,
      "textarea--empty": !this.value,
      "textarea--resize-none": this.resize === "none",
      "textarea--resize-vertical": this.resize === "vertical",
      "textarea--resize-auto": this.resize === "auto"
    })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${l(this.name)}
              .value=${l2(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l(this.placeholder)}
              rows=${l(this.rows)}
              minlength=${l(this.minlength)}
              maxlength=${l(this.maxlength)}
              autocapitalize=${l(this.autocapitalize)}
              autocorrect=${l(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${l(this.spellcheck)}
              enterkeyhint=${l(this.enterkeyhint)}
              inputmode=${l(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
      </div>
    `;
  }
};
Textarea.styles = textarea_styles_default;
__decorateClass([
  i(".textarea__control")
], Textarea.prototype, "input", 2);
__decorateClass([
  t()
], Textarea.prototype, "hasFocus", 2);
__decorateClass([
  e2()
], Textarea.prototype, "title", 2);
__decorateClass([
  e2()
], Textarea.prototype, "name", 2);
__decorateClass([
  e2()
], Textarea.prototype, "value", 2);
__decorateClass([
  e2({ reflect: true })
], Textarea.prototype, "size", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Textarea.prototype, "filled", 2);
__decorateClass([
  e2()
], Textarea.prototype, "label", 2);
__decorateClass([
  e2({ attribute: "help-text" })
], Textarea.prototype, "helpText", 2);
__decorateClass([
  e2()
], Textarea.prototype, "placeholder", 2);
__decorateClass([
  e2({ type: Number })
], Textarea.prototype, "rows", 2);
__decorateClass([
  e2()
], Textarea.prototype, "resize", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Textarea.prototype, "disabled", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Textarea.prototype, "readonly", 2);
__decorateClass([
  e2({ reflect: true })
], Textarea.prototype, "form", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], Textarea.prototype, "required", 2);
__decorateClass([
  e2({ type: Number })
], Textarea.prototype, "minlength", 2);
__decorateClass([
  e2({ type: Number })
], Textarea.prototype, "maxlength", 2);
__decorateClass([
  e2()
], Textarea.prototype, "autocapitalize", 2);
__decorateClass([
  e2()
], Textarea.prototype, "autocorrect", 2);
__decorateClass([
  e2()
], Textarea.prototype, "autocomplete", 2);
__decorateClass([
  e2({ type: Boolean })
], Textarea.prototype, "autofocus", 2);
__decorateClass([
  e2()
], Textarea.prototype, "enterkeyhint", 2);
__decorateClass([
  e2({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], Textarea.prototype, "spellcheck", 2);
__decorateClass([
  e2()
], Textarea.prototype, "inputmode", 2);
__decorateClass([
  defaultValue()
], Textarea.prototype, "defaultValue", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], Textarea.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("rows", { waitUntilFirstUpdate: true })
], Textarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], Textarea.prototype, "handleValueChange", 1);
Textarea = __decorateClass([
  e("bui-textarea")
], Textarea);

export {
  Textarea
};
