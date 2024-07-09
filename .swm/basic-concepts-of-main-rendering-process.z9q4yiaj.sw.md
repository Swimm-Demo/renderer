---
title: Basic Concepts of Main Rendering Process
---
Main in the context of Rendering Drivers refers to the main rendering process in the application. It is primarily defined in the `MainCoreDriver` class, which is responsible for initializing and managing the rendering stage, creating nodes, and handling various events.

The `MainCoreDriver` class has a `rendererMain` property, which is an instance of `RendererMain`. This instance is used throughout the class to perform various operations such as creating nodes and handling events.

The `init` method in `MainCoreDriver` is responsible for initializing the rendering stage with the provided settings and canvas. It also sets up event listeners for fpsUpdate, frameTick, and idle events.

The `MainCoreDriver` class also has methods for creating nodes (`createNode` and `createTextNode`), releasing textures (`releaseTexture`), and getting the root node (`getRootNode`).

The `MainOnlyNode` and `MainOnlyTextNode` classes are used to create nodes in the rendering process. They extend the `EventEmitter` class and implement the `INode` and `ITextNode` interfaces respectively.

The `MainOnlyNode` class has properties for storing node data such as children, source, texture, shader, and custom data. It also has methods for getting and setting various node properties.

The `MainOnlyTextNode` class extends `MainOnlyNode` and adds additional properties and methods for handling text nodes.

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="64">

---

# MainCoreDriver Class

The `MainCoreDriver` class is the main class for the rendering process. It has a `rendererMain` property, which is an instance of `RendererMain`. This instance is used throughout the class to perform various operations such as creating nodes and handling events.

```typescript
  constructor(
    props: INodeWritableProps,
    private rendererMain: RendererMain,
    private stage: Stage,
    coreNode?: CoreNode,
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="56">

---

# MainOnlyNode Class

The `MainOnlyNode` class is used to create nodes in the rendering process. It has properties for storing node data such as children, source, texture, shader, and custom data. It also has methods for getting and setting various node properties.

```typescript
  // Prop stores
  protected _children: MainOnlyNode[] = [];
  protected _src = '';
  protected _parent: MainOnlyNode | null = null;
  protected _texture: TextureRef | null = null;
  protected _shader: ShaderRef | null = null;
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="365">

---

# Parent Method

The `parent` method in `MainOnlyNode` class is used to get the parent of a node. It returns the `_parent` property of the node.

```typescript
  get parent(): MainOnlyNode | null {
    return this._parent;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/main/MainOnlyNode.ts" line="369">

---

# Parent Setter

The `parent` setter in `MainOnlyNode` class is used to set the parent of a node. It also updates the children of the old and new parents accordingly.

```typescript
  set parent(newParent: MainOnlyNode | null) {
    const oldParent = this._parent;
    this._parent = newParent;
    this.coreNode.parent = newParent?.coreNode ?? null;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      assertTruthy(
        index !== -1,
        "MainOnlyNode.parent: Node not found in old parent's children!",
      );
      oldParent.children.splice(index, 1);
    }
    if (newParent) {
      newParent.children.push(this);
    }
  }
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
