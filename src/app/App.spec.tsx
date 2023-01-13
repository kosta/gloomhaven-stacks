import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'app/App';
import { CardStacks } from 'app/GloomHaven';
import { CardStack } from 'cards/cards';
import * as React from 'react';

const emptyCardStack = (): CardStack => {
  return {
    list: [],
    stack: [],
    history: []
  };
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
        prosperity: 1
      };
    });

    const appComponentInstance = () => {
      render(<App initialCardStacks={initialCardStacks}/>);
    };

    it('add previously not contained card', async () => {
      appComponentInstance();
      await addCards('item designs', 1);
      const cardStack = await exportedStacks();
      expect(cardStack.itemDesigns.list).toContain(1)
    });

    it('add the same card only once', async () => {
      appComponentInstance();
      await addCards('City Events', 1, 1)
      const cardStack = await exportedStacks();
      expect(cardStack.cityEvents.stack).toEqual([1]);
    });

    it('filter out already contained card', async  () => {
      appComponentInstance();
      await addCards('City Events', 1)
      await addCards('City Events', 1, 2)
      const cardStack = await exportedStacks();
      expect(cardStack.cityEvents.stack.length).toBe(2);
      expect(cardStack.cityEvents.stack).toContain(1);
      expect(cardStack.cityEvents.stack).toContain(2);
    });

    it('do not add a already contained card', async () => {
      appComponentInstance();
      await addCards('City Events', 1);
      await addCards('City Events', 1);
      const cardStack = await exportedStacks();
      expect(cardStack.cityEvents.stack).toEqual([1]);
    });

  });
});

const addCards = async (cardType: string, ... cardIds: number[]) => {
  const cardRegex = new RegExp(cardType, 'i')
  const cardIdsAsString = cardIds.join(' ');
  await userEvent.click(await screen.findByRole('button', { name: 'Add Cards' }));
  const itemDesignsInput = await screen.findByRole('textbox', {
    name: cardRegex
  });
  await userEvent.type(itemDesignsInput, cardIdsAsString);
  const itemDesignsAddButton = await screen.findByRole('button', {
    name: cardRegex
  });
  await userEvent.click(itemDesignsAddButton);
};

const exportedStacks = async () => {
  await userEvent.click(await screen.findByRole('button', {
    name: /import \/ export/i
  }));
  const textElement = await screen.findByRole('textbox') as HTMLTextAreaElement;
  return JSON.parse(textElement.value) as CardStacks;
};
