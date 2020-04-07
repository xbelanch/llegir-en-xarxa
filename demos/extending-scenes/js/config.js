//
// config.js
// 

const config = {
  type: Phaser.WEBGL,
  parent: ElementKeys.ContainerId,
  // Encara que això signifiqui una ajuda
  // que mostri elements fora del canvas
  // només cal utilitzar exclusivament per
  // mostrar notificacions puntuals
  dom : { createContainer : true},
  // Color només per debug purpose
  backgroundColor: PurpleColor,
  scale : {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    width: '100%',
    height: '100%'
  }
}
