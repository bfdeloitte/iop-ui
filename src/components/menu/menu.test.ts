import { clickOnElement } from '../../internal/test';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type Menu from './menu';
import type SlSelectEvent from '../../events/bui-select';

describe('<bui-menu>', () => {
  it('emits bui-select with the correct event detail when clicking an item', async () => {
    const menu = await fixture<Menu>(html`
      <bui-menu>
        <bui-menu-item value="item-1">Item 1</bui-menu-item>
        <bui-menu-item value="item-2">Item 2</bui-menu-item>
        <bui-menu-item value="item-3">Item 3</bui-menu-item>
        <bui-menu-item value="item-4">Item 4</bui-menu-item>
      </bui-menu>
    `);
    const item2 = menu.querySelectorAll('bui-menu-item')[1];
    const selectHandler = sinon.spy((event: SlSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect event detail emitted with bui-select');
      }
    });

    menu.addEventListener('bui-select', selectHandler);
    await clickOnElement(item2);

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('can be selected via keyboard', async () => {
    const menu = await fixture<Menu>(html`
      <bui-menu>
        <bui-menu-item value="item-1">Item 1</bui-menu-item>
        <bui-menu-item value="item-2">Item 2</bui-menu-item>
        <bui-menu-item value="item-3">Item 3</bui-menu-item>
        <bui-menu-item value="item-4">Item 4</bui-menu-item>
      </bui-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('bui-menu-item');
    const selectHandler = sinon.spy((event: SlSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect item selected');
      }
    });

    menu.addEventListener('bui-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('does not select disabled items when clicking', async () => {
    const menu = await fixture<Menu>(html`
      <bui-menu>
        <bui-menu-item value="item-1">Item 1</bui-menu-item>
        <bui-menu-item value="item-2" disabled>Item 2</bui-menu-item>
        <bui-menu-item value="item-3">Item 3</bui-menu-item>
        <bui-menu-item value="item-4">Item 4</bui-menu-item>
      </bui-menu>
    `);
    const item2 = menu.querySelectorAll('bui-menu-item')[1];
    const selectHandler = sinon.spy();

    menu.addEventListener('bui-select', selectHandler);

    await clickOnElement(item2);

    expect(selectHandler).to.not.have.been.calledOnce;
  });

  it('does not select disabled items when pressing enter', async () => {
    const menu = await fixture<Menu>(html`
      <bui-menu>
        <bui-menu-item value="item-1">Item 1</bui-menu-item>
        <bui-menu-item value="item-2" disabled>Item 2</bui-menu-item>
        <bui-menu-item value="item-3">Item 3</bui-menu-item>
        <bui-menu-item value="item-4">Item 4</bui-menu-item>
      </bui-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('bui-menu-item');
    const selectHandler = sinon.spy();

    menu.addEventListener('bui-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement).to.equal(item2);
    await sendKeys({ press: 'Enter' });
    await item2.updateComplete;

    expect(selectHandler).to.not.have.been.called;
  });
});
