import * as React from "react";
import BattleGoalCard from "battlegoals/battleGoalCard";
import { shallow } from 'enzyme'

describe('battle goal card', () => {
  it('should show background by default to make it harder to read another players battle goal by accident', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    expect(component.find('img').prop('src')).toContain('battlegoal-back.png');
  });

  it('should show foreground on mouse over', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    component.simulate("mouseover");
    expect(component.find('img').prop('src')).toContain('zealot.png');
  });

  it('should show background again if mouse exits', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    component.simulate("mouseover");
    component.simulate("mouseout");
    expect(component.find('img').prop('src')).toContain('battlegoal-back.png');
  });
});