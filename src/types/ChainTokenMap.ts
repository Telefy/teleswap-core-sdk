import { ChainId } from '../constants/chainId'
import { Token } from '../entities'

export type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token
}
