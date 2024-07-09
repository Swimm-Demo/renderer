---
title: Exploring the Node Structure in ThreadX
---
The NodeStruct is a class that extends BufferStruct and implements the NodeStructWritableProps interface. It is used to represent a node in the renderer's scene graph, with properties such as position (x, y), dimensions (width, height), color, alpha transparency, and more. Each property has a getter and setter method, with the setter methods being handled by decorators.

NodeStructWritableProps is an interface that defines the properties that can be written to a NodeStruct. It includes properties such as x, y, width, height, alpha, autosize, clipping, color, parentId, zIndex, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, and rtt.

The NodeStruct class is used extensively throughout the renderer codebase. It is used in the creation and manipulation of nodes in the scene graph, such as in the ThreadXRendererNode, ThreadXMainNode, and SharedNode classes. It is also used in the ThreadXCoreDriver class for creating and managing nodes in the renderer.

<SwmSnippet path="/src/render-drivers/threadx/NodeStruct.ts" line="54">

---

# NodeStruct class

This is the definition of the NodeStruct class. It extends BufferStruct and implements NodeStructWritableProps. Each property of a node is represented as a getter and setter method in this class.

```typescript
export class NodeStruct
  extends BufferStruct
  implements NodeStructWritableProps
{
  static override readonly typeId = genTypeId('NODE');

  @structProp('number')
  get x(): number {
    return 0;
  }

  set x(value: number) {
    // Decorator will handle this
  }

  @structProp('number')
  get y(): number {
    return 0;
  }

  set y(value: number) {
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/NodeStruct.ts" line="22">

---

# NodeStructWritableProps interface

This is the definition of the NodeStructWritableProps interface. It defines the properties that can be written to a NodeStruct. These properties include x, y, width, height, alpha, autosize, clipping, color, parentId, zIndex, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, and rtt.

```typescript
export interface NodeStructWritableProps {
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  autosize: boolean;
  clipping: boolean;
  color: number;
  colorTop: number;
  colorBottom: number;
  colorLeft: number;
  colorRight: number;
  colorTl: number;
  colorTr: number;
  colorBr: number;
  colorBl: number;
  parentId: number;
  zIndex: number;
  zIndexLocked: number;
  scaleX: number;
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/worker/renderer.ts" line="41">

---

# Usage of NodeStruct

This is an example of how the NodeStruct class is used in the renderer. Here, a new NodeStruct is created and its properties are set using the setter methods.

```typescript
    const typeId = BufferStruct.extractTypeId(buffer);
    if (typeId === NodeStruct.typeId) {
      const nodeStruct = new NodeStruct(buffer);
      nodeStruct.parentId = nodeStruct.parentId || 0;
      const node = nodeStruct.lock(() => {
        assertTruthy(stage);
        return new ThreadXRendererNode(stage, nodeStruct);
      });
      return node;
    } else if (typeId === TextNodeStruct.typeId) {
      const nodeStruct = new TextNodeStruct(buffer);
      nodeStruct.parentId = nodeStruct.parentId || 0;
      const node = nodeStruct.lock(() => {
        assertTruthy(stage);
        return new ThreadXRendererTextNode(stage, nodeStruct);
      });
      return node;
    }
    return null;
  },
  async onMessage(message: ThreadXRendererMessage) {
```

---

</SwmSnippet>

# NodeStruct Class and Its Functions

The NodeStruct class and its properties.

<SwmSnippet path="/src/render-drivers/threadx/NodeStruct.ts" line="54">

---

## NodeStruct Class

The NodeStruct class extends BufferStruct and implements the NodeStructWritableProps interface. It represents a node in the scene graph, with properties such as position (x, y), dimensions (width, height), color, alpha transparency, and more. Each property has a getter and setter method, with the setter methods being handled by decorators.

```typescript
export class NodeStruct
  extends BufferStruct
  implements NodeStructWritableProps
{
  static override readonly typeId = genTypeId('NODE');

  @structProp('number')
  get x(): number {
    return 0;
  }

  set x(value: number) {
    // Decorator will handle this
  }

  @structProp('number')
  get y(): number {
    return 0;
  }

  set y(value: number) {
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/NodeStruct.ts" line="22">

---

## NodeStructWritableProps Interface

NodeStructWritableProps is an interface that defines the properties that can be written to a NodeStruct. It includes properties such as x, y, width, height, alpha, autosize, clipping, color, parentId, zIndex, scaleX, scaleY, mount, mountX, mountY, pivot, pivotX, pivotY, rotation, and rtt.

```typescript
export interface NodeStructWritableProps {
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  autosize: boolean;
  clipping: boolean;
  color: number;
  colorTop: number;
  colorBottom: number;
  colorLeft: number;
  colorRight: number;
  colorTl: number;
  colorTr: number;
  colorBr: number;
  colorBl: number;
  parentId: number;
  zIndex: number;
  zIndexLocked: number;
  scaleX: number;
```

---

</SwmSnippet>

## Usage of NodeStruct

The NodeStruct class is used in the creation and manipulation of nodes in the scene graph, such as in the ThreadXRendererNode class.

<SwmSnippet path="/src/render-drivers/threadx/ThreadXMainNode.ts" line="62">

---

## Usage of NodeStruct

The NodeStruct class is also used in the ThreadXMainNode class.

```typescript
    private rendererMain: RendererMain,
    sharedNodeStruct: NodeStruct,
    extendedCurProps?: Record<string, unknown>,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/SharedNode.ts" line="32">

---

## Usage of NodeStruct

The NodeStruct class is used in the SharedNode class.

```typescript
  constructor(
    sharedNodeStruct: NodeStruct,
    extendedCurProps?: Record<string, unknown>,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="70">

---

## Usage of NodeStruct

The NodeStruct class is used in the ThreadXCoreDriver class for creating and managing nodes in the renderer.

```typescript
        if (typeId === NodeStruct.typeId) {
          const nodeStruct = new NodeStruct(buffer);
          return nodeStruct.lock(() => {
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
