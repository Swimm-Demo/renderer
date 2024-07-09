---
title: Introduction to Sdf Text Rendering
---
The SdfTextRenderer is a singleton class used for rendering text using signed distance fields. It supports both single-channel and multi-channel signed distance fields. The class is defined in the file `src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.ts`.

The SdfTextRenderer class extends the TextRenderer class and takes in an instance of the SdfTextRendererState interface as a type parameter. This interface extends the TextRendererState and includes additional properties specific to the SdfTextRenderer.

The SdfTextRenderer class includes a constructor that initializes the SdfShader and sets the rendererBounds. It also includes a set of property setters that are used to update the state of the SdfTextRenderer.

The SdfTextRenderer class includes a method `updateState` that updates the state of the SdfTextRenderer based on the current properties. It also includes a method `renderQuads` that is responsible for rendering the text.

The SdfTextRenderer is used in various parts of the codebase. For example, it is used in the `Stage.ts` file to initialize the text renderers for the stage. It is also used in the `SdfFontShaper.ts` file as part of the font shaping process.

<SwmSnippet path="/src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.ts" line="132">

---

# SdfTextRenderer Class

The SdfTextRenderer class extends the TextRenderer class and takes in an instance of the SdfTextRendererState interface as a type parameter. This interface extends the TextRendererState and includes additional properties specific to the SdfTextRenderer.

```typescript
export class SdfTextRenderer extends TextRenderer<SdfTextRendererState> {
  /**
   * Map of font family names to a set of font faces.
   */
  private ssdfFontFamilies: FontFamilyMap = {};
  private msdfFontFamilies: FontFamilyMap = {};
  private fontFamilyArray: FontFamilyMap[] = [
    this.ssdfFontFamilies,
    this.msdfFontFamilies,
  ];
  private sdfShader: SdfShader;
  private rendererBounds: Bound;

  constructor(stage: Stage) {
    super(stage);
    this.sdfShader = this.stage.shManager.loadShader('SdfShader').shader;
    this.rendererBounds = {
      x1: 0,
      y1: 0,
      x2: this.stage.options.appWidth,
      y2: this.stage.options.appHeight,
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/Stage.ts" line="32">

---

# SdfTextRenderer Usage

The SdfTextRenderer is used in the `Stage.ts` file to initialize the text renderers for the stage.

```typescript
import { SdfTextRenderer } from './text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.js';
import { CanvasTextRenderer } from './text-rendering/renderers/CanvasTextRenderer.js';
import { EventEmitter } from '../common/EventEmitter.js';
import { ContextSpy } from './lib/ContextSpy.js';
import type {
  FpsUpdatePayload,
  FrameTickPayload,
} from '../common/CommonTypes.js';
import { TextureMemoryManager } from './TextureMemoryManager.js';
import type {
  CoreRenderer,
  CoreRendererOptions,
} from './renderers/CoreRenderer.js';
import { CanvasCoreRenderer } from './renderers/canvas/CanvasCoreRenderer.js';

export interface StageOptions {
  rootId: number;
  appWidth: number;
  appHeight: number;
  txMemByteThreshold: number;
  boundsMargin: number | [number, number, number, number];
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/font-face-types/SdfTrFontFace/internal/SdfFontShaper.ts" line="20">

---

# SdfTextRenderer in Font Shaping

The SdfTextRenderer is also used in the `SdfFontShaper.ts` file as part of the font shaping process.

```typescript
import type { PeekableIterator } from '../../../renderers/SdfTextRenderer/internal/PeekableGenerator.js';
import { SpecialCodepoints } from '../../../renderers/SdfTextRenderer/internal/SpecialCodepoints.js';
import type { FontMetrics } from '../../TrFontFace.js';
```

---

</SwmSnippet>

# SdfTextRenderer Functions

The SdfTextRenderer class includes a constructor that initializes the SdfShader and sets the rendererBounds. It also includes a set of property setters that are used to update the state of the SdfTextRenderer. The class also includes a method `updateState` that updates the state of the SdfTextRenderer based on the current properties. It also includes a method `renderQuads` that is responsible for rendering the text.

<SwmSnippet path="/src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.ts" line="145">

---

## SdfTextRenderer Constructor

The constructor initializes the SdfShader and sets the rendererBounds. It takes in a stage as a parameter.

```typescript
  constructor(stage: Stage) {
    super(stage);
    this.sdfShader = this.stage.shManager.loadShader('SdfShader').shader;
    this.rendererBounds = {
      x1: 0,
      y1: 0,
      x2: this.stage.options.appWidth,
      y2: this.stage.options.appHeight,
    };
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.ts" line="386">

---

## SdfTextRenderer updateState Method

The `updateState` method updates the state of the SdfTextRenderer based on the current properties. It takes in a state as a parameter.

```typescript
  override updateState(state: SdfTextRendererState): void {
    let { trFontFace } = state;
    const { textH, lineCache, debugData, forceFullLayoutCalc } = state;
    debugData.updateCount++;

    // On the first update call we need to set the status to loading
    if (state.status === 'initialState') {
      this.setStatus(state, 'loading');
    }

    // Resolve font face if we haven't yet
    if (!trFontFace) {
      trFontFace = this.resolveFontFace(state.props);
      state.trFontFace = trFontFace;
      if (!trFontFace) {
        const msg = `SdfTextRenderer: Could not resolve font face for family: '${state.props.fontFamily}'`;
        console.error(msg);
        this.setStatus(state, 'failed', new Error(msg));
        return;
      }
      trFontFace.texture.setRenderableOwner(state, state.isRenderable);
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/SdfTextRenderer/SdfTextRenderer.ts" line="595">

---

## SdfTextRenderer renderQuads Method

The `renderQuads` method is responsible for rendering the text. It takes in several parameters including state, transform, clippingRect, alpha, parentHasRenderTexture, and framebufferDimensions.

```typescript
  override renderQuads(
    state: SdfTextRendererState,
    transform: Matrix3d,
    clippingRect: Readonly<RectWithValid>,
    alpha: number,
    parentHasRenderTexture: boolean,
    framebufferDimensions: Dimensions,
  ): void {
    if (!state.vertexBuffer) {
      // Nothing to draw
      return;
    }

    const renderer = this.stage.renderer;
    assertTruthy(renderer instanceof WebGlCoreRenderer);

    const { fontSize, color, contain, scrollable, zIndex, debug } = state.props;

    // scrollY only has an effect when contain === 'both' and scrollable === true
    const scrollY = contain === 'both' && scrollable ? state.props.scrollY : 0;

```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
