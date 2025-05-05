import { AppState } from "../AppState.js";
import { Jumble } from "../models/Jumble.js";
import { loadState, saveState } from "../utils/Store.js"



class JumbleService{

    setActiveJumble(id) 
    {
        const newlyActiveJumble = AppState.jumbles.find(jumble => jumble.id == id);
        AppState.activeJumble = newlyActiveJumble;

        //Start the timer for the game
        this.startGame();
    }

    compareJumbleInput(text)
    {
        if(text == AppState.activeJumble.body)
        {
            console.log("win!🎊");
            this.endGame();
        }
        else
        {
            console.log("loss😔");
        }
    }

    startGame()
    {
        /* Staring ActiveTime */
        AppState.activeJumble.startTime = Date.now(); //NOTE is this method needed for one line?
    }

    endGame()
    {
        //End the time for calc of differences
        const finishTime = Date.now();

        const activateJumble = AppState.activeJumble;

        activateJumble.endTime = (finishTime - activateJumble.startTime) / 1000; // using 1000 to convert from ms to s
        console.log("Finished Time", activateJumble.endTime);

        if(activateJumble.endTime < activateJumble.fastestTime)
        {
            activateJumble.fastestTime = activateJumble.endTime;
            this.saveJumbles();
        }

        //Once game is complete. Close out and emit the jumbles for AppState
        AppState.activeJumble = null;  //REVIEW Wondering if I could do activateJumble = null; or can't due to it being a const.
        AppState.emit("jumbles");
    }

    loadJumbles()
    {
        /* REVIEW Didn't try LoadState but figured I would run into the same problem as saveState */
        // loadState('jumbles', [Jumble])
        const jumbleString = localStorage.getItem('jumbles');
        // If there is no data in local storage, then don't do anything
        if (jumbleString) {
          const jumbles = JSON.parse(jumbleString);
          AppState.jumbles = jumbles.map(h => new Jumble(h));
        }
    }

    saveJumbles()
    {
        /* REVIEW Is there anything critical we should need to know about saveState? Not sure what I was doing wrong with saveState */
        // saveState('jumbles', AppState.jumbles); 
        const jumbles = AppState.jumbles;
        const jumbleString = JSON.stringify(jumbles);
        localStorage.setItem('jumbles', jumbleString);
    }

    createJumble(jumbleData)
    {
     const jumble = new Jumble(jumbleData);

     AppState.jumbles.push(jumble);
     this.saveJumbles();
    }
}

export const jumbleService = new JumbleService();