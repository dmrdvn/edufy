"use client";
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { getUserInfo, updateUser } from '../../contracts/contract-actions';
import Profile from "./Profile";
import Image from "next/image";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY!,
});

const ProfileEditMain = () => {
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null); // Fotoğraf dosyasını saklamak için
  const [photoCid, setPhotoCid] = useState<string>(""); // IPFS'ten alınan CID
  const [saving, setSaving] = useState<boolean>(false);

 

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (address) {
        try {
          const info = await getUserInfo(address);
          setUserInfo(info);
          setUsername(info?.username || "");
          setPhotoCid(info?.photo || "");  // CID'yi state'e ayarlayın
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [address]);

  const handlePhotoUpload = async (file: File) => {
    try {
      const upload = await pinata.upload.file(file);
      console.log('File uploaded to IPFS with CID:', upload.IpfsHash);
      return upload.IpfsHash; // IPFS CID
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!username) return;

    try {
      setSaving(true);

      let uploadedPhotoCid = photoCid;  // Varsayılan olarak mevcut CID kullanılır

      // Fotoğraf varsa önce IPFS'e yükle
      if (photo) {
        uploadedPhotoCid = await handlePhotoUpload(photo); // Yeni CID'yi kaydet
        if (!uploadedPhotoCid) {
          throw new Error('Photo upload failed');
        }
        setPhotoCid(uploadedPhotoCid);
      }

      // Kullanıcı adını ve IPFS CID'yi smart contract'a kaydet
      const txHash = await updateUser(username, uploadedPhotoCid, userInfo?.isVerified || false);
      
      console.log('User updated successfully! Transaction hash:', txHash);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="main-content">
      <div className="container">
        <div className="row profile-picture-area">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-8">
            <Profile onPhotoChange={setPhoto} photoCid={photoCid} /> {/* CID'yi prop olarak gönderin */}
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="head-area mb-5">
              <h6>Edit Profile</h6>
            </div>
            <form 
              className="text-center d-grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="single-box p-3 p-sm-5">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="single-input text-start">
                      <label htmlFor="name">Username</label>
                      <div className="input-area second">
                        <input
                          type="text"
                          placeholder="Type username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Diğer bilgiler */}
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="single-input text-start">
                          <p><strong>Wallet Address:</strong> {userInfo?.walletAddress}</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="single-input text-start">
                          <p><strong>Register Date:</strong> {userInfo?.registerDate ? new Date(Number(userInfo.registerDate) * 1000).toLocaleDateString() : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <p><strong>Is Verified:</strong> {userInfo?.isVerified ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <p><strong>Participated Tables:</strong> {userInfo?.partipicatedTables?.length || 0}</p>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <p><strong>Successful Games:</strong> {userInfo?.succesfulGames || 0}</p>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <p><strong>Balance:</strong> {userInfo?.balances || 0} ETH</p>
                    </div>
                  </div>

                  <div className="col-sm-12 mt-4">
                    <div className="btn-area text-end">
                      <button className="cmn-btn" type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileEditMain;