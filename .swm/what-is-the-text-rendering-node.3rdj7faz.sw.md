---
title: What is the Text Rendering Node
---
The Core Text Node is a crucial component in the Core Rendering process. It is responsible for rendering text within the user interface. It extends the Core Node and implements the ICoreTextNode interface, which includes properties such as textRenderer and trState.

The textRenderer property is an instance of the TextRenderer class. It is responsible for rendering the text on the screen. The trState property, on the other hand, holds the state of the text renderer.

The Core Text Node also includes a private property \_textRendererOverride. This property allows for overriding the default text renderer with a custom one if needed.

The CoreTextNodeProps interface defines the properties that a Core Text Node can have. These properties include the text to be rendered and the textRendererOverride property.

The Core Text Node also includes several methods for managing its state and rendering text. For example, the checkRenderProps method checks if the text property of the trState object is not an empty string. If it is not, the method returns true, indicating that the text can be rendered.

The resolveTextRendererAndState method is used to resolve a text renderer and a new state based on the current text renderer props provided. It returns an object containing the resolved text renderer and the text renderer state.

<SwmSnippet path="/src/core/CoreTextNode.ts" line="49">

---

# CoreTextNode Class

The CoreTextNode class extends the CoreNode and implements the ICoreTextNode interface. It includes properties such as textRenderer and trState. The textRenderer property is an instance of the TextRenderer class, responsible for rendering the text on the screen. The trState property holds the state of the text renderer. The CoreTextNode class also includes a private property \_textRendererOverride, which allows for overriding the default text renderer with a custom one if needed.

```typescript
export class CoreTextNode extends CoreNode implements ICoreTextNode {
  textRenderer: TextRenderer;
  trState: TextRendererState;
  private _textRendererOverride: CoreTextNodeProps['textRendererOverride'] =
    null;

  constructor(stage: Stage, props: CoreTextNodeProps) {
    super(stage, props);
    this._textRendererOverride = props.textRendererOverride;
    const { resolvedTextRenderer, textRendererState } =
      this.resolveTextRendererAndState({
        x: this.absX,
        y: this.absY,
        width: props.width,
        height: props.height,
        textAlign: props.textAlign,
        color: props.color,
        zIndex: props.zIndex,
        contain: props.contain,
        scrollable: props.scrollable,
        scrollY: props.scrollY,
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="39">

---

# CoreTextNodeProps Interface

The CoreTextNodeProps interface defines the properties that a Core Text Node can have. These properties include the text to be rendered and the textRendererOverride property.

```typescript
export interface CoreTextNodeProps extends CoreNodeProps, TrProps {
  text: string;
  textRendererOverride: keyof TextRendererMap | null;
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="344">

---

# checkRenderProps Method

The checkRenderProps method checks if the text property of the trState object is not an empty string. If it is not, the method returns true, indicating that the text can be rendered.

```typescript
  override checkRenderProps(): boolean {
    if (this.trState.props.text !== '') {
      return true;
    }
    return super.checkRenderProps();
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="404">

---

# resolveTextRendererAndState Method

The resolveTextRendererAndState method is used to resolve a text renderer and a new state based on the current text renderer props provided. It returns an object containing the resolved text renderer and the text renderer state.

```typescript
  private resolveTextRendererAndState(props: TrProps): {
    resolvedTextRenderer: TextRenderer;
    textRendererState: TextRendererState;
  } {
    const resolvedTextRenderer = this.stage.resolveTextRenderer(
      props,
      this._textRendererOverride,
    );

    const textRendererState = resolvedTextRenderer.createState(props);

    textRendererState.emitter.on('loaded', this.onTextLoaded);
    textRendererState.emitter.on('failed', this.onTextFailed);

    resolvedTextRenderer.scheduleUpdateState(textRendererState);

    return {
      resolvedTextRenderer,
      textRendererState,
    };
  }
```

---

</SwmSnippet>

# CoreTextNode Functions

This section provides an overview of the main functions in the CoreTextNode class.

<SwmSnippet path="/src/core/CoreTextNode.ts" line="55">

---

## CoreTextNode Constructor

The constructor of the CoreTextNode class initializes the textRenderer and trState properties. It also sets the \_textRendererOverride property based on the provided props.

```typescript
  constructor(stage: Stage, props: CoreTextNodeProps) {
    super(stage, props);
    this._textRendererOverride = props.textRendererOverride;
    const { resolvedTextRenderer, textRendererState } =
      this.resolveTextRendererAndState({
        x: this.absX,
        y: this.absY,
        width: props.width,
        height: props.height,
        textAlign: props.textAlign,
        color: props.color,
        zIndex: props.zIndex,
        contain: props.contain,
        scrollable: props.scrollable,
        scrollY: props.scrollY,
        offsetY: props.offsetY,
        letterSpacing: props.letterSpacing,
        debug: props.debug,
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        fontStretch: props.fontStretch,
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="89">

---

## onTextLoaded

The onTextLoaded method is an event handler that is triggered when the text is loaded. It adjusts the width and height of the text based on the 'contain' property.

```typescript
  private onTextLoaded: TrLoadedEventHandler = () => {
    const { contain } = this;
    const setWidth = this.trState.props.width;
    const setHeight = this.trState.props.height;
    const calcWidth = this.trState.textW || 0;
    const calcHeight = this.trState.textH || 0;

    if (contain === 'both') {
      this.props.width = setWidth;
      this.props.height = setHeight;
    } else if (contain === 'width') {
      this.props.width = setWidth;
      this.props.height = calcHeight;
    } else if (contain === 'none') {
      this.props.width = calcWidth;
      this.props.height = calcHeight;
    }
    this.updateLocalTransform();

    // Incase the RAF loop has been stopped already before text was loaded,
    // we request a render so it can be drawn.
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="127">

---

## width

The width getter and setter methods are used to get and set the width of the text. The setter also updates the local transform if the 'contain' property is set to 'none'.

```typescript
  override get width(): number {
    return this.props.width;
  }

  override set width(value: number) {
    this.props.width = value;
    this.textRenderer.set.width(this.trState, value);

    // If not containing, we must update the local transform to account for the
    // new width
    if (this.contain === 'none') {
      this.setUpdateType(UpdateType.Local);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="142">

---

## height

The height getter and setter methods are used to get and set the height of the text. The setter also updates the local transform if the 'contain' property is not set to 'both'.

```typescript
  override get height(): number {
    return this.props.height;
  }

  override set height(value: number) {
    this.props.height = value;
    this.textRenderer.set.height(this.trState, value);

    // If not containing in the horizontal direction, we must update the local
    // transform to account for the new height
    if (this.contain !== 'both') {
      this.setUpdateType(UpdateType.Local);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="157">

---

## color

The color getter and setter methods are used to get and set the color of the text.

```typescript
  override get color(): number {
    return this.trState.props.color;
  }

  override set color(value: number) {
    this.textRenderer.set.color(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="165">

---

## text

The text getter and setter methods are used to get and set the text to be rendered.

```typescript
  get text(): string {
    return this.trState.props.text;
  }

  set text(value: string) {
    this.textRenderer.set.text(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="173">

---

## textRendererOverride

The textRendererOverride getter and setter methods are used to get and set the textRendererOverride property. The setter also destroys the current state and resolves a new text renderer and state.

```typescript
  get textRendererOverride(): CoreTextNodeProps['textRendererOverride'] {
    return this._textRendererOverride;
  }

  set textRendererOverride(value: CoreTextNodeProps['textRendererOverride']) {
    this._textRendererOverride = value;

    this.textRenderer.destroyState(this.trState);

    const { resolvedTextRenderer, textRendererState } =
      this.resolveTextRendererAndState(this.trState.props);
    this.textRenderer = resolvedTextRenderer;
    this.trState = textRendererState;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="196">

---

## fontFamily

The fontFamily getter and setter methods are used to get and set the fontFamily of the text.

```typescript
  get fontFamily(): CoreTextNodeProps['fontFamily'] {
    return this.trState.props.fontFamily;
  }

  set fontFamily(value: CoreTextNodeProps['fontFamily']) {
    this.textRenderer.set.fontFamily(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="212">

---

## fontStyle

The fontStyle getter and setter methods are used to get and set the fontStyle of the text.

```typescript
  get fontStyle(): CoreTextNodeProps['fontStyle'] {
    return this.trState.props.fontStyle;
  }

  set fontStyle(value: CoreTextNodeProps['fontStyle']) {
    this.textRenderer.set.fontStyle(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="220">

---

## fontWeight

The fontWeight getter and setter methods are used to get and set the fontWeight of the text.

```typescript
  get fontWeight(): CoreTextNodeProps['fontWeight'] {
    return this.trState.props.fontWeight;
  }

  set fontWeight(value: CoreTextNodeProps['fontWeight']) {
    this.textRenderer.set.fontWeight(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="228">

---

## textAlign

The textAlign getter and setter methods are used to get and set the textAlign of the text.

```typescript
  get textAlign(): CoreTextNodeProps['textAlign'] {
    return this.trState.props.textAlign;
  }

  set textAlign(value: CoreTextNodeProps['textAlign']) {
    this.textRenderer.set.textAlign(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="236">

---

## contain

The contain getter and setter methods are used to get and set the contain property of the text.

```typescript
  get contain(): CoreTextNodeProps['contain'] {
    return this.trState.props.contain;
  }

  set contain(value: CoreTextNodeProps['contain']) {
    this.textRenderer.set.contain(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="260">

---

## offsetY

The offsetY getter and setter methods are used to get and set the offsetY of the text.

```typescript
  get offsetY(): CoreTextNodeProps['offsetY'] {
    return this.trState.props.offsetY;
  }

  set offsetY(value: CoreTextNodeProps['offsetY']) {
    this.textRenderer.set.offsetY(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="286">

---

## maxLines

The maxLines getter and setter methods are used to get and set the maxLines of the text.

```typescript
  get maxLines(): CoreTextNodeProps['maxLines'] {
    return this.trState.props.maxLines;
  }

  set maxLines(value: CoreTextNodeProps['maxLines']) {
    if (this.textRenderer.set.maxLines) {
      this.textRenderer.set.maxLines(this.trState, value);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="296">

---

## textBaseline

The textBaseline getter and setter methods are used to get and set the textBaseline of the text.

```typescript
  get textBaseline(): CoreTextNodeProps['textBaseline'] {
    return this.trState.props.textBaseline;
  }

  set textBaseline(value: CoreTextNodeProps['textBaseline']) {
    if (this.textRenderer.set.textBaseline) {
      this.textRenderer.set.textBaseline(this.trState, value);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="316">

---

## overflowSuffix

The overflowSuffix getter and setter methods are used to get and set the overflowSuffix of the text.

```typescript
  get overflowSuffix(): CoreTextNodeProps['overflowSuffix'] {
    return this.trState.props.overflowSuffix;
  }

  set overflowSuffix(value: CoreTextNodeProps['overflowSuffix']) {
    if (this.textRenderer.set.overflowSuffix) {
      this.textRenderer.set.overflowSuffix(this.trState, value);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="326">

---

## debug

The debug getter and setter methods are used to get and set the debug property of the text.

```typescript
  get debug(): CoreTextNodeProps['debug'] {
    return this.trState.props.debug;
  }

  set debug(value: CoreTextNodeProps['debug']) {
    this.textRenderer.set.debug(this.trState, value);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreTextNode.ts" line="393">

---

## destroy

The destroy method is used to cleanup all resources when the node is destroyed. It destroys the textRenderer state.

```typescript
  override destroy(): void {
    super.destroy();

    this.textRenderer.destroyState(this.trState);
  }
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
