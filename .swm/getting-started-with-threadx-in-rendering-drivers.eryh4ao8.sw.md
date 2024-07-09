---
title: Getting Started with ThreadX in Rendering Drivers
---
ThreadX in the Rendering Drivers refers to a lightweight, high-performance real-time operating system (RTOS) designed for deeply embedded applications. It is used in the renderer to manage the execution of multiple threads, ensuring smooth and efficient operation of the rendering process.

ThreadX is implemented as a class in the ThreadXCoreDriver.ts file. It is initialized with settings that include a worker URL. The ThreadX class has several methods for managing nodes, such as creating, destroying, and initializing nodes. It also has methods for handling events such as FPS updates and frame ticks.

In the ThreadXMainNode.ts and ThreadXMainTextNode.ts files, ThreadX is used to manage the properties and behaviors of nodes and text nodes respectively. These nodes are key elements in the rendering process, representing individual components of the user interface.

The renderer.ts file in the worker directory uses ThreadX to initialize the rendering process. It sets up a shared object factory for creating nodes and handles incoming messages related to the rendering process.

<SwmSnippet path="/src/render-drivers/threadx/worker/renderer.ts" line="37">

---

# ThreadX Initialization

Here, ThreadX is initialized with a shared object factory for creating nodes and a message handler for incoming rendering messages.

```typescript
const threadx = ThreadX.init({
  workerId: 2,
  workerName: 'renderer',
  sharedObjectFactory(buffer) {
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
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/ThreadXCoreDriver.ts" line="56">

---

# ThreadX in ThreadXCoreDriver

In the ThreadXCoreDriver class, ThreadX is used to manage the root node of the rendering process.

```typescript
  private threadx: ThreadX;
  private rendererMain: RendererMain | null = null;
  private root: INode | null = null;
  private fps = 0;

  constructor(settings: ThreadXRendererSettings) {
    this.settings = settings;
    this.threadx = ThreadX.init({
      workerId: 1,
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
```

---

</SwmSnippet>

<SwmSnippet path="/src/render-drivers/threadx/worker/ThreadXRendererNode.ts" line="164">

---

# ThreadX in Node Management

In the ThreadXRendererNode class, ThreadX is used to manage properties of nodes, such as their parent nodes.

```typescript
    oldValue: this['z$__type__Props'][Key] | undefined,
  ): void {
    if (propName === 'parentId') {
      const parent = ThreadX.instance.getSharedObjectById(newValue as number);
      assertTruthy(parent instanceof ThreadXRendererNode || parent === null);
      this.parent = parent;
      return;
    } else {
      // @ts-expect-error Ignore readonly assignment errors
      this.coreNode[propName as keyof CoreNode] =
        newValue as CoreNode[keyof CoreNode];
    }
  }

  //#region Parent/Child Props
  get parent(): ThreadXRendererNode | null {
    return this._parent;
  }

  set parent(newParent: ThreadXRendererNode | null) {
    const oldParent = this._parent;
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
