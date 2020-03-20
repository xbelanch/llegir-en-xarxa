class MailListObject extends Phaser.GameObjects.GameObject
{
    constructor(scene, config, mails) {
        super(scene, 'mailList');
        this.print(config, mails);
        scene.add.existing(this);
    }

    print(config, mails) {
        const margin_line = 50;
        const margin_text_left = 92;
        const margin_text_top = 20;
        const initial_pos = 240;
        const box_height = 120;
        const text_style = { color: '#ffffff', fontFamily: 'Roboto', fontSize: '24px'};

        let elements = [];
        let mail = null;
        let line = null;

        for (let i=0; i<mails.length; i++) {

            mail = new MailHeadingObject(
                this.scene,
                config,
                mails[i],
                margin_text_left,
                initial_pos+(i*box_height) + margin_text_top,
                text_style
            );

            line = this.addLine(
                margin_line,
                initial_pos + (i*box_height),
                this.scene.game.config.width-margin_line,
                initial_pos + (i*box_height)
            );

            elements.push(mail);
            elements.push(line);
        }

        const container = this.scene.add.container(elements);
        this.addDragableZone(container);
    }

    addLine(x1, y1, x2, y2) {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.lineBetween(x1, y1, x2, y2);

        return graphics;
    }

    addDragableZone(container) {

    }
}
