export default class MailObject extends Phaser.GameObjects.GameObject
{
    constructor(scene, config, mail) {
        super(scene, 'mail');
        this.print(config, mail);
    }

    print(config, mail) {

        const heading = config['locale']['from']
            + mail['from'] + '\n'
            + config['locale']['subject']
            + mail['subject'];
        const content = mail['body'];

        var graphics = this.scene.make.graphics();
        graphics.fillStyle(0x202020);
        graphics.fillRect(
            40,
            220,
            this.scene.game.config.width-80,
            this.scene.game.config.height
        );
        graphics.setDepth(1);
        this.scene.add.existing(graphics);

        var mask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);
        var text = this.scene.add.text(
            50,
            260,
            heading + '\n\n' + content,
            {
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: '24px',
                wordWrap: { width: this.scene.game.config.width - 100 }
            }
        ).setOrigin(0).setDepth(1);
        text.setMask(mask);

        //  The rectangle they can 'drag' within
        var zone = this.scene.add.zone(
            20,
            240,
            this.scene.game.config.width,
            this.scene.game.config.height
        ).setOrigin(0).setInteractive();

        zone.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                text.y += (pointer.velocity.y / 10);
                text.y = Phaser.Math.Clamp(text.y, -400, 300);
            }
        });

        // Add close button
        var close = this.scene.add.sprite(this.scene.game.config.width - 80, 260, 'close');
        close.setInteractive().setDepth(1);

        close.on('pointerdown', function (pointer) {
            // this.scene.sound.play('click');
            this.scene.scene.restart();
        });
    }
}
