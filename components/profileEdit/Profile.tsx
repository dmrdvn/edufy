import Image from "next/image";
import { useState, useEffect } from "react";
import profile_picture from "/public/images/profile-picture.png";
import { StaticImageData } from "next/image";

// onPhotoChange'in tipini belirtiyoruz
interface ProfileProps {
  onPhotoChange: (file: File) => void;
  photoCid?: string;  // IPFS'ten gelen CID
}

const Profile = ({ onPhotoChange, photoCid }: ProfileProps) => {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(profile_picture);

  useEffect(() => {
    const fetchImage = async () => {
      if (photoCid) {
        try {
          const response = await fetch(`https://gateway.pinata.cloud/ipfs/${photoCid}`);
          if (!response.ok) {
            throw new Error('Failed to fetch image from IPFS');
          }
          const blob = await response.blob(); // Response'u Blob olarak dönüştürme
          const imageUrl = URL.createObjectURL(blob); // Blob'u bir URL'ye çevirme
          setSelectedImage(imageUrl); // IPFS'ten gelen görüntüyü göster
        } catch (error) {
          console.error("Error fetching image from IPFS:", error);
        }
      }
    };

    fetchImage();
  }, [photoCid]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Yeni seçilen fotoğrafı göster
      onPhotoChange(file); // Seçilen dosyayı parent component'e gönder
    }
  };

  return (
    <div className="single-box p-3">
      <div className="upload-single">
        <div className="profile-picture text-start">
          <Image
            className="preview-image w-100"
            src={selectedImage}
            alt="Preview Image"
            width={200}
            height={200}
          />
        </div>
        <div className="file-upload">
          <label className="file text-center mt-4">
            <input type="file" onChange={handlePhotoChange} />
            <span className="cmn-btn d-center gap-1">
              <i className="material-symbols-outlined mat-icon fs-2">
                edit_note
              </i>
              Change Profile Photo
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
