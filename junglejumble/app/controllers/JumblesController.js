import { AppState } from "../AppState.js";
import { Jumble } from "../models/Jumble.js";
import { jumbleService } from "../services/jumbleService.js";
import { getFormData } from "../utils/FormHandler.js";


export class JumblesController{
    constructor() 
    {
        console.log("Jumbles Controller loaded");
        this.drawJumbles();
        AppState.on('jumbles', this.drawJumbles);
        AppState.on('activeJumble', this.drawActiveJumble);
        jumbleService.loadJumbles();

    }

    drawJumbles() 
    {
        const jumbles = AppState.jumbles;
        let jumblesHTML = '';
        jumbles.forEach(jumble => jumblesHTML += jumble.ListTemplate);

        const jumblesElem = document.getElementById('jumbles-list');
        jumblesElem.innerHTML = jumblesHTML;
    }

    activateJumble(id)
    {
        jumbleService.setActiveJumble(id);
    }

    drawActiveJumble()
    {
        const activeJumbleElem = document.getElementById('jumble-active');

        //Check if the active Jumble is null. It will be set for null at the Service EndGame so this is needed.
        if(AppState.activeJumble != null)
        {
            activeJumbleElem.innerHTML = AppState.activeJumble.gameTemplate;
            document.getElementById('jumble-text-input').focus()
        }
        else
        {
            activeJumbleElem.innerHTML = Jumble.emptyFieldTemplate;
        }
    }

    submitJumble(event)
    {
     event.preventDefault();
     const formElement = event.target;

     console.log("submit form", formElement);
     console.log("input", formElement.jumbleGameInput);

     const jumbleText = formElement.jumbleGameInput.value;
     jumbleService.compareJumbleInput(jumbleText);
    }

    createJumble(event)
    {
        debugger;
        event.preventDefault();
        const formElement = event.target;
        // const jumbleData = getFormData(formElement);
        const jumbleData = {
            name: formElement.name.value,
            body: formElement.body.value
        }

        console.log("jumble data", jumbleData);
        
        jumbleService.createJumble(jumbleData);


        //Reset after submission
        formElement.reset();

    }

}