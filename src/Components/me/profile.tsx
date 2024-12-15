"use client";

import React, { useContext, useEffect } from "react";
import ProfileSkelton from "@/UI/profileSkelton";
import { UseUser } from "@/hooks/useUser";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { members } from "@wix/members";
import { usePathname, useRouter } from "next/navigation";

export default function Profile() {
  const wixClient = useContext<MyWixClient>(WixClientContext);

  const { user, isUserLoading, getUser, foreignPassowrd, updateUser, deleteUser } = UseUser();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser =  async () => {
      await getUser(wixClient);
    }
    fetchUser();
  }, [getUser, wixClient]);

  const handleModifyProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.currentTarget);
  
      // Safely retrieve form values
      const name = formData.get("name")?.toString().trim() ?? "";
      const country = formData.get("country")?.toString().trim() ?? null;
      const city = formData.get("city")?.toString().trim() ?? "";
      const address1 = formData.get("addres1")?.toString().trim() ?? "";
      const address2 = formData.get("addres2")?.toString().trim() ?? "";
      const postal = formData.get("postal")?.toString().trim() ?? "";
      console.log(name, country, city, address1, address2, postal);
  
      // Construct the `UpdateMember` object
      const userUpdated: members.UpdateMember = {
        _id: user._id, // Ensure `user` exists and is valid
        profile: {
          nickname: name,
        },
        contact: {
          addresses: [
            {
              addressLine: address1,
              addressLine2: address2, // Optional field
              city,
              country,
              postalCode: postal,
            },
          ],
        },
      };
  
      // Call the API to update the user profile
      await updateUser(wixClient, userUpdated);
  
      // Refresh the user data after the update
      await getUser(wixClient);
  
      // Navigate the user to their updated profile page
      replace(`/${name}/me`);
  
      // Notify the user of success
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile. Please try again.");
    }
  };  

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await foreignPassowrd(wixClient ,user.loginEmail!, "http://localhost:3000/auth");

    alert("veillez consulter votre boite email pour réinitialiser votre mot de passe");
  };                    

  const handleDeleteMyAccount = async () => {
    if (confirm("est ce que tu'a sure supprimer voter compte ?")) {
      await deleteUser(wixClient);
      alert("Account deleted successfully");
    }
    else return;
  }

  if (isUserLoading) return <ProfileSkelton />;

  return (
    <div className="content">
      <div className="w-layout-grid content-personal">
        <div className="content-info">
          <h2>Informations personnelles</h2>
          <div className="line"></div>
          <form className="content-body" onSubmit={handleModifyProfile}>
            <div className="content-body-item">
              <div className="content-body-item-value">
                <label htmlFor="name">nom compléte</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.profile?.nickname!}
                />
              </div>
            </div>
            <div className="content-body-item">
              <div className="content-body-item-value">
                <label htmlFor="email">Email <span>{user.loginEmailVerified && "(confirmer)"}</span></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.loginEmail!}
                  disabled
                />
              </div>
            </div>
            <div className="content-body-item">
              <div className="content-body-item-value">
                {user?.contact?.phones?.map((phone) => (
                  <div key={phone}>
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue={phone}
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="content-body-item">
              {user?.contact?.addresses?.map((addresse) => (
                <div key={addresse.country} className="content-body-item-value">
                  <label htmlFor="country">Pays</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    defaultValue={addresse.country!}
                  />
                </div>
              ))}
            </div>
            <div className="content-body-item">
              {user?.contact?.addresses?.map((addresse) => (
                <div key={addresse.city} className="content-body-item-value">
                  <label htmlFor="city">Ville</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    defaultValue={addresse.city!}
                  />
                </div>
              ))}
            </div>
            <div className="content-body-item">
              <div className="content-body-item-value">
                {user?.contact?.addresses?.map((address) => (
                  <div key={address._id}>
                    <div className="content-body-item-value">
                      <label htmlFor="addres1">Adresse 1</label>
                      <input
                        type="text"
                        name="addres1"
                        id="addres1"
                        defaultValue={address.addressLine!}
                      />
                    </div>
                    <div className="content-body-item-value">
                      <label htmlFor="addres2">Adresse 2</label>
                      <input
                        type="text"
                        name="addres2"
                        id="addres2"
                        defaultValue={address.addressLine2!}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-body-item">
              {user?.contact?.addresses?.map((address) => (
                <div key={address.postalCode} className="content-body-item-value">
                  <label htmlFor="postal">Code postal</label>
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    defaultValue={address.postalCode!}
                  />
                </div>
              ))}
            </div>
            <button type="submit">
              <span>Enregistrer</span>
            </button>
          </form>
        </div>
        <div className="content-security">
          <h2>Sécurité</h2>
          <div className="line"></div>
          <div className="content-security-item">
            <h3>Changer de mot de passe</h3>
            <form onSubmit={resetPassword}>
              <button type="submit">
                <span>réinitialiser mon mot de passe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="danger-zone">
        <h2>Danger</h2>
        <div className="line"></div>
        <div className="content-danger-item">
          <h3>Supprimer le compte</h3>
          <p>Supprimer votre compte est une action irréversible. Vous perdrez toutes vos données et ne pourrez pas les récupérer.</p>
          <button
            onClick={handleDeleteMyAccount}
          >
            <span>Supprimer le compte</span>
          </button>
        </div>
      </div>
    </div>
  );
}
