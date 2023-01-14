import { ItemProps } from 'cards/CardRenderProps'
import * as React from 'react'

export const ItemCard = (props: ItemProps) => {
  const style = {
    display: 'inline-block',
    borderRadius: '20px',
  } as React.CSSProperties

  const src = `https://github.com/any2cards/worldhaven/raw/master/images/${props.path}`
  return <img key={props.id} style={style} src={src} alt={props.name} />
}
