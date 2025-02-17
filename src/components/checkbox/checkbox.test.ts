import { clickOnElement } from '../../internal/test';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type Checkbox from './checkbox';

describe('<bui-checkbox>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox>Checkbox</bui-checkbox> `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);

    expect(el.name).to.equal('');
    expect(el.value).to.be.undefined;
    expect(el.title).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.defaultChecked).to.be.false;
  });

  it('should have title if title attribute is set', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox title="Test"></bui-checkbox> `);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(input.title).to.equal('Test');
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox disabled></bui-checkbox> `);
    const checkbox = el.shadowRoot!.querySelector('input')!;

    expect(checkbox.disabled).to.be.true;
  });

  it('should be disabled when disabled property is set', async () => {
    const el = await fixture<Checkbox>(html`<bui-checkbox></bui-checkbox>`);
    const checkbox = el.shadowRoot!.querySelector('input')!;

    el.disabled = true;
    await el.updateComplete;

    expect(checkbox.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);
    expect(el.checkValidity()).to.be.true;
  });

  it('should emit bui-change and bui-input when clicked', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);
    const changeHandler = sinon.spy();
    const inputHandler = sinon.spy();

    el.addEventListener('bui-change', changeHandler);
    el.addEventListener('bui-input', inputHandler);
    el.click();
    await el.updateComplete;

    expect(changeHandler).to.have.been.calledOnce;
    expect(inputHandler).to.have.been.calledOnce;
    expect(el.checked).to.be.true;
  });

  it('should emit bui-change and bui-input when toggled with spacebar', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);
    const changeHandler = sinon.spy();
    const inputHandler = sinon.spy();

    el.addEventListener('bui-change', changeHandler);
    el.addEventListener('bui-input', inputHandler);
    el.focus();
    await el.updateComplete;
    await sendKeys({ press: ' ' });

    expect(changeHandler).to.have.been.calledOnce;
    expect(inputHandler).to.have.been.calledOnce;
    expect(el.checked).to.be.true;
  });

  it('should not emit bui-change or bui-input when checked programmatically', async () => {
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);

    el.addEventListener('bui-change', () => expect.fail('bui-change should not be emitted'));
    el.addEventListener('bui-input', () => expect.fail('bui-input should not be emitted'));
    el.checked = true;
    await el.updateComplete;
    el.checked = false;
    await el.updateComplete;
  });

  it('should hide the native input with the correct positioning to scroll correctly when contained in an overflow', async () => {
    //
    // See: https://github.com/shoelace-style/shoelace/issues/1169
    //
    const el = await fixture<Checkbox>(html` <bui-checkbox></bui-checkbox> `);
    const label = el.shadowRoot!.querySelector('.checkbox')!;
    const input = el.shadowRoot!.querySelector('.checkbox__input')!;

    const labelPosition = getComputedStyle(label).position;
    const inputPosition = getComputedStyle(input).position;

    expect(labelPosition).to.equal('relative');
    expect(inputPosition).to.equal('absolute');
  });

  describe('when submitting a form', () => {
    it('should submit the correct value when a value is provided', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-checkbox name="a" value="1" checked></bui-checkbox>
          <bui-button type="submit">Submit</bui-button>
        </form>
      `);
      const button = form.querySelector('bui-button')!;
      const submitHandler = sinon.spy((event: SubmitEvent) => {
        formData = new FormData(form);
        event.preventDefault();
      });
      let formData: FormData;

      form.addEventListener('submit', submitHandler);
      button.click();

      await waitUntil(() => submitHandler.calledOnce);

      expect(formData!.get('a')).to.equal('1');
    });

    it('should submit "on" when no value is provided', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-checkbox name="a" checked></bui-checkbox>
          <bui-button type="submit">Submit</bui-button>
        </form>
      `);
      const button = form.querySelector('bui-button')!;
      const submitHandler = sinon.spy((event: SubmitEvent) => {
        formData = new FormData(form);
        event.preventDefault();
      });
      let formData: FormData;

      form.addEventListener('submit', submitHandler);
      button.click();

      await waitUntil(() => submitHandler.calledOnce);

      expect(formData!.get('a')).to.equal('on');
    });

    it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
      const checkbox = await fixture<HTMLFormElement>(html` <bui-checkbox></bui-checkbox> `);

      // Submitting the form after setting custom validity should not trigger the handler
      checkbox.setCustomValidity('Invalid selection');
      await checkbox.updateComplete;

      expect(checkbox.checkValidity()).to.be.false;
      expect(checkbox.checkValidity()).to.be.false;
      expect(checkbox.hasAttribute('data-invalid')).to.be.true;
      expect(checkbox.hasAttribute('data-valid')).to.be.false;
      expect(checkbox.hasAttribute('data-user-invalid')).to.be.false;
      expect(checkbox.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(checkbox);
      await checkbox.updateComplete;

      expect(checkbox.hasAttribute('data-user-invalid')).to.be.true;
      expect(checkbox.hasAttribute('data-user-valid')).to.be.false;
    });

    it('should be invalid when required and unchecked', async () => {
      const checkbox = await fixture<HTMLFormElement>(html` <bui-checkbox required></bui-checkbox> `);
      expect(checkbox.checkValidity()).to.be.false;
    });

    it('should be valid when required and checked', async () => {
      const checkbox = await fixture<HTMLFormElement>(html` <bui-checkbox required checked></bui-checkbox> `);
      expect(checkbox.checkValidity()).to.be.true;
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <bui-button type="submit">Submit</bui-button>
          </form>
          <bui-checkbox form="f" name="a" value="1" checked></bui-checkbox>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('1');
    });

    it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
      const el = await fixture<HTMLFormElement>(html` <form novalidate><bui-checkbox required></bui-checkbox></form> `);
      const checkbox = el.querySelector<Checkbox>('bui-checkbox')!;

      expect(checkbox.hasAttribute('data-required')).to.be.true;
      expect(checkbox.hasAttribute('data-optional')).to.be.false;
      expect(checkbox.hasAttribute('data-invalid')).to.be.true;
      expect(checkbox.hasAttribute('data-valid')).to.be.false;
      expect(checkbox.hasAttribute('data-user-invalid')).to.be.false;
      expect(checkbox.hasAttribute('data-user-valid')).to.be.false;
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-checkbox name="a" value="1" checked></bui-checkbox>
          <bui-button type="reset">Reset</bui-button>
        </form>
      `);
      const button = form.querySelector('bui-button')!;
      const checkbox = form.querySelector('bui-checkbox')!;
      checkbox.checked = false;

      await checkbox.updateComplete;
      setTimeout(() => button.click());

      await oneEvent(form, 'reset');
      await checkbox.updateComplete;

      expect(checkbox.checked).to.true;

      checkbox.defaultChecked = false;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await checkbox.updateComplete;

      expect(checkbox.checked).to.false;
    });
  });

  describe('click', () => {
    it('should click the inner input', async () => {
      const el = await fixture<Checkbox>(html`<bui-checkbox></bui-checkbox>`);
      const checkbox = el.shadowRoot!.querySelector('input')!;
      const clickSpy = sinon.spy();

      checkbox.addEventListener('click', clickSpy, { once: true });

      el.click();
      await el.updateComplete;

      expect(clickSpy.called).to.equal(true);
      expect(el.checked).to.equal(true);
    });
  });

  describe('focus', () => {
    it('should focus the inner input', async () => {
      const el = await fixture<Checkbox>(html`<bui-checkbox></bui-checkbox>`);
      const checkbox = el.shadowRoot!.querySelector('input')!;
      const focusSpy = sinon.spy();

      checkbox.addEventListener('focus', focusSpy, { once: true });

      el.focus();
      await el.updateComplete;

      expect(focusSpy.called).to.equal(true);
      expect(el.shadowRoot!.activeElement).to.equal(checkbox);
    });
  });

  describe('blur', () => {
    it('should blur the inner input', async () => {
      const el = await fixture<Checkbox>(html`<bui-checkbox></bui-checkbox>`);
      const checkbox = el.shadowRoot!.querySelector('input')!;
      const blurSpy = sinon.spy();

      checkbox.addEventListener('blur', blurSpy, { once: true });

      el.focus();
      await el.updateComplete;

      el.blur();
      await el.updateComplete;

      expect(blurSpy.called).to.equal(true);
      expect(el.shadowRoot!.activeElement).to.equal(null);
    });
  });

  describe('indeterminate', () => {
    it('should render indeterminate icon until checked', async () => {
      const el = await fixture<Checkbox>(html`<bui-checkbox indeterminate></bui-checkbox>`);
      let indeterminateIcon = el.shadowRoot!.querySelector('[part~="indeterminate-icon"]')!;

      expect(indeterminateIcon).not.to.be.null;

      el.click();
      await el.updateComplete;

      indeterminateIcon = el.shadowRoot!.querySelector('[part~="indeterminate-icon"]')!;

      expect(indeterminateIcon).to.be.null;
    });

    runFormControlBaseTests('bui-checkbox');
  });
});
