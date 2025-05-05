import { generateId } from "../utils/GenerateId.js"
/**
 * @param {{
 * id: string;
 * name: string;
 * body: string;
 * fastestTime: number;
 * startTime: date;
 * endTime: date;
 * }} data
 */ /* REVIEW: Is this params correct? */
export class Jumble {
    constructor( data) {
      this.id = generateId()
      this.name = data.name
      this.body = data.body
      // to best keep track of the fastest times you might want these properties too! They would start null cause no one has completed these yet.
      this.fastestTime =  data.fastestTime || Infinity /* REVIEW I see it used Infinity but is it a default for the highest number? */
      this.startTime = null
      this.endTime = null
    }
  
      get ListTemplate() { // a basic list template to get drawing
          return /* html */`
          <div class="d-flex justify-content-between">
                <div>
                  <button onclick="app.JumblesController.activateJumble('${this.id}')" >Start</button>
                  <b>${this.name}</b>
                </div>
                <div>
                  <b>⏲️ ${this.fastestTime == Infinity ? "N/A" : this.fastestTime.toFixed(2) + "s "}</b>
                  <b>${this.fastestWordsPerMinute.toFixed(2)} wpm</b>
                </div>
              </div>
              <hr>
          `
      }

      get gameTemplate() {
        return /*html*/`
        <div class="jumble-card">
            <h2>${this.name}</h2>
            <p>${this.body}</p>
          </div>
          <div class="jumble-type">
            <form onsubmit="app.JumblesController.submitJumble(event)">
              <div>
                <textarea class="form-control" id="jumble-text-input" name="jumbleGameInput" placeholder="Type Away"></textarea>
                <label for="jumble-text-input">Type Away</label>
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        `
      }

      /* REVIEW have to use static here right? */
      static get emptyFieldTemplate()
      {
        return /* html */`
        <div class="jumble-card">
        <h1>JUMP INTO A JUMBLE </h1>
        </div>
        `
      }

      get wordCount () {
        return this.body.split(" ").length;
      }

      get fastestWordsPerMinute() {
        return this.wordCount * 60 / this.fastestTime;
      }
  }