import style from '../../Spinners/BasicSpinner/BasicSpinner.module.scss'

type BasicSpinnerProp = {
  type: 'Btn' | 'App'
}

const BasicSpinner: React.FC<BasicSpinnerProp> = ({ type }) => {
  const classNameByType = type == `Btn` ? `in${type}` : ''
  return (
    <div className={`${style[`loader`]} ${style[`${classNameByType}`]}`}></div>
  )
}

export { BasicSpinner }
