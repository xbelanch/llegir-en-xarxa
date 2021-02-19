

export default class Credits extends Phaser.Scene
{
  constructor()
  {
    super({ key : 'Credits' } );
  };

  preload()
  {
  };

  create()
  {
    var text = new Phaser.GameObjects.Text(
      this,
      0,
      0,
      "Crèdits",
      { fontSize: '120px' }
    );
    this.children.add(text);

  };
};
