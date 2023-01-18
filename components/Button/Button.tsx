import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import style from '../Button/Button.module.scss'

type __ButtonProps = {
  btnType: 'primary' | 'secondary' | 'tertiary'
  ghost?: boolean
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
  onClick,

  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${style[`btn`]} ${style[btnType]} ${
        ghost ? style[`ghost${btnType}`] : ''
      }`}
    >
      {children}
    </button>
  )
}

export { Button }
