class MailHeadingObject extends Phaser.GameObjects.Text
{
    constructor(scene, config, mail, x, y, text_style) {
        const text_content = config['lang']['sender']
            + mail['content']['sender'] + '\n'
            + config['lang']['subject']
            + mail['content']['subject'];

        super(scene, x, y, text_content, text_style);

        this.checked = scene.game.getState('complete', mail['id']) !== undefined;

        if (!this.checked) {
            this.setColor('#ff0000');
        }
        this.setClickable(config, mail);
        scene.add.existing(this);
    }

    setClickable(config, mail) {
        this.setInteractive();

        this.on('pointerover', function(event){
            this.setAlpha(0.7);
        });

        this.on('pointerout', function(event){
            this.setAlpha(1.0);
        });

        this.on('pointerdown', function(event) {
            this.scene.sound.play('click');
            this.scene.game.saveState('complete', mail['id'], true);
            this.setColor('#ffffff');

            new MailObject(this.scene, config, mail);
        });
    }
}
