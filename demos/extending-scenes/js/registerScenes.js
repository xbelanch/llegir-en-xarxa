//
// registerScenes.js
// 
const registerScenes = (game) => {
  const scene = game.scene;
  scene.add(SceneKeys.Bootstrap, Bootstrap);
  scene.add(SceneKeys.Preload, Preload);
  scene.add(SceneKeys.Phone, Phone);
  scene.add(SceneKeys.PhoneUI, PhoneUI);
  scene.add(SceneKeys.HomeScreen, HomeScreen);
  scene.add(SceneKeys.WiFi, WiFi);
  scene.add(SceneKeys.Clock, Clock);
  scene.add(SceneKeys.Podcast, Podcast);
}
