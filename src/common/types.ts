import { User } from "firebase/auth";

export type IAuthContext = {
    user: User | null;
    onLoginSuccess: (user: User) => void;
    onLogout: () => void;
}

export type IGainerLosersResponse = {
    metadata: string,
    last_updated: string
    top_gainers: ITickerPerformance[];
    top_losers: ITickerPerformance[];
    most_actively_traded: ITickerPerformance[];
}

export type ITickerPerformance = {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
}