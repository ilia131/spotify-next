export interface UserSubscription {
    id: string;
    plan_name: string;
    plan_price: number | string;
    status: "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
    started_at: string | null;
    expires_at: string | null;
    is_active_subscription: boolean;
    created_at: string;
  }
  
  export interface ArtistSubscription {
    id: string;
    artist_id: string;
    artist_name: string;
    plan_name: string;
    plan_price: number | string;
    status: "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
    started_at: string | null;
    expires_at: string | null;
    is_active_subscription: boolean;
    created_at: string;
  }
  
  export interface UserWallet {
    id: string;
    balance: number | string;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserProfile {
    id: number | string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_pic: string | null;
    image_url: string | null;
    is_artist: boolean;
  
    favorite_genres: number[];
    favorite_artists: string[];
  
    has_active_subscription: boolean;
  
    wallet: UserWallet | null;
  
    subscriptions: UserSubscription[];
  
    artist_subscriptions: ArtistSubscription[];
  
    created_at: string;
  }