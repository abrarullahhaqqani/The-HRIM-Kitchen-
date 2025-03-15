import React, { useState } from "react";
import { statuses } from "../utils/styles"; // Ensure this file exists & exports 'statuses'
import Spinner from "../components/Spinner";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/actions/AlertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";

const DbNewItem = () => {
  const [itemName, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //eslint-disable-next-line
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  //eslint-disable-next-line
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error.message}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded Successfully"));

          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);

      dispatch(alertSuccess("Image removed from the cloud"));

      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        {/* Item Name Input */}
        <InputValueField
          type="text"
          placeholder="Item name here"
          stateFunction={setItem}
          stateValue={itemName}
        />

        {/* Category Selection */}
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses.map((data) => (
            <p
              key={data.id}
              onClick={() => setCategory(data.id)}
              className={`px-4 py-3 rounded-md text-xl font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md 
                ${
                  data.id === category
                    ? "bg-red-400 text-white"
                    : "bg-transparent text-textColor"
                }`}
            >
              {data.title}
            </p>
          ))}
        </div>

        {/* Price Input */}
        <InputValueField
          type="number"
          placeholder="Item Price here"
          stateFunction={setPrice}
          stateValue={price}
        />

        {/* Image Upload Section */}
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />

              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <> {`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-4xl">
                      <FaCloudUploadAlt className="-rotate-0" />
                    </p>
                    <p className="text-lg text-textColor">
                      Click to upload an Image
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={imageDownloadURL}
                    alt="Uploaded"
                    className="h-full object-contain"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white text-xl cursor-pointer"
                    onClick={deleteImageFromFirebase}
                  >
                    <MdDelete />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        ></motion.button>
      </div>
    </div>
  );
};

// Reusable Input Component
export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunction,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
      value={stateValue}
      onChange={(e) => stateFunction(e.target.value)}
    />
  );
};

export default DbNewItem;
