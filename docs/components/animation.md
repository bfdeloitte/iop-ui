# Animation

[component-header:bui-animation]

To animate an element, wrap it in `<bui-animation>` and set an animation `name`. The animation will not start until you add the `play` attribute. Refer to the [properties table](#properties) for a list of all animation options.

```html preview
<div class="animation-overview">
  <bui-animation name="bounce" duration="2000" play><div class="box"></div></bui-animation>
  <bui-animation name="jello" duration="2000" play><div class="box"></div></bui-animation>
  <bui-animation name="heartBeat" duration="2000" play><div class="box"></div></bui-animation>
  <bui-animation name="flip" duration="2000" play><div class="box"></div></bui-animation>
</div>

<style>
  .animation-overview .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
    margin: 1.5rem;
  }
</style>
```

```jsx react
import { Animation } from 'buckeye-ui/dist/react';

const css = `
  .animation-overview .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
    margin: 1.5rem;
  }
`;

const App = () => (
  <>
    <div class="animation-overview">
      <Animation name="bounce" duration={2000} play>
        <div class="box" />
      </Animation>
      <Animation name="jello" duration={2000} play>
        <div class="box" />
      </Animation>
      <Animation name="heartBeat" duration={2000} play>
        <div class="box" />
      </Animation>
      <Animation name="flip" duration={2000} play>
        <div class="box" />
      </Animation>
    </div>

    <style>{css}</style>
  </>
);
```

?> The animation will only be applied to the first child element found in `<bui-animation>`.

## Examples

### Animations & Easings

This example demonstrates all of the baked-in animations and easings. Animations are based on those found in the popular [Animate.css](https://animate.style/) library.

```html preview
<div class="animation-sandbox">
  <bui-animation name="bounce" easing="ease-in-out" duration="2000" play>
    <div class="box"></div>
  </bui-animation>

  <div class="controls">
    <bui-select label="Animation" value="bounce"></bui-select>
    <bui-select label="Easing" value="linear"></bui-select>
    <bui-input label="Playback Rate" type="number" min="0" max="2" step=".25" value="1"></bui-input>
  </div>
</div>

<script type="module">
  import { getAnimationNames, getEasingNames } from '/dist/utilities/animation.js';

  const container = document.querySelector('.animation-sandbox');
  const animation = container.querySelector('bui-animation');
  const animationName = container.querySelector('.controls bui-select:nth-child(1)');
  const easingName = container.querySelector('.controls bui-select:nth-child(2)');
  const playbackRate = container.querySelector('bui-input[type="number"]');
  const animations = getAnimationNames();
  const easings = getEasingNames();

  animations.map(name => {
    const option = Object.assign(document.createElement('bui-option'), {
      textContent: name,
      value: name
    });
    animationName.appendChild(option);
  });

  easings.map(name => {
    const option = Object.assign(document.createElement('bui-option'), {
      textContent: name,
      value: name
    });
    easingName.appendChild(option);
  });

  animationName.addEventListener('bui-change', () => (animation.name = animationName.value));
  easingName.addEventListener('bui-change', () => (animation.easing = easingName.value));
  playbackRate.addEventListener('bui-input', () => (animation.playbackRate = playbackRate.value));
</script>

<style>
  .animation-sandbox .box {
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
  }

  .animation-sandbox .controls {
    max-width: 300px;
    margin-top: 2rem;
  }

  .animation-sandbox .controls bui-select {
    margin-bottom: 1rem;
  }
</style>
```

### Using Intersection Observer

Use an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to control the animation when an element enters or exits the viewport. For example, scroll the box below in and out of your screen. The animation stops when the box exits the viewport and restarts each time it enters the viewport.

```html preview
<div class="animation-scroll">
  <bui-animation name="jackInTheBox" duration="2000" iterations="1"><div class="box"></div></bui-animation>
</div>

<script>
  const container = document.querySelector('.animation-scroll');
  const animation = container.querySelector('bui-animation');
  const box = animation.querySelector('.box');

  // Watch for the box to enter and exit the viewport. Note that we're observing the box, not the animation element!
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Start the animation when the box enters the viewport
      animation.play = true;
    } else {
      animation.play = false;
      animation.currentTime = 0;
    }
  });
  observer.observe(box);
</script>

<style>
  .animation-scroll .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
  }
</style>
```

```jsx react
import { useEffect, useRef, useState } from 'react';
import { Animation } from 'buckeye-ui/dist/react';

const css = `
  .animation-scroll {
    height: calc(100vh + 100px);
  }

  .animation-scroll .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
  }
`;

const App = () => {
  const animation = useRef(null);
  const box = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animation.current.play = true;
      } else {
        animation.current.play = false;
        animation.current.currentTime = 0;
      }
    });

    if (box.current) {
      observer.observe(box.current);
    }
  }, [box]);

  return (
    <>
      <div class="animation-scroll">
        <Animation ref={animation} name="jackInTheBox" duration={2000} iterations={1}>
          <div ref={box} class="box" />
        </Animation>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Custom Keyframe Formats

Supply your own [keyframe formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) to build custom animations.

```html preview
<div class="animation-keyframes">
  <bui-animation easing="ease-in-out" duration="2000" play>
    <div class="box"></div>
  </bui-animation>
</div>

<script>
  const animation = document.querySelector('.animation-keyframes bui-animation');
  animation.keyframes = [
    {
      offset: 0,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transformOrigin: 'center center',
      transform: 'rotate(0)'
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transformOrigin: 'center center',
      transform: 'rotate(90deg)'
    }
  ];
</script>

<style>
  .animation-keyframes .box {
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
  }
</style>
```

```jsx react
import { Animation } from 'buckeye-ui/dist/react';

const css = `
  .animation-keyframes .box {
    width: 100px;
    height: 100px;
    background-color: var(--bui-color-primary-600);
  }
`;

const App = () => (
  <>
    <div class="animation-keyframes">
      <Animation
        easing="ease-in-out"
        duration={2000}
        play
        keyframes={[
          {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)'
          },
          {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(90deg)'
          }
        ]}
      >
        <div class="box" />
      </Animation>
    </div>

    <style>{css}</style>
  </>
);
```

### Playing Animations on Demand

Animations won't play until you apply the `play` attribute. You can omit it initially, then apply it on demand such as after a user interaction. In this example, the button will animate once every time the button is clicked.

```html preview
<div class="animation-form">
  <bui-animation name="rubberBand" duration="1000" iterations="1">
    <bui-button variant="primary">Click me</bui-button>
  </bui-animation>
</div>

<script>
  const container = document.querySelector('.animation-form');
  const animation = container.querySelector('bui-animation');
  const button = container.querySelector('bui-button');

  button.addEventListener('click', () => {
    animation.play = true;
  });
</script>
```

```jsx react
import { useState } from 'react';
import { Animation, Button } from 'buckeye-ui/dist/react';

const App = () => {
  const [play, setPlay] = useState(false);

  return (
    <div class="animation-form">
      <Animation name="rubberBand" duration={1000} iterations={1} play={play} onFinish={() => setPlay(false)}>
        <Button variant="primary" onClick={() => setPlay(true)}>
          Click me
        </Button>
      </Animation>
    </div>
  );
};
```

[component-metadata:bui-animation]
