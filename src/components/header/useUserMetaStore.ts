// store/useUserMetaStore.ts
import { create } from 'zustand';

interface SocialLink {
  platform: string;
  link: string;
}

interface UserMetaState {
  profileImage: string;
  title: string;
  paragraph: string;
  socialLinks: SocialLink[];

  setProfileImage: (url: string) => void;
  setTitle: (title: string) => void;
  setParagraph: (text: string) => void;
  setSocialLinks: (links: SocialLink[]) => void;
}

export const useUserMetaStore = create<UserMetaState>((set) => ({
  profileImage: "/images/user/owner.jpg",
  title: "Admin Panel Heading",
  paragraph: "Frontend paragraph display text.",
  socialLinks: [],

  setProfileImage: (url) => set({ profileImage: url }),
  setTitle: (title) => set({ title }),
  setParagraph: (text) => set({ paragraph: text }),
  setSocialLinks: (links) => set({ socialLinks: links }),
}));

