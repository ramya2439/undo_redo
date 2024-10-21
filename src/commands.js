export const createAddObjectCommand = (scene, object) => ({
  redo: () => scene.add(object),
  undo: () => scene.remove(object),
});
