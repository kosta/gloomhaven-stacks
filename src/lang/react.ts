import type { CSSProperties } from 'react'

export interface NoState {}

export interface NoProps {}

export function noop() {}

export const css = (styles: CSSProperties) => styles
