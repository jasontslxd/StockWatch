type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'

const getSpacerSize = (size?: Size) => {
  switch (size) {
    case 'xxs':
      return '8px'
    case 'xs':
      return '16px'
    case 'sm':
      return '24px'
    case 'md':
      return '32px'
    case 'lg':
      return '40px'
    case 'xlg':
      return '48px'
    case 'xxlg':
      return '56px'
    default:
      return '16px'
  }
}

export const Spacer = ({ size = 'md' }: { size?: Size }) => {
  return <div style={{ height: getSpacerSize(size) }} />
}