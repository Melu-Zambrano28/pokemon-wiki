import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import style from '../Button/Button.module.scss'

type __ButtonProps = {
  btnType: 'primary' | 'secondary' | 'tertiary'
  ghost?: boolean
  disabled?: boolean
}

type ButtonProps = React.PropsWithChildren<
  __ButtonProps & {
    onClick: (u: unknown) => void
  } & DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
>
const Button: React.FC<ButtonProps> = ({
  btnType,
  ghost,
  disabled,
  onClick,

  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${style[`btn`]} ${style[btnType]} ${
        ghost ? style[`ghost${btnType}`] : ''
      }`}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  )
}

export { Button }
