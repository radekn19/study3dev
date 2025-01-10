import { LightningElement } from 'lwc';

export default class ApiParent extends LightningElement {

    setValue(){
        let inputValue = this.template.querySelector('lightning-input').value;
        this.template.querySelector('c-api-child').childProperty2=inputValue;
    }
}