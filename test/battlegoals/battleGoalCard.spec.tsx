import * as React from "react";
import BattleGoalCard from "battlegoals/battleGoalCard";
import { shallow } from 'enzyme'

describe('battle goal card', () => {
  it('should be hidden by default to make it harder to read another players battle goal by accident', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    expect(component.find('span').prop('style')).toHaveProperty('opacity', 0);
  });

  it('should be revealed on mouse over', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    component.simulate("mouseover");
    expect(component.find('span').prop('style')).toHaveProperty('opacity', 1);
    expect(component.find('span').text()).toEqual("4");
  });

  it('should be hidden again if mouse exits', () => {
    const component = shallow(<BattleGoalCard battleGoalId={4}/>);
    component.simulate("mouseover");
    component.simulate("mouseout");
    expect(component.find('span').prop('style')).toHaveProperty('opacity', 0);
  });
});