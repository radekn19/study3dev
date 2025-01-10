import { LightningElement } from 'lwc';

export default class LifecycleHooksChild extends LightningElement {

    constructor(){
        super();
        console.log("Call from child Constructor");
    }

    connectedCallback(){
        console.log('Call received from child connectedCallback');
    }

    renderedCallback(){
        console.log('Call received from child renderedCallback');
    }

    disconnectedCallback(){
        console.log('Call received from child disconnectedCallback');
    }
}