class ClockApp extends Phaser.Scene {
  constructor()
  {
    super('clockApp');
    this.date;
    this.clock;
    this.dayofthemonth;
    this.days = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"];
    this.months = ["Gener", "Febrer", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  }

  create()
  {
    let t = this;
    t.date = new Date();
    console.log("Clock App is active: " + t.date);

    // Set a new background color for 'game' container
    document.getElementById('game').style.backgroundColor = '#000';
    
    // Add clock to the upper center of the screen
    t.clock = this.add.text(
      100,
      100,
      `${('0' + t.date.getHours()).slice(-2)}:${('0' + t.date.getMinutes()).slice(-2)}:${('0' + t.date.getSeconds()).slice(-2)}`
    );
    t.clock.setOrigin(0);
    t.clock.setFontFamily('roboto');
    t.clock.setFontSize(128);
    t.clock.setColor('#efefef');

    // Add day and month
    t.dayofthemonth = this.add.text(
      100,
      256,
      `${t.days[t.date.getDay()]}, ${t.date.getDate()} ${t.months[t.date.getMonth()]}`
    );
    t.dayofthemonth.setOrigin(0);
    t.dayofthemonth.setFontFamily('roboto');
    t.dayofthemonth.setFontSize(64);
    t.dayofthemonth.setColor('#efefef');

    // Add shader snow
    // @ This shader will work for weather
    // Sunny / Rainy / Cloudly / Snow
    let shaderRain = `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 fragCoord;

      void mainImage(out vec4 color, vec2 coord) {
          
            float snow = 0.0;
    float gradient = (1.0-float(coord.y / resolution.x))*0.4;
    float random = fract(sin(dot(coord.xy,vec2(12.9898,78.233)))* 43758.5453);
           for(int k=0;k<6;k++){
              for(int i=0;i<12;i++){
              float cellSize = 2.0 + (float(i)*3.0);
              float downSpeed = 0.3+(sin(time*0.4+float(k+i*20))+1.0)*0.00008;
                    vec2 uv = (coord.xy / resolution.x)+vec2(0.01*sin((time+float(k*6185))*0.6+float(i))*(5.0/float(i)),downSpeed*(time+float(k*1352))*(1.0/float(i)));
                    vec2 uvStep = (ceil((uv)*cellSize-vec2(0.5,0.5))/cellSize);
                    float x = fract(sin(dot(uvStep.xy,vec2(12.9898+float(k)*12.0,78.233+float(k)*315.156)))* 43758.5453+float(k)*12.0)-0.5;
                    float y = fract(sin(dot(uvStep.xy,vec2(62.2364+float(k)*23.0,94.674+float(k)*95.0)))* 62159.8432+float(k)*12.0)-0.5;

                    float randomMagnitude1 = sin(time*2.5)*0.7/cellSize;
                    float randomMagnitude2 = cos(time*2.5)*0.7/cellSize;

                    float d = 5.0*distance((uvStep.xy + vec2(x*sin(y),y)*randomMagnitude1 + vec2(y,x)*randomMagnitude2),uv.xy);

                    float omiVal = fract(sin(dot(uvStep.xy,vec2(32.4691,94.615)))* 31572.1684);
                    if(omiVal<0.08?true:false){
                        float newd = (x+1.0)*0.4*clamp(1.9-d*(15.0+(x*6.3))*(cellSize/1.4),0.0,1.0);
                        snow += newd;
                    }
                }
            }
    
    
            color = vec4(snow)+gradient*vec4(0.4,0.8,1.0,0.0) + random*0.01;
         }

        void main(void)
        {
            mainImage(gl_FragColor, fragCoord.xy);
        }
`;

    let baseRainShader = new Phaser.Display.BaseShader("shaderRain", shaderRain);
    // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Shader.html
    let backgroundShader = this.add.shader(baseRainShader, 0, 0, 895, 1280).setOrigin(0);


    // Set foreground image
    t.add.image(0, 0, 'foreground-phone').setOrigin(0);

    // @TODO: Add navigation buttons
    t.addPhoneButtons();
  }

  // --- HOME SCREEN OBJECTS ---
  // ---------------------------

  addPhoneButtons()
  {
    let t = this;
    let s = t.sc;
    // Add Home icon
    t.btHome = new Button(t, ((t.game.config.width / 2) - 64), (t.game.config.height - 160), 'home');
    t.btHome.on('pointerdown', () => {
      t.btHome.click();
      t.scene.start('homeScreen');
      });
  }
  
  update(time, delta)
  {
    let t = this;
    t.date = new Date();
    t.clock.text = `${('0' + t.date.getHours()).slice(-2)}:${('0' + t.date.getMinutes()).slice(-2)}:${('0' + t.date.getSeconds()).slice(-2)}`;
  }
  
}
