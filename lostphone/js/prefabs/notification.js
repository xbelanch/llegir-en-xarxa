import { DPR, assetsDPR } from '../config.js';
import TextBox from './textbox.js';

export default class Notifications extends TextBox
{
    constructor(scene, text, key, params)
    {
        super(scene, text, params);
        this.key = key;
    }

    destroy() {
        super.destroy();
    }
}