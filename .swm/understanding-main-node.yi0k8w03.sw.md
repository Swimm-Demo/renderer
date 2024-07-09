---
title: Understanding Main Node
---
The MainOnlyNode is a class that extends EventEmitter and implements the INode interface. It is used to manage nodes in the renderer's main process. It has properties such as id, coreNode, and several protected properties like \_children, \_src, \_parent, \_texture, and \_shader.

The MainOnlyNode class has a constructor that initializes these properties and sets up event listeners for various events such as 'loaded', 'failed', 'freed', 'outOfBounds', 'inBounds', 'outOfViewport', and 'inViewport'.

The MainOnlyNode class has several getter and setter methods for properties like x, y, width, height, alpha, autosize, clipping, color, colorTop, colorBottom, colorLeft, colorRight, colorTl, colorTr, colorBl, colorBr, scale, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, parent, children, zIndex, zIndexLocked, src, texture, rtt, parentHasRenderTexture, shader, and data. These methods are used to manipulate the properties of the node.

The MainOnlyNode class also has a destroy method that is used to clean up the node and its children when they are no longer needed. This method emits 'beforeDestroy' and 'afterDestroy' events, destroys the coreNode, sets the parent and texture to null, and removes all event listeners.

The MainOnlyNode class has a flush method that currently does nothing, and an animate method that creates a new CoreAnimation and CoreAnimationController for the node.

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="52">

---

## MainOnlyNode Class

The MainOnlyNode class extends EventEmitter and implements the INode interface. It has properties such as id, coreNode, and several protected properties like \_children, \_src, \_parent, \_texture, and \_shader. It has a constructor that initializes these properties and sets up event listeners for various events. It provides getter and setter methods for manipulating these properties. It also provides methods for handling various events related to the node.

```typescript
export class MainOnlyNode extends EventEmitter implements INode {
  readonly id;
  protected coreNode: CoreNode;

  // Prop stores
  protected _children: MainOnlyNode[] = [];
  protected _src = '';
  protected _parent: MainOnlyNode | null = null;
  protected _texture: TextureRef | null = null;
  protected _shader: ShaderRef | null = null;
  protected _data: CustomDataMap | undefined = {};

  constructor(
    props: INodeWritableProps,
    private rendererMain: RendererMain,
    private stage: Stage,
    coreNode?: CoreNode,
  ) {
    super();
    this.id = coreNode?.id ?? getNewId();
    this.coreNode =
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="64">

---

## Constructor

The constructor of the MainOnlyNode class initializes the properties of the class and sets up event listeners for various events such as 'loaded', 'failed', 'freed', 'outOfBounds', 'inBounds', 'outOfViewport', and 'inViewport'.

```typescript
  constructor(
    props: INodeWritableProps,
    private rendererMain: RendererMain,
    private stage: Stage,
    coreNode?: CoreNode,
  ) {
    super();
    this.id = coreNode?.id ?? getNewId();
    this.coreNode =
      coreNode ||
      new CoreNode(this.stage, {
        id: this.id,
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height,
        alpha: props.alpha,
        autosize: props.autosize,
        clipping: props.clipping,
        color: props.color,
        colorTop: props.colorTop,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="129">

---

## Getter and Setter Methods

The MainOnlyNode class provides getter and setter methods for properties like x, y, width, height, alpha, autosize, clipping, color, colorTop, colorBottom, colorLeft, colorRight, colorTl, colorTr, colorBl, colorBr, scale, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, parent, children, zIndex, zIndexLocked, src, texture, rtt, parentHasRenderTexture, shader, and data. These methods are used to manipulate the properties of the node.

```typescript
  get x(): number {
    return this.coreNode.x;
  }

  set x(value: number) {
    this.coreNode.x = value;
  }

  get y(): number {
    return this.coreNode.y;
  }

  set y(value: number) {
    this.coreNode.y = value;
  }

  get width(): number {
    return this.coreNode.width;
  }

  set width(value: number) {
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="520">

---

## Destroy Method

The MainOnlyNode class has a destroy method that is used to clean up the node and its children when they are no longer needed. This method emits 'beforeDestroy' and 'afterDestroy' events, destroys the coreNode, sets the parent and texture to null, and removes all event listeners.

```typescript
  destroy(): void {
    this.emit('beforeDestroy', {});

    //use while loop since setting parent to null removes it from array
    let child = this.children[0];
    while (child) {
      child.destroy();
      child = this.children[0];
    }
    this.coreNode.destroy();
    this.parent = null;
    this.texture = null;
    this.emit('afterDestroy', {});
    this.removeAllListeners();
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="540">

---

## Animate Method

The MainOnlyNode class has an animate method that creates a new CoreAnimation and CoreAnimationController for the node.

```typescript
  animate(
    props: Partial<INodeAnimatableProps>,
    settings: Partial<AnimationSettings>,
  ): IAnimationController {
    const animation = new CoreAnimation(this.coreNode, props, settings);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const controller = new CoreAnimationController(
      this.stage.animationManager,
      animation,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return controller;
  }
}
```

---

</SwmSnippet>

# MainOnlyNode Class

The MainOnlyNode class and its methods

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="64">

---

## MainOnlyNode Constructor

The constructor of the MainOnlyNode class initializes the properties of the class and sets up event listeners for various events.

```typescript
  constructor(
    props: INodeWritableProps,
    private rendererMain: RendererMain,
    private stage: Stage,
    coreNode?: CoreNode,
  ) {
    super();
    this.id = coreNode?.id ?? getNewId();
    this.coreNode =
      coreNode ||
      new CoreNode(this.stage, {
        id: this.id,
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height,
        alpha: props.alpha,
        autosize: props.autosize,
        clipping: props.clipping,
        color: props.color,
        colorTop: props.colorTop,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="129">

---

## Getter and Setter Methods

The MainOnlyNode class has several getter and setter methods for properties like x, y, width, height, alpha, autosize, clipping, color, colorTop, colorBottom, colorLeft, colorRight, colorTl, colorTr, colorBl, colorBr, scale, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, parent, children, zIndex, zIndexLocked, src, texture, rtt, parentHasRenderTexture, shader, and data. These methods are used to manipulate the properties of the node.

```typescript
  get x(): number {
    return this.coreNode.x;
  }

  set x(value: number) {
    this.coreNode.x = value;
  }

  get y(): number {
    return this.coreNode.y;
  }

  set y(value: number) {
    this.coreNode.y = value;
  }

  get width(): number {
    return this.coreNode.width;
  }

  set width(value: number) {
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="520">

---

## Destroy Method

The destroy method of the MainOnlyNode class is used to clean up the node and its children when they are no longer needed. This method emits 'beforeDestroy' and 'afterDestroy' events, destroys the coreNode, sets the parent and texture to null, and removes all event listeners.

```typescript
  destroy(): void {
    this.emit('beforeDestroy', {});

    //use while loop since setting parent to null removes it from array
    let child = this.children[0];
    while (child) {
      child.destroy();
      child = this.children[0];
    }
    this.coreNode.destroy();
    this.parent = null;
    this.texture = null;
    this.emit('afterDestroy', {});
    this.removeAllListeners();
  }
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
