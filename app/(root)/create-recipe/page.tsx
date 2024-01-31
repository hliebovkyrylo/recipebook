"use client"

import { 
  useRef, 
  useState 
}                           from "react";
import { 
  CameraIcon, 
  ClockIcon, 
  FileIcon, 
  LockIcon, 
  SecondMedalIcon 
}                           from "@/images";
import Image                from "next/image";
import RecipeInput          from "@/components/create-recipe/RecipeInput/RecipeInput";
import RecipeButton         from "@/components/create-recipe/RecipeButton/RecipeButton";
import RecipeTextarea       from "@/components/create-recipe/RecipeTextarea/RecipeTextarea";
import RecipeCreateButton   from "@/components/create-recipe/RecipeCreateButton/RecipeCreateButton";


const CreateRecipe = () => {
  const [elements, setElements]       = useState<JSX.Element[]>([]);
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  const handleClick = () => {
    setElements(prevElements => [...prevElements, <div className="relative">
      <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">{`Step ${prevElements.length + 2}`}</span>
      <RecipeTextarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3" />
    </div>]);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setRecipeImage(file);
    }
  }

  return (
    <>
      <h1 className="head-text">Create recipe</h1>
      <input ref={inputFileRef} onChange={handleImageChange} type="file" accept="image/*" hidden />
      <form className=" my-7">
          <div className="flex">
            <button onClick={() => inputFileRef.current?.click()} type="button" className="max-w-xl w-full h-80 bg-bg-c-2 flex items-center justify-center rounded-xl overflow-hidden">
              {recipeImage ? (
                <Image src={URL.createObjectURL(recipeImage)} className=" object-cover max-w-xl w-full h-80" alt="Camera" width={576} height={320} />
              ) : (
                <CameraIcon className="w-12 h-12" />
              )}
            </button>
            <div className="ml-12">
              <RecipeInput
                placeholder="Enter recipe name..."
                type="text"
                image={<FileIcon className="w-5 h-5" />}
              />
              <RecipeInput
                placeholder="Cooking time..."
                type="text"
                image={<ClockIcon className="w-5 h-5" />}
              />
              <div className="flex mb-3">
                <SecondMedalIcon className="w-5 h-5"/>
                <select className="bg-bg-c-2 rounded-md ml-3">
                  <option>Easy</option>
                  <option>Middle</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex mb-3">
                <LockIcon className="w-5 h-5" />
                <select className="bg-bg-c-2 rounded-md ml-3">
                  <option>Avaible for everyone</option>
                  <option>Avaible only to me</option>
                </select>
              </div>
            </div>
          </div>
          <h3 className="text-color-custom-yellow font-semibold my-5">Ingredients</h3>
          <RecipeTextarea placeholder="Enter ingredients..." className="!w-96 min-h-[64px]" />
          <h3 className="text-color-custom-yellow font-semibold my-5">Instructions</h3>
          <div className="flex overflow-x-auto">
            <div className="relative">
              <span className="absolute left-3 top-2 text-color-custom-yellow font-semibold z-50">Step 1</span>
              <RecipeTextarea placeholder="Enter text for step..." className="!pt-10 min-h-[128px] mr-3" />
            </div>
            {elements}
            <RecipeButton
              buttonClick={handleClick}
            />
          </div>
        <RecipeCreateButton />
      </form>
    </>
  )
};

export default CreateRecipe;