class MailApp extends Phaser.Scene {
    constructor() {
        super('mailApp');
        this.config;
    }

    preload() {
        this.load.image('close', `assets/icons/${this.registry.get('imgfolder')}/iconfinder_18_Close_106227.png`);
    }

    init() {
        let t = this;
        t.scene.bringToTop('PhoneUI');
        // Load config
        t.config = t.cache.json.get('mail');
    }

    create() {
        let t = this;
        console.log("Mail App is active");

        // Set a new background color for 'game' container
        document.getElementById('game').style.backgroundColor = t.config['style']['background-color'];
        t.add.text(92, 128, t.config['appName'], { color: '#eae17f', fontFamily: 'Roboto', fontSize: '64px'});
        this.listMails();
    }

    listMails() {
        let mails = this.config['events'];
        new MailListObject(this, this.config, mails);
    }
}
