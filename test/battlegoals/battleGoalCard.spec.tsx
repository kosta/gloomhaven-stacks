import * as React from "react";
import BattleGoalCard from "battlegoals/battleGoalCard";
import { battleGoalImages, BattleGoal } from "battlegoals/battleGoals";
import { shallow } from 'enzyme'

describe('battle goal card', () => {
  const battleGoal = new BattleGoal('Title', 1, 'Description', 42, 'no longer needed');

  it('should show background by default to make it harder to read another players battle goal by accident', () => {
    const component = shallow(<BattleGoalCard battleGoal={battleGoal}/>);
    expect(component.find('img').prop('src')).toContain(battleGoalImages.background);
  });

  it('should show foreground on mouse over', () => {
    const component = shallow(<BattleGoalCard battleGoal={battleGoal}/>);
    component.simulate("mouseover");
    expect(component.find('img').prop('src')).toContain(battleGoalImages.foreground);
  });

  it('should show background again if mouse exits', () => {
    const component = shallow(<BattleGoalCard battleGoal={battleGoal}/>);
    component.simulate("mouseover");
    component.simulate("mouseout");
    expect(component.find('img').prop('src')).toContain(battleGoalImages.background);
  });
});