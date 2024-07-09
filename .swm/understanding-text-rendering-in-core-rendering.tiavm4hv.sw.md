---
title: Understanding Text Rendering in Core Rendering
---
Text rendering in the Core Rendering of the renderer project refers to the process of generating a visual representation of text characters on the screen. This is achieved through the use of various classes and methods, such as the TextRenderer class and its associated methods.

The TextRenderer class is an abstract class that provides a set of methods and properties for rendering text. It includes methods for setting properties, managing the state of the renderer, and rendering text. It also includes an abstract method for rendering quads, which must be implemented by any class that extends TextRenderer.

The TextRenderer class is used in various parts of the codebase, including the CoreTextNode class, which represents a text node in the core of the renderer. The CoreTextNode class uses an instance of a TextRenderer to manage the rendering of its text.

There are also specific implementations of the TextRenderer class, such as the CanvasTextRenderer and the SdfTextRenderer. These classes provide specific implementations for rendering text on a canvas and using Signed Distance Field (SDF) rendering, respectively.

The TextRendererState interface defines the state of a TextRenderer. It includes properties for the text properties, the status of the renderer, and various other properties related to the rendering process.

In addition to the classes and interfaces, there are also various utility functions provided for text rendering. These include functions for measuring text, wrapping text, and getting font metrics, among others.

<SwmSnippet path="/src/core/text-rendering/renderers/TextRenderer.ts" line="420">

---

# TextRenderer Class

The TextRenderer class is an abstract class that provides a set of methods and properties for rendering text. It includes methods for setting properties, managing the state of the renderer, and rendering text. It also includes an abstract method for rendering quads, which must be implemented by any class that extends TextRenderer.

```typescript
export abstract class TextRenderer<
  StateT extends TextRendererState = TextRendererState,
> {
  readonly set: Readonly<TrPropSetters<StateT>>;

  constructor(protected stage: Stage) {
    const propSetters = {
      ...trPropSetterDefaults,
      ...this.getPropertySetters(),
    };
    // For each prop setter add a wrapper method that checks if the prop is
    // different before calling the setter
    this.set = Object.freeze(
      Object.fromEntries(
        Object.entries(propSetters).map(([key, setter]) => {
          return [
            key as keyof TrProps,
            (state: StateT, value: TrProps[keyof TrProps]) => {
              if (state.props[key as keyof TrProps] !== value) {
                setter(state, value as never);
                // Assume any prop change will require a render
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="50">

---

# TextRenderer Usage

The TextRenderer class is used in various parts of the codebase, including the CoreTextNode class, which represents a text node in the core of the renderer. The CoreTextNode class uses an instance of a TextRenderer to manage the rendering of its text.

```typescript
  textRenderer: TextRenderer;
  trState: TextRendererState;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/text-rendering/renderers/CanvasTextRenderer.ts" line="106">

---

# TextRenderer Implementations

There are also specific implementations of the TextRenderer class, such as the CanvasTextRenderer and the SdfTextRenderer. These classes provide specific implementations for rendering text on a canvas and using Signed Distance Field (SDF) rendering, respectively.

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

<SwmSnippet path="/src/core/text-rendering/renderers/TextRenderer.ts" line="49">

---

# TextRendererState Interface

The TextRendererState interface defines the state of a TextRenderer. It includes properties for the text properties, the status of the renderer, and various other properties related to the rendering process.

```typescript
export interface TextRendererState {
  props: TrProps;
  /**
   * Whether or not the text renderer state is scheduled to be updated
   * via queueMicrotask.
   */
  updateScheduled: boolean;
  status: 'initialState' | 'loading' | 'loaded' | 'failed' | 'destroyed';
  /**
   * Event emitter for the text renderer
   */
  emitter: EventEmitter;

  /**
   * Force a full layout pass for the calculation of the
   * total dimensions of the text
   */
  forceFullLayoutCalc: boolean;
  textW: number | undefined;
  textH: number | undefined;

```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
