---
title: Rendering Drivers Overview
---
Rendering Drivers in the renderer project are responsible for managing the rendering process. They are organized into two main categories: Main and ThreadX, each with its own specific implementation and purpose.

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="45">

---

The MainCoreDriver class, part of the Main category, contains a reference to the RendererMain object, which is used to manage the rendering process in the main thread.

```typescript
  private root: MainOnlyNode | null = null;
  private stage: Stage | null = null;
  private rendererMain: RendererMain | null = null;

  async init(
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="55">

---

The ThreadXCoreDriver class, part of the ThreadX category, also contains a reference to the RendererMain object, but it is used to manage the rendering process in a separate worker thread.

```typescript
  private settings: ThreadXRendererSettings;
  private threadx: ThreadX;
  private rendererMain: RendererMain | null = null;
  private root: INode | null = null;
  private fps = 0;
```

---

</SwmSnippet>

The Main and ThreadX drivers have different methods for creating nodes, which are the basic building blocks of the rendered scene. These methods are responsible for creating and initializing the nodes.

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="103">

---

In the MainCoreDriver class, the createNode method creates a new MainOnlyNode object, which represents a node in the main thread.

```typescript
  createNode(props: INodeWritableProps): INode {
    assertTruthy(this.rendererMain);
    assertTruthy(this.stage);
    const node = new MainOnlyNode(props, this.rendererMain, this.stage);
    node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="143">

---

In the ThreadXCoreDriver class, the createNode method creates a new ThreadXMainNode object, which represents a node in the worker thread.

```typescript
  createNode(props: INodeWritableProps): INode {
    const rendererMain = this.rendererMain;
    assertTruthy(rendererMain);
    const bufferStruct = new NodeStruct();
    Object.assign(bufferStruct, {
      // Node specific properties
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      parentId: props.parent ? props.parent.id : 0,
      autosize: props.autosize,
```

---

</SwmSnippet>

The drivers also have methods for creating text nodes, which are a specific type of node used to render text.

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="112">

---

In the MainCoreDriver class, the createTextNode method creates a new MainOnlyTextNode object, which represents a text node in the main thread.

```typescript
  createTextNode(props: ITextNodeWritableProps) {
    assertTruthy(this.rendererMain);
    assertTruthy(this.stage);
    const node = new MainOnlyTextNode(props, this.rendererMain, this.stage);
    node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="65">

---

In the ThreadXCoreDriver class, the createTextNode method creates a new ThreadXMainTextNode object, which represents a text node in the worker thread.

```typescript
      workerName: 'main',
      sharedObjectFactory: (buffer) => {
        const typeId = BufferStruct.extractTypeId(buffer);
        const rendererMain = this.rendererMain;
        assertTruthy(rendererMain);
        if (typeId === NodeStruct.typeId) {
          const nodeStruct = new NodeStruct(buffer);
          return nodeStruct.lock(() => {
            return new ThreadXMainNode(rendererMain, nodeStruct);
          });
        } else if (typeId === TextNodeStruct.typeId) {
          const nodeStruct = new TextNodeStruct(buffer);
          return nodeStruct.lock(() => {
            return new ThreadXMainTextNode(rendererMain, nodeStruct);
          });
        }
        return null;
      },
```

---

</SwmSnippet>

In addition to managing nodes, the drivers are also responsible for managing textures, which are used to render images.

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="126">

---

In the MainCoreDriver class, the releaseTexture method is used to remove a texture from the cache.

```typescript
  releaseTexture(id: number): void {
    const { stage } = this;
    assertTruthy(stage);
    stage.txManager.removeTextureIdFromCache(id);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="103">

---

# Main Rendering Driver

The Main Rendering Driver has a `createNode` method, which is used to create a new node. This method takes in properties for the node, creates a new `MainOnlyNode` with these properties, and then returns the created node.

```typescript
  createNode(props: INodeWritableProps): INode {
    assertTruthy(this.rendererMain);
    assertTruthy(this.stage);
    const node = new MainOnlyNode(props, this.rendererMain, this.stage);
    node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainCoreDriver.ts" line="112">

---

The Main Rendering Driver also has a `createTextNode` method, which is used to create a new text node. This method works similarly to the `createNode` method, but creates a `MainOnlyTextNode` instead.

```typescript
  createTextNode(props: ITextNodeWritableProps) {
    assertTruthy(this.rendererMain);
    assertTruthy(this.stage);
    const node = new MainOnlyTextNode(props, this.rendererMain, this.stage);
    node.once('beforeDestroy', this.onBeforeDestroyNode.bind(this, node));
    this.onCreateNode(node);
    return node;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="143">

---

# ThreadX Rendering Driver

The ThreadX Rendering Driver has a similar `createNode` method to the Main Rendering Driver. However, it creates a `ThreadXMainNode` instead of a `MainOnlyNode`.

```typescript
  createNode(props: INodeWritableProps): INode {
    const rendererMain = this.rendererMain;
    assertTruthy(rendererMain);
    const bufferStruct = new NodeStruct();
    Object.assign(bufferStruct, {
      // Node specific properties
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      parentId: props.parent ? props.parent.id : 0,
      autosize: props.autosize,
      clipping: props.clipping,
      color: props.color,
      colorTop: props.colorTop,
      colorRight: props.colorBottom,
      colorBottom: props.colorBottom,
      colorLeft: props.colorLeft,
      colorTl: props.colorTl,
      colorTr: props.colorTr,
      colorBl: props.colorBl,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="190">

---

The ThreadX Rendering Driver also has a `createTextNode` method, similar to the Main Rendering Driver. This method creates a `ThreadXMainTextNode`.

```typescript
  createTextNode(props: ITextNodeWritableProps): ITextNode {
    const rendererMain = this.rendererMain;
    assertTruthy(rendererMain);
    const bufferStruct = new TextNodeStruct();

    Object.assign(bufferStruct, {
      // Node specific properties
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      parentId: props.parent ? props.parent.id : 0,
      clipping: props.clipping,
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
