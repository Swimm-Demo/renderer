---
title: >-
  Best Practices to Manage Complex Parent-Child Relationships with
  Transformations in the CoreNode system
---
This document will cover the best practices to manage complex parent-child relationships with transformations in the Lightning 3 Renderer system. We'll cover:

1. How parent-child relationships are managed
2. How transformations are applied to these relationships
3. Examples of these practices in the codebase.

<SwmSnippet path="/src/core/CoreNode.ts" line="401">

---

# Managing Parent-Child Relationships

Here we see how parent-child relationships are managed in the `CoreNode` class. The `parent` constant is used to check if the parent node needs updating. If it does, the `setUpdateType` method is called on the parent node to flag it for updating.

```typescript
    // If we're updating this node at all, we need to inform the parent
    // (and all ancestors) that their children need updating as well
    const parent = this.props.parent;
    if (parent && !(parent.updateType & UpdateType.Children)) {
      parent.setUpdateType(UpdateType.Children);
    }
    // If node is part of RTT texture
    // Flag that we need to update
    if (this.parentHasRenderTexture) {
      this.setRTTUpdates(type);
    }
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="418">

---

# Applying Transformations

Transformations are applied to the parent-child relationships using the `updateScaleRotateTransform` method. This method applies a rotation and scale transformation to the node based on its properties.

```typescript
  updateScaleRotateTransform() {
    this.scaleRotateTransform = Matrix3d.rotate(
      this.props.rotation,
      this.scaleRotateTransform,
    ).scale(this.props.scaleX, this.props.scaleY);
```

---

</SwmSnippet>

<SwmSnippet path="/src/core/CoreNode.ts" line="1343">

---

# Changing Parent Nodes

When changing the parent of a node, the `parent` setter is used. This method first checks if the new parent is different from the old parent. If it is, it removes the node from the old parent's children, adds it to the new parent's children, and flags both the node and the new parent for updating.

```typescript
  set parent(newParent: CoreNode | null) {
    const oldParent = this.props.parent;
    if (oldParent === newParent) {
      return;
    }
    this.props.parent = newParent;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      assertTruthy(
        index !== -1,
        "CoreNode.parent: Node not found in old parent's children!",
      );
      oldParent.children.splice(index, 1);
      oldParent.setUpdateType(
        UpdateType.Children | UpdateType.ZIndexSortedChildren,
      );
    }
    if (newParent) {
      newParent.children.push(this);
      // Since this node has a new parent, to be safe, have it do a full update.
      this.setUpdateType(UpdateType.All);
```

---

</SwmSnippet>

&nbsp;

*This is an auto-generated document by Swimm AI 🌊 and has not yet been verified by a human*

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcmVuZGVyZXIlM0ElM0FTd2ltbS1EZW1v" repo-name="renderer" doc-type="follow-up"><sup>Powered by [Swimm](/)</sup></SwmMeta>
