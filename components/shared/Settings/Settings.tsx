import { Checkbox, Input, Button }  from "@/ui";
import { SettingsPanel }            from "./SettingsPanel"
import { useState }                 from "react";
import Link                         from "next/link";
import { ArrowRightSquare }         from "@/icons";

export const Settings = ({ closeSettings }: { closeSettings: () => void }) => {
  const [selectedUserImage, setSelectedUserImage]             = useState<File | null>(null); 
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<File | null>(null); 
  const [checked, setChecked]                                 = useState<boolean>(false);

  const handleImageChange = (setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCheck = () => {
    setChecked(!checked);
  }

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    closeSettings();
  };

  const handleInsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };
  
  
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen settings-background z-[60]" onClick={handleOutsideClick}>
      <section className="flex flex-col justify-between w-full max-w-[600px] h-[615px] p-6 rounded-xl main-background" onClick={handleInsideClick}>
        <div>
          <SettingsPanel 
            selectedUserImage={selectedUserImage}
            selectedBackgroundImage={selectedBackgroundImage}
            handleUserImageChange={handleImageChange(setSelectedUserImage)}
            handleBackgroundImageChange={handleImageChange(setSelectedBackgroundImage)}
          />
          <label>Username</label>
          <Input type="text" placeholder="Enter your username" className="border-[1px] border-[#313131] mb-2" />
          <label>Name</label>
          <Input type="text" placeholder="Enter your name" className="border-[1px] border-[#313131] mb-2" />
          <div className="py-6 border-y-[1px] border-[#313131] my-6">
            <div className="flex justify-between">
            <span>Closed account</span>
              <Checkbox 
                isChecked={checked}
                onClick={handleCheck}
              />
            </div>
            <p className="text-xs text-[#727272] mt-4">If your account is closed, then your schedules will become available and available only for you</p>
          </div>
          <button onClick={closeSettings} className="w-full max-w-[180px] h-8 rounded-md dark:bg-bg-c-3 bg-bg-c-8">
            <Link href={'/history'} className="flex items-center justify-center text-[#727272]">
              History of views
              <ArrowRightSquare className="ml-2" />
            </Link>
          </button>
        </div>
        <div className="flex">
          <button className="mr-3" onClick={closeSettings}>Cancel</button>
          <Button text="Save" isActive={true} className="!w-32" />
        </div>
      </section>
    </div>
  )
}