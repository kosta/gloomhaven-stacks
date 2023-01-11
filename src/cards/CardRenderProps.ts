
export class RandomItemDesignProps {
  readonly kind: string = 'random-item-design-props';
  readonly url: string = 'https://lh3.googleusercontent.com/u/0/d/1ubPFoTJ1_Ly-Eqn_yMvNhG0Dwq_tuw5c=s4800-k-iv1';
  readonly width: number = 409;
  readonly height: number = 636;
  readonly offset: number = 71;
  readonly cols: number = 10;
  readonly n: number = 25;
}

export class ItemProps {
  readonly kind: string = 'item-props';
  readonly id: number;
  readonly path: string;
  readonly name: string;
  
  constructor(id: number, path:string, name:string) {
    this.id = id;
    this.path = path;
    this.name = name
  }
}

export class PersonalGoalProps {
  readonly kind: string = 'persona-goal-props';
  readonly offset: number = 510;
  readonly n: number = 24;
  readonly divWidth: string = '605px';
}

export class RandomSideScenarioProps {
  readonly kind: string = 'random-side-scenario-props';
  readonly notUsedByAnyOne: boolean = false; // if you delete this, typescript becomes un-happy
}

export function isPersonalGoalProps(arg: CardRenderProps): arg is PersonalGoalProps {
  return arg.kind === 'persona-goal-props';
}

export function isRandomSideScenarioProps(arg: CardRenderProps): arg is RandomSideScenarioProps {
  return arg.kind === 'random-side-scenario-props';
}

export function isItemProps(arg: CardRenderProps): arg is ItemProps {
  return arg.kind === 'item-props';
}
export function isRandomItemDesignProps(arg: CardRenderProps): arg is RandomItemDesignProps {
  return arg.kind === 'random-item-design-props';
}

export type CardRenderProps = RandomItemDesignProps | ItemProps | PersonalGoalProps | RandomSideScenarioProps;