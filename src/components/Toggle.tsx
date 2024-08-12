import { ComponentProps } from 'react'
import * as Switch from '@radix-ui/react-switch'

type SwitchProps = ComponentProps<typeof Switch.Root> & {
  checked: boolean
  onCheckChange: (checked: boolean) => void
}

export const Toggle = ({ checked, onCheckChange }: SwitchProps) => {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckChange}
      aria-label="Toggle switch to sort songs"
      className="shadow-blackA4 relative bg-gray-150 h-8 w-14 cursor-pointer rounded-full bg-violet-300
      shadow-[0_0_0_2px] shadow-zinc-300 outline-none drop-shadow-sm focus:shadow-[0_0_0_2px]
      focus:shadow-violet-700 data-[state=checked]:bg-alice-blue data-[state=checked]:focus:shadow-violet-300
      transition-all duration-200"
    >
      <Switch.Thumb
        className=" block h-7 w-7 translate-y-[-6px] translate-x-[-14px] cursor-pointer rounded-full
      bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform
      data-[state=checked]:translate-x-[10px]"
      />
    </Switch.Root>
  )
}
