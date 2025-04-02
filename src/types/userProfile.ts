export interface UserProfile {
  avatar: string | File;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  city: string;
  sport?: Array<string>;
}
