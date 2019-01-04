import { inject, bindable } from "aurelia-framework";
import { Store, connectTo } from 'aurelia-store';
import { IState } from './models/IState';
import { pluck } from 'rxjs/operators';


const SelectPageId = (state) => {
  const newState: IState = Object.assign({}, state);
  if (newState.Page == null) {
    newState.Page = {};
  }
  newState.Page.SelectedPageId = newState.Page.SelectedPageId == null ? 'SP' : newState.Page.SelectedPageId + '1';

  return newState;
}

const SelectPage = (state) => {
  const newState: IState = Object.assign({}, state);

  if (newState.Page.SelectedPage == null) {
    newState.Page.SelectedPage = {};
  }

  newState.Page.SelectedPage.PageId = newState.Page.SelectedPageId;
  newState.Page.SelectedPage.OthersData = newState.Page.SelectedPageId + '_DATA';

  return newState;
}


@connectTo({
  selector: {
    Page: (store) => store.state.pipe(pluck('Page')),
    SelectedPageId: (store) => store.state.pipe(pluck('Page', 'SelectedPageId')),
    SelectedPage: (store) => store.state.pipe(pluck('Page', 'SelectedPage')),
  },
  target: "currentState"
})

@inject(Store)
export class App {
  constructor(private store: Store<IState>) {
    this.store.registerAction('SelectPageId', SelectPageId);
    this.store.registerAction('SelectPage', SelectPage);
  }

  @bindable log: string = "Zaciname...";
  message = 'Store a ... JA!';

  currentStateChanged(stateName, newState, oldState) {
    this.log += '\r\n';
    this.log += `State:${stateName}\r\n`;
    this.log += `   NEW: [${newState == null ? 'null' : JSON.stringify(newState)}]`;
    this.log += `   OLD: [${oldState == null ? 'null' : JSON.stringify(oldState)}]`;    
  }

  OnSelecteId() {
    this.log += '\r\n--------------------------------';
    this.log += '\r\nButton: OnSelecteId';
    this.log += '\r\n--------------------------------';
    this.store.dispatch(SelectPageId);
  }

  OnSelecteData() {
    this.log += '\r\n--------------------------------';
    this.log += '\r\nButton: OnSelecteData';
    this.log += '\r\n--------------------------------';
    this.store.dispatch(SelectPage);
  }
}
