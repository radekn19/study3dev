import { LightningElement } from 'lwc';

export default class LifecycleHooks extends LightningElement {

    isVisible=true;

    constructor(){
        super();
        console.log('Call received from constructor');
    
    }

    connectedCallback(){
        console.log('Call received from connectedCallback');
    }

    renderedCallback(){
        console.log('Call received from renderedCallback');
    }

    disconnectedCallback(){
        console.log('Call received from disconnectedCallback');
    }

    errorCallback(){
        console.log('Call received from errorCallback');
    }

    handleClick(){
        if(this.isVisible===true){
            this.isVisible=false;
        }else{
            this.isVisible=true;
        }
    }
}