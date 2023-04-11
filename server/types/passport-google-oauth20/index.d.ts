import { Profile } from "passport-google-oauth20";
declare module "passport-google-oauth20" {
  interface Profile {
    id: string;
    emails: { value: string; verified: "true" | "false" }[];
    photos: { value: string }[];
    provider: string;
    name: { familyName: string; givenName: string };
  }
}

export {};
