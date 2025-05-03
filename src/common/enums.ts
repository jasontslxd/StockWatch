export enum ViewportSize {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl'
}

export enum Page {
  Landing = '/',
  SignIn = '/signin',
  SignUp = '/signup',
  VerifyOtp = '/verify',
  Dashboard = '/dashboard',
  Portfolio = '/portfolio',
  Instrument = '/instrument/:ticker',
  NotFound = '/notfound',
  News = '/instrument/:ticker/news'
}

export enum LoginFlow {
  SignIn = 'signin',
  SignUp = 'signup'
}

export enum TickerMovementTimeRange {
  OneDay = '1d',
  FiveDays = '5d',
  ThirtyDays = '30d',
  NinetyDays = '90d',
  SixMonths = '6m',
  OneYear = '1y',
  AllTime = "All"
}