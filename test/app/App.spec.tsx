import * as React from 'react'
import { App } from 'app/App';
import { CardStack } from 'cards/cards';
import { CardStacks } from 'app/GloomHaven';
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

    it('add previously not contained card', () => {
      const app = appComponentInstance();
      app.addCards('Item Designs', [1]);
      expect(app.state.stacks.itemDesigns.list).toContain(1);
    });

    it('add the same card only once', () => {
      const app = appComponentInstance();
      app.addCards('City Events', [1, 1]);
      expect(app.state.stacks.cityEvents.stack).toEqual([1]);
    });

    it('filter out already contained card', () => {
      const app = appComponentInstance();
      app.addCards('City Events', [1]);
      app.addCards('City Events', [1, 2]);
      expect(app.state.stacks.cityEvents.stack).toContain(2);
    });

    it('do not add a already contained card', () => {
      const app = appComponentInstance();
      app.addCards('City Events', [1]);
      app.addCards('City Events', [1]);
      expect(app.state.stacks.cityEvents.stack).toEqual([1]);
    });
  });
});