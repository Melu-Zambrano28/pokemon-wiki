import style from '../../Spinners/BasicSpinner/BasicSpinner.module.scss'

type BasicSpinnerProp = {}

const BasicSpinner: React.FC<BasicSpinnerProp> = () => {
  return <div className={`${style[`loader`]}`}>Loading...</div>
}

export { BasicSpinner }
