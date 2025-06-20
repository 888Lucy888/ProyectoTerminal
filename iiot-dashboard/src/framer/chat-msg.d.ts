/* This file was generated by Unframer, do not edit manually */
import * as React from "react"

import { UnframerBreakpoint } from "unframer"

type Locale = string
export interface Props {
    children?: React.ReactNode
    locale?: Locale
    style?: React.CSSProperties
    className?: string
    id?: string
    width?: any
    height?: any
    layoutId?: string
    "variant"?: 'Desktop' | 'Desktop Open' | 'Tablet Open' | 'Mobile Open'
    "click"?: Function
    "click2"?: Function
    "text"?: string
}

const ChatMsgFramerComponent = (props: Props) => any

type VariantsMap = Partial<Record<UnframerBreakpoint, Props['variant']>> & { base: Props['variant'] }

ChatMsgFramerComponent.Responsive = (props: Omit<Props, 'variant'> & {variants?: VariantsMap}) => any

export default ChatMsgFramerComponent

