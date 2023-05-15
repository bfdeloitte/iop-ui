import {
  component_styles_default
} from "./chunk.T6URVWFA.js";
import {
  i
} from "./chunk.D4QE2MLU.js";

// src/components/dialog/dialog.styles.ts
var dialog_styles_default = i`
  ${component_styles_default}

  :host {
    --width: 31rem;
    --header-spacing: var(--bui-spacing-large);
    --body-spacing: var(--bui-spacing-large);
    --footer-spacing: var(--bui-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--bui-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--bui-spacing-2x-large));
    max-height: calc(100% - var(--bui-spacing-2x-large));
    background-color: var(--bui-panel-background-color);
    border-radius: var(--bui-border-radius-medium);
    box-shadow: var(--bui-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--bui-font-size-large);
    line-height: var(--bui-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--bui-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions bui-icon-button,
  .dialog__header-actions ::slotted(bui-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--bui-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(bui-button:not(:first-of-type)) {
    margin-inline-start: var(--bui-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--bui-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--bui-color-neutral-0);
    }
  }
`;

export {
  dialog_styles_default
};