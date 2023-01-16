import { ItemProps } from 'cards/CardRenderProps'
import { css } from 'lang/react'
import * as React from 'react'

export const ItemCard = (props: ItemProps) => {
  const style = css({
    display: 'inline-block',
    borderRadius: '20px',
  })

  const src = `https://github.com/any2cards/worldhaven/raw/master/images/${props.path}`
  return <img key={props.id} style={style} src={src} alt={props.name} />
}
