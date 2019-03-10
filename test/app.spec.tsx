import * as React from "react"
import { App, AppState, CardStack, CardStacks } from "app";
import { shallow } from 'enzyme';

const emptyCardStack = (): CardStack => {
  return {
    list: [],
    stack: [],
    history: []
  }
};

describe('App', () => {
  describe('addCards', () => {
    let initialCardStacks: CardStacks;

    beforeEach(() => {
      initialCardStacks = {
        cityEvents: emptyCardStack(),
        roadEvents: emptyCardStack(),
        itemDesigns: emptyCardStack(),
        randomItemDesigns: emptyCardStack(),
        randomScenarios: emptyCardStack(),
        singleItems: emptyCardStack(),
        personalGoals: emptyCardStack(),
        prosperity: 1,
      };
    });

    function appComponentInstance() {
      const wrapper = shallow(<App initialCardStacks={initialCardStacks}/>);
      return wrapper.instance() as App;
    }

    it('should ', () => {
      const app = appComponentInstance();
      app.addCards('Item Designs', [1]);
      expect(app.state.stacks.itemDesigns.list).toContain(1);
    });
  });
});