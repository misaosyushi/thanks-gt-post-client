import { Message } from './Message'

export type NewArrivalMessage = Message & {
  to: string | undefined
}
