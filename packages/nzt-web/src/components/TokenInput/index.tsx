import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../store/index'
import TokenState from '../../store/lib/TokenState'
import { BooleanState } from '../../store/standard/base'
import { BigNumberInputState } from '../../store/standard/BigNumberInputState'
import { TokenListModal } from '../TokenListModal/index'

interface Props {
  token: TokenState
  amount: BigNumberInputState
  onSelectToken: (token: TokenState) => void
  onChangeAmount: (value: string) => void
}

export const TokenInput = observer((props: Props) => {
  const { lang } = useStore()
  const store = useLocalObservable(() => ({
    modelOpen: new BooleanState(),
  }))
  return (
    <Box>
      <Box border="1px solid" borderRadius="md" borderColor="inherit">
        <Flex justify="space-between" p={2}>
          <Text fontSize="sm">{lang.t('token.amount')}</Text>
          <Text fontSize="sm">{props.token ? `Balance ${props.token._balance.format} ` : '...'}</Text>
        </Flex>
        <InputGroup>
          <Input
            border="none"
            placeholder="0.0"
            type="number"
            value={props.amount.format}
            onChange={(e) => props.onChangeAmount(e.target.value)}
          />
          <InputRightElement
            onClick={() => store.modelOpen.setValue(true)}
            width="4rem"
            cursor="pointer"
            flexDir="column"
          >
            <Flex alignItems="center" pr={2} w="100%">
              <Image borderRadius="full" boxSize="24px" src={props.token?.logoURI} fallbackSrc="/images/token.svg" />
              <Icon as={ChevronDownIcon} ml={1} />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>

      <TokenListModal
        isOpen={store.modelOpen.value}
        onClose={() => store.modelOpen.setValue(false)}
        onSelect={props.onSelectToken}
      />
    </Box>
  )
})
