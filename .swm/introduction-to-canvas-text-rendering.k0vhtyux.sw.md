---
title: Introduction to Canvas Text Rendering
---
The CanvasTextRenderer is a class that extends the TextRenderer class. It is used for rendering text on a canvas. It provides a lightweight API for front-end application frameworks and includes a Visual Regression Test Runner for preventing bugs.

The CanvasTextRenderer class has a property called 'context', which is either an OffscreenCanvasRenderingContext2D or a CanvasRenderingContext2D. This context is used to draw and manipulate the text on the canvas.

The CanvasTextRenderer class also has a method called 'setIsRenderable'. This method is used to set the renderable state of the text. If the text is renderable, it will be drawn on the canvas; otherwise, it will not.

The CanvasTextRenderer class uses a type called 'CanvasTextRendererState' to keep track of the state of the text rendering. This includes properties such as the font face, the CSS string for the font, whether the font has loaded, and information about the canvas pages.

The CanvasTextRenderer class is part of the TextRendererMap interface, which maps the canvas text renderer to the 'canvas' key. This allows the CanvasTextRenderer to be easily accessed and used throughout the codebase.

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="106">

---

# CanvasTextRenderer Class

The CanvasTextRenderer class extends the TextRenderer class. It has properties like 'canvas' and 'context' which are used for rendering text on a canvas. The 'context' is either an OffscreenCanvasRenderingContext2D or a CanvasRenderingContext2D, which is used to draw and manipulate the text on the canvas.

```typescript
export class CanvasTextRenderer extends TextRenderer<CanvasTextRendererState> {
  protected canvas: OffscreenCanvas | HTMLCanvasElement;
  protected context:
    | OffscreenCanvasRenderingContext2D
    | CanvasRenderingContext2D;
  private rendererBounds: Bound;
  /**
   * Font family map used to store web font faces that were added to the
   * canvas text renderer.
   */
  private fontFamilies: FontFamilyMap = {};
  private fontFamilyArray: FontFamilyMap[] = [this.fontFamilies];

  constructor(stage: Stage) {
    super(stage);
    if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas = new OffscreenCanvas(0, 0);
    } else {
      this.canvas = document.createElement('canvas');
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="157">

---

# CanvasTextRenderer Methods

The CanvasTextRenderer class provides several methods to manipulate the text rendering. For example, the 'getPropertySetters' method returns an object that maps property names to setter functions. The 'createState' method is used to create a new state object for the renderer. The 'updateState' method is used to update the state of the renderer. The 'renderQuads' method is used to render the text on the canvas. The 'setIsRenderable' method is used to set the renderable state of the text. If the text is renderable, it will be drawn on the canvas; otherwise, it will not.

```typescript
  override getPropertySetters(): Partial<
    TrPropSetters<CanvasTextRendererState>
  > {
    return {
      fontFamily: (state, value) => {
        state.props.fontFamily = value;
        state.fontInfo = undefined;
        this.invalidateLayoutCache(state);
      },
      fontWeight: (state, value) => {
        state.props.fontWeight = value;
        state.fontInfo = undefined;
        this.invalidateLayoutCache(state);
      },
      fontStyle: (state, value) => {
        state.props.fontStyle = value;
        state.fontInfo = undefined;
        this.invalidateLayoutCache(state);
      },
      fontStretch: (state, value) => {
        state.props.fontStretch = value;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="79">

---

# CanvasTextRendererState Interface

The CanvasTextRendererState interface is used to keep track of the state of the text rendering. This includes properties such as the font face, the CSS string for the font, whether the font has loaded, and information about the canvas pages.

```typescript
export interface CanvasTextRendererState extends TextRendererState {
  props: TrProps;

  fontFaceLoadedHandler: (() => void) | undefined;
  fontInfo:
    | {
        fontFace: WebTrFontFace;
        cssString: string;
        loaded: boolean;
      }
    | undefined;
  canvasPages: [CanvasPageInfo, CanvasPageInfo, CanvasPageInfo] | undefined;
  lightning2TextRenderer: LightningTextTextureRenderer;
  renderInfo: RenderInfo | undefined;
  renderWindow: Bound | undefined;
  visibleWindow: BoundWithValid;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="59">

---

# TextRendererMap Interface

The CanvasTextRenderer class is part of the TextRendererMap interface, which maps the canvas text renderer to the 'canvas' key. This allows the CanvasTextRenderer to be easily accessed and used throughout the codebase.

```typescript
declare module './TextRenderer.js' {
  interface TextRendererMap {
    canvas: CanvasTextRenderer;
  }
}
```

---

</SwmSnippet>

# CanvasTextRenderer Functions

This section covers the main functions of the CanvasTextRenderer class.

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="119">

---

## Constructor

The constructor of the CanvasTextRenderer class initializes the canvas and context properties. It also sets up the rendererBounds and adds a default 'san-serif' font face.

```typescript
  constructor(stage: Stage) {
    super(stage);
    if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas = new OffscreenCanvas(0, 0);
    } else {
      this.canvas = document.createElement('canvas');
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    let context = this.canvas.getContext('2d') as
      | OffscreenCanvasRenderingContext2D
      | CanvasRenderingContext2D
      | null;
    if (!context) {
      // A browser may appear to support OffscreenCanvas but not actually support the Canvas '2d' context
      // Here we try getting the context again after falling back to an HTMLCanvasElement.
      // See: https://github.com/lightning-js/renderer/issues/26#issuecomment-1750438486
      this.canvas = document.createElement('canvas');
      context = this.canvas.getContext('2d');
    }
    assertTruthy(context);
    this.context = context;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="299">

---

## createState

The createState function is used to create the initial state of the CanvasTextRenderer. It sets up properties like props, status, updateScheduled, emitter, canvasPages, lightning2TextRenderer, renderWindow, visibleWindow, renderInfo, forceFullLayoutCalc, textW, textH, fontInfo, fontFaceLoadedHandler, isRenderable, and debugData.

```typescript
  override createState(props: TrProps): CanvasTextRendererState {
    return {
      props,
      status: 'initialState',
      updateScheduled: false,
      emitter: new EventEmitter(),
      canvasPages: undefined,
      lightning2TextRenderer: new LightningTextTextureRenderer(
        this.canvas,
        this.context,
      ),
      renderWindow: undefined,
      visibleWindow: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        valid: false,
      },
      renderInfo: undefined,
      forceFullLayoutCalc: false,
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="337">

---

## updateState

The updateState function is responsible for updating the state of the CanvasTextRenderer. It handles various scenarios like the first update call, invalid fontInfo, waiting for a font face to load, and absence of renderInfo. It also manages the rendering of the canvas pages.

```typescript
  override updateState(state: CanvasTextRendererState): void {
    // On the first update call we need to set the status to loading
    if (state.status === 'initialState') {
      this.setStatus(state, 'loading');
    }

    // If fontInfo is invalid, we need to establish it
    if (!state.fontInfo) {
      const cssString = getFontCssString(state.props);
      const trFontFace = TrFontManager.resolveFontFace(
        this.fontFamilyArray,
        state.props,
      ) as WebTrFontFace | undefined;
      assertTruthy(trFontFace, `Could not resolve font face for ${cssString}`);
      state.fontInfo = {
        fontFace: trFontFace,
        cssString: cssString,
        // TODO: For efficiency we would use this here but it's not reliable on WPE -> document.fonts.check(cssString),
        loaded: false,
      };
      // If font is not loaded, set up a handler to update the font info when the font loads
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="579">

---

## renderQuads

The renderQuads function is used to render the quads (a type of polygon) on the canvas. It calculates the visibleRect and elementRect, and then uses these to render the quads on the canvas.

```typescript
  override renderQuads(
    state: CanvasTextRendererState,
    transform: Matrix3d,
    clippingRect: RectWithValid,
    alpha: number,
  ): void {
    const { stage } = this;

    const { canvasPages, textW = 0, textH = 0, renderWindow } = state;

    if (!canvasPages || !renderWindow) return;

    const { x, y, scrollY, contain, width, height /*, debug*/ } = state.props;

    const elementRect = {
      x: x,
      y: y,
      width: contain !== 'none' ? width : textW,
      height: contain === 'both' ? height : textH,
    };

```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
