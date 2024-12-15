import { MyWixClient } from "@/Contexts/wixContext";
import { members } from "@wix/members";
import { create } from "zustand";

type userState =  {
    user: members.Member & members.MemberNonNullableFields;
    isUserLoading: boolean;
    getUser: (wixClient: MyWixClient) => Promise<void>,
    foreignPassowrd: (wixClient: MyWixClient, email: string, redrectURI: string) => Promise<void>,
    updateUser: (wixClient: MyWixClient, user: members.UpdateMember) => Promise<void>,
    deleteUser: (wixClient: MyWixClient) => Promise<void>,
}

export const UseUser = create<userState>((set) => ({
    user: {
        status: members.Status.PENDING || members.Status.APPROVED || members.Status.BLOCKED || members.Status.OFFLINE || members.Status.UNKNOWN,
        privacyStatus: members.PrivacyStatusStatus.PUBLIC || members.PrivacyStatusStatus.PRIVATE || members.PrivacyStatusStatus.UNKNOWN,
        activityStatus: members.ActivityStatusStatus.ACTIVE || members.ActivityStatusStatus.MUTED || members.ActivityStatusStatus.UNKNOWN
    },
    isUserLoading: false,
    getUser: async (wixClient) => {
        set((prev) => ({ ...prev, isUserLoading: true }));
        try {
            const response = wixClient.auth.loggedIn()
            ? await wixClient.members.getCurrentMember()
            : {};

            set({
                user: response?.member,
                isUserLoading: false
            })

        } catch (error) {
            set((prev) => ({ ...prev, isUserLoading: false }));
            throw error;
        } finally {
            set((prev) => ({ ...prev, isUserLoading: false }));
        }
    },
    foreignPassowrd: async (wixClient, email, redrectURI) => {
        set((prev) => ({ ...prev, isUserLoading: true }));
        try {
            await wixClient.auth.sendPasswordResetEmail(email, redrectURI);
            set((prev) => ({ ...prev, isUserLoading: false }));
        } catch (error) {
            set((prev) => ({ ...prev, isUserLoading: false }));
            throw error;
        } finally {
            set((prev) => ({ ...prev, isUserLoading: false }));
        }
    },
    updateUser: async (wixClient, user) => {
        set((prev) => ({ ...prev, isUserLoading: true }));
        try {
            await wixClient.members.updateMember(user._id!, user);
            set((prev) => ({ ...prev, isUserLoading: false }));
        } catch (error) {
            set((prev) => ({ ...prev, isUserLoading: false }));
            throw error;
        } finally {
            set((prev) => ({ ...prev, isUserLoading: false }));
        }
    },
    deleteUser: async (wixClient) => {
        set((prev) => ({ ...prev, isUserLoading: true }));
        try {
            await wixClient.members.deleteMyMember();
            set((prev) => ({ ...prev, isUserLoading: false }));
        } catch (error) {
            set((prev) => ({ ...prev, isUserLoading: false }));
            throw error;
        } finally {
            set((prev) => ({ ...prev, isUserLoading: false }));
        }
    }
})) 