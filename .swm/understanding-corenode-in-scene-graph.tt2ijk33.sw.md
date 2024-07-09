---
title: Understanding CoreNode in Scene Graph
---
CoreNode is a fundamental class in the renderer's core rendering system. It represents a node in the scene graph, which is a hierarchical structure used to represent the spatial relationships between objects in a scene. Each CoreNode has a set of properties, such as position, size, color, and texture, which define its appearance and behavior in the scene.

The CoreNode class also includes methods for managing its state and interactions with other nodes. For example, it has methods to check if it's renderable based on its properties, update its render state, and render its associated quads. These operations are essential for the rendering process.

In addition, CoreNode has a renderState property that indicates its current rendering state. This state is represented by the CoreNodeRenderState enum, which includes states like 'Init', 'OutOfBounds', 'InBounds', and 'InViewport'. The renderState is updated based on the node's position relative to the viewport and other factors.

CoreNode also maintains a list of its child nodes. This allows the renderer to traverse the scene graph and render each node in the correct order. The parent-child relationships between nodes also enable transformations applied to a parent node to be propagated to its child nodes.

<SwmSnippet path="/src/core/CoreNode.ts" line="238">

---

# CoreNode Class

Here is the definition of the CoreNode class. It extends EventEmitter and implements ICoreNode. It has a children array and a props object of type Required<CoreNodeProps>.

```typescript
export class CoreNode extends EventEmitter implements ICoreNode {
  readonly children: CoreNode[] = [];
  protected props: Required<CoreNodeProps>;
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="59">

---

# CoreNodeRenderState Enum

This is the CoreNodeRenderState enum. It represents the possible render states of a CoreNode.

```typescript
export enum CoreNodeRenderState {
  Init = 0,
  OutOfBounds = 2,
  InBounds = 4,
  InViewport = 8,
}
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="644">

---

# CoreNode Methods

This is an example of a method in the CoreNode class. The checkRenderProps method checks if the CoreNode is renderable based on its properties.

```typescript
  checkRenderProps(): boolean {
    if (this.props.texture) {
      return true;
    }

    if (!this.props.width || !this.props.height) {
      return false;
    }

    if (this.props.shader) {
      return true;
    }

    if (this.props.clipping) {
      return true;
    }

    if (this.props.color !== 0) {
      return true;
    }

```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="240">

---

# CoreNode Properties

The props property of the CoreNode class is an object of type Required<CoreNodeProps>. It contains all the properties that define the appearance and behavior of the CoreNode.

```typescript
  protected props: Required<CoreNodeProps>;
```

---

</SwmSnippet>

# CoreNode Functions

This section discusses the main functions of the CoreNode class in the renderer's core rendering system.

<SwmSnippet path="/src/core/CoreNode.ts" line="644">

---

## checkRenderProps

The `checkRenderProps` function is used to check if the CoreNode is renderable based on its properties. It checks conditions like whether the node's width and height are greater than zero, whether the node's alpha is greater than zero, and whether the node's texture is loaded.

```typescript
  checkRenderProps(): boolean {
    if (this.props.texture) {
      return true;
    }

    if (!this.props.width || !this.props.height) {
      return false;
    }

    if (this.props.shader) {
      return true;
    }

    if (this.props.clipping) {
      return true;
    }

    if (this.props.color !== 0) {
      return true;
    }

```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="732">

---

## updateRenderState

The `updateRenderState` function is used to update the node's render state based on its position relative to the viewport and other factors. It first checks the node's render bounds and then sets the render state accordingly.

```typescript
  updateRenderState(parentClippingRect: RectWithValid) {
    const renderState = this.checkRenderBounds(parentClippingRect);
    if (renderState !== this.renderState) {
      let previous = this.renderState;
      this.renderState = renderState;
      if (previous === CoreNodeRenderState.InViewport) {
        this.emit('outOfViewport', {
          previous,
          current: renderState,
        });
      }
      if (
        previous < CoreNodeRenderState.InBounds &&
        renderState === CoreNodeRenderState.InViewport
      ) {
        this.emit(CoreNodeRenderStateMap.get(CoreNodeRenderState.InBounds)!, {
          previous,
          current: renderState,
        });
        previous = CoreNodeRenderState.InBounds;
      } else if (
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="940">

---

## renderQuads

The `renderQuads` function is used to render the quads associated with the CoreNode. It checks if the node is renderable and if it is, it adds the node's quads to the renderer's quad list for rendering.

```typescript
  renderQuads(renderer: CoreRenderer): void {
    const { width, height, texture, textureOptions, shader, shaderProps, rtt } =
      this.props;

    // Prevent quad rendering if parent has a render texture
    // and renderer is not currently rendering to a texture
    if (this.parentHasRenderTexture) {
      if (!renderer.renderToTextureActive) {
        return;
      }
      // Prevent quad rendering if parent render texture is not the active render texture
      if (this.parentRenderTexture !== renderer.activeRttNode) {
        return;
      }
    }

    const {
      premultipliedColorTl,
      premultipliedColorTr,
      premultipliedColorBl,
      premultipliedColorBr,
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
