---
title: Understanding the Inspector Tool
---
The Inspector is a debugging and development tool used in the Main API. It allows developers to inspect the state of the renderer and the nodes that are being rendered.

The Inspector generates a Document Object Model (DOM) tree that mirrors the state of the renderer. This DOM tree is useful for visualizing and understanding the current state of the application.

The Inspector uses a map of renderer properties that are mapped to CSS properties, known as the 'stylePropertyMap'. This map can return a string or an object with a prop and value property. Once a property is found in the map, the value is set on the style of the div element.

The Inspector class contains several methods for creating and managing nodes. These include 'createNode', 'createTextNode', 'createProxy', 'destroyNode', and 'updateNodeProperty'. These methods are used to create and manipulate nodes in the DOM tree.

The Inspector also includes a simple animation handler, 'animateNode'. This method is used to animate nodes in the DOM tree.

<SwmSnippet path="/src/main-api/Inspector.ts" line="147">

---

# Inspector Class

The Inspector class is defined here. It contains several properties including root, canvas, height, width, scaleX, and scaleY. The constructor method initializes these properties and sets up listeners for changes on the canvas and window.

```typescript
export class Inspector {
  private root: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private height = 1080;
  private width = 1920;
  private scaleX = 1;
  private scaleY = 1;

  constructor(canvas: HTMLCanvasElement, settings: RendererMainSettings) {
    if (isProductionEnvironment()) return;

    if (!settings) {
      throw new Error('settings is required');
    }

    // calc dimensions based on the devicePixelRatio
    this.height = Math.ceil(
      settings.appHeight ?? 1080 / (settings.deviceLogicalPixelRatio ?? 1),
    );

    this.width = Math.ceil(
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="221">

---

# Node Creation and Management

The Inspector class contains several methods for creating and managing nodes. These include 'createNode', 'createTextNode', 'createProxy', 'destroyNode', and 'updateNodeProperty'. These methods are used to create and manipulate nodes in the DOM tree.

```typescript
  createDiv(
    node: INode | ITextNode,
    properties: INodeWritableProps | ITextNodeWritableProps,
  ): HTMLElement {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.id = node.id.toString();

    // set initial properties
    for (const key in properties) {
      this.updateNodeProperty(
        div,
        // really typescript? really?
        key as keyof (INodeWritableProps & ITextNodeWritableProps),
        (properties as INodeWritableProps & ITextNodeWritableProps)[
          key as keyof (INodeWritableProps & ITextNodeWritableProps)
        ],
      );
    }

    return div;
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="407">

---

# Animation Handler

The Inspector also includes a simple animation handler, 'animateNode'. This method is used to animate nodes in the DOM tree.

```typescript
  // simple animation handler
  animateNode(
    div: HTMLElement,
    node: INode,
    props: INodeAnimatableProps,
    settings: AnimationSettings,
  ) {
    const {
      duration = 1000,
      delay = 0,
      // easing = 'linear',
      // repeat = 0,
      // loop = false,
      // stopMethod = false,
    } = settings;

    const {
      x,
      y,
      width,
      height,
```

---

</SwmSnippet>

# Inspector Functions

The Inspector class contains several methods for creating and managing nodes.

<SwmSnippet path="/src/main-api/Inspector.ts" line="244">

---

## createNode

The `createNode` method is used to create a new node. It takes a driver and properties as parameters, creates a new node using the driver, and then creates a div element that represents the node in the DOM tree. The node and div are then linked to each other, and the node is returned as a proxy.

```typescript
  createNode(driver: ICoreDriver, properties: INodeWritableProps): INode {
    const node = driver.createNode(properties);
    const div = this.createDiv(node, properties);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (div as any).node = node;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (node as any).div = div;

    return this.createProxy(node, div);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="257">

---

## createTextNode

The `createTextNode` method is similar to `createNode`, but it is used specifically for creating text nodes. It also links the created node and div to each other, and returns the node as a proxy.

```typescript
  createTextNode(
    driver: ICoreDriver,
    properties: ITextNodeWritableProps,
  ): ITextNode {
    const node = driver.createTextNode(properties);
    const div = this.createDiv(node, properties);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (div as any).node = node;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (node as any).div = div;
    return this.createProxy(node, div) as ITextNode;
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="271">

---

## createProxy

The `createProxy` method is used to create a proxy for a node. This proxy is used to intercept and define custom behavior for operations performed on the node object.

```typescript
  createProxy(node: INode | ITextNode, div: HTMLElement): INode | ITextNode {
    return new Proxy(node, {
      set: (target, property: keyof INodeWritableProps, value) => {
        this.updateNodeProperty(div, property, value);
        return Reflect.set(target, property, value);
      },
      get: (target, property: keyof INode, receiver: any): any => {
        if (property === 'destroy') {
          this.destroyNode(target);
        }

        if (property === 'animate') {
          return (props: INodeAnimatableProps, settings: AnimationSettings) => {
            const anim = target.animate(props, settings);

            // Trap the animate start function so we can update the inspector accordingly
            return new Proxy(anim, {
              get: (target, property: keyof IAnimationController, receiver) => {
                if (property === 'start') {
                  this.animateNode(div, node, props, settings);
                }
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="304">

---

## destroyNode

The `destroyNode` method is used to remove a node from the DOM tree. It takes a node as a parameter, finds the corresponding div element in the DOM tree, and removes it.

```typescript
  destroyNode(node: INode | ITextNode) {
    const div = document.getElementById(node.id.toString());
    div?.remove();
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="309">

---

## updateNodeProperty

The `updateNodeProperty` method is used to update a property of a node. It takes a div element, a property, and a value as parameters. Depending on the property, it updates the corresponding CSS property on the div element, sets a DOM property, or sets a custom data property.

```typescript
  updateNodeProperty(
    div: HTMLElement,
    property: keyof INodeWritableProps | keyof ITextNodeWritableProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) {
    if (this.root === null || value === undefined || value === null) {
      return;
    }

    /**
     * Special case for parent property
     */
    if (property === 'parent') {
      const parentId: number = (value as INode).id;

      // only way to detect if the parent is the root node
      // if you are reading this and have a better way, please let me know
      if (parentId === 1) {
        this.root.appendChild(div);
        return;
```

---

</SwmSnippet>

<SwmSnippet path="/src/main-api/Inspector.ts" line="408">

---

## animateNode

The `animateNode` method is a simple animation handler. It takes a div element, a node, properties, and settings as parameters. It uses these parameters to animate the node in the DOM tree.

```typescript
  animateNode(
    div: HTMLElement,
    node: INode,
    props: INodeAnimatableProps,
    settings: AnimationSettings,
  ) {
    const {
      duration = 1000,
      delay = 0,
      // easing = 'linear',
      // repeat = 0,
      // loop = false,
      // stopMethod = false,
    } = settings;

    const {
      x,
      y,
      width,
      height,
      alpha = 1,
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="overview"><sup>Powered by [Swimm](/)</sup></SwmMeta>
