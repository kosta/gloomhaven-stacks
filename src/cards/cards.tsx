import * as React from 'react';
import { CardRenderProps, isPersonalGoalProps, isRandomSideScenarioProps, ItemProps, ItemUrl } from './CardRenderProps';
import { PersonalGoalCard } from 'cards/PersonalGoalCard';

const itemUrls = function (): Array<ItemUrl> {
  const itemCounts = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const itemUrls = [{
    maxItem: 20,
    url: "https://lh3.googleusercontent.com/u/0/d/1P0bd7vtA_SVwC7Qm9dJ_YmZkQPNDLOCk=s3200-k-iv2",
  }, {
    maxItem: 40,
    url: "https://lh3.googleusercontent.com/u/0/d/1uHYherEvc9bv3Jpl2TpA2DlRPgGT8l3z=s3200-k-iv2",
  }, {
    maxItem: 60,
    url: "https://lh3.googleusercontent.com/u/0/d/172NPm8x9T8zPE2Vd672_10rZ3ieFHHOX=s3200-k-iv2",
  }, {
    maxItem: 90,
    url: "https://lh3.googleusercontent.com/u/0/d/1XAabPK_Hs8gBXXJVpaBaSsAv6_NioEyu=s3200-k-iv2",
  }, {
    maxItem: 133,
    url: "https://lh3.googleusercontent.com/u/0/d/1KW0TZOs7SDVl5frTM9y-ISR-4dZFIex4=s3200-k-iv2",
  }, {
    maxItem: 150,
    url: "https://lh3.googleusercontent.com/u/0/d/1BHfEwqmC_dax5dV4RFFP5MlfJ76eS7KZ=s3200-k-iv2",
  }];

  let acc = 0;
  let itemSheet = 0;
  return itemCounts.map((num, i) => {
    if (i >= 71 && i <= 95) {
      // there are two random items but only one of them is "red", i.e. in this picture
      num -= 1;
    }
    let numberInPicture = acc;
    if (i > itemUrls[itemSheet].maxItem) {
      itemSheet += 1;
      numberInPicture = 0;
      acc = num;
    } else {
      acc += num;
    }
    return new ItemUrl(itemUrls[itemSheet].url, numberInPicture, itemUrls[itemSheet].maxItem - (itemUrls[itemSheet - 1] && itemUrls[itemSheet - 1].maxItem || 0));
  });
}();

export interface CardStack {
  list: Array<number>,
  stack: Array<number>,
  history: Array<CardStackEvent>
}

export interface CardStackEvent {
  action: string,
  card?: number,
  cards?: Array<number>,
  event?: number,
}

export function itemToDiv(itemId: number) {
  let item = itemUrls[itemId];
  return cardToDiv(itemId, new ItemProps(item, itemId - item.numberInPicture));
}

export function cardToDiv(cardId: number, props: CardRenderProps) {
  if (isPersonalGoalProps(props)) {
    return <PersonalGoalCard cardId={cardId}/>
  } else if (isRandomSideScenarioProps(props)) {
    return null
  } else {
    let n = cardId - props.offset;
    let row = Math.floor(n / props.cols);
    let col = n % props.cols;
    let style = {
      borderRadius: '15px',
      background: "url(" + props.url + ") no-repeat scroll top -" + (row * props.height) + "px left -" + (col * props.width) + "px",
      width: (props.width - 14) + "px",
      maxWidth: (props.width - 14) + "px",
      height: (props.height - 3) + "px",
      marginLeft: "10px",
      color: "white",
      padding: "0 0 3px 14px",
      display: "inline-block",
    };
    return <div key={cardId} style={style}>{cardId}</div>;
  }
}

