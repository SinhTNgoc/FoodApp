import React, {useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categoriesData } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFuncs";

import {useStateValue} from "../context/StateProvider";
import { getItems } from "../utils/firebaseFuncs";
import { actionType } from "../context/actionType";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("null");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const [state,dispatch] = useStateValue();

  const fetchData = async () => {
    await getItems().then((data) => {
      dispatch({ type: actionType.SET_FOOD_ITEMS, foodItems: data });
    });
  };

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgress + "%");
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading...");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully!");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully!");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !category || !imageAsset || !price) {
        setFields(true);
        setMsg("Required fields can't be empty...");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          calories: calories,
          category: category,
          imageURL: imageAsset,
          price: price,
          quantity: 1,
        };
        saveItem(data);

        setTitle("");
        setImageAsset(null);
        setCalories("");
        setCategory("null");
        setPrice("");

        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully!");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="w-6 h-6 md:w-10 md:h-10 text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please give me a title!"
            className="w-full border-none outline-none rounded-sm px-2 text-base text-textColor bg-transparent placeholder:text-base  placeholder:text-gray-200"
          />
        </div>

        <div className="w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-2 border-0 outline-none text-gray-400 rounded-sm border-b border-gray-300 p-2 cursor-pointer"
          >
            <option value="other" className="" defaultValue>
              Select Category
            </option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none bg-red-500 text-red-500 capitalize w-full px-0"
                  style={{ backgroundColor: "red" }}
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full flex items-center justify-center border-2 border-gray-300 h-225 md:h-420 cursor-pointer rounded-sm">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer ">
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer ">
                      <MdCloudUpload className="w-6 h-6 md:w-10 md:h-10 text-gray-500 hover:text-gray-700" />
                      <p className="text-base text-gray-500 hover:text-gray-700">
                        Click here to upload!
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadimage"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-9 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  transition-all duration-100 ease-in-out "
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white w-4 h-4 md:w-8 md:h-8" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className=" w-6 h-6 md:w-10 md:h-10 text-gray-700 " />
            <input
              type="text"
              required
              placeholder="Calories"
              className="w-full p-2 rounded-md text-textColor placeholder:text-gray-300 border-0 outline-none bg-transparent"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className=" w-6 h-6 md:w-10 md:h-10 text-gray-700 " />
            <input
              type="text"
              required
              placeholder="Price"
              className="w-full p-2 rounded-md text-textColor placeholder:text-gray-300 border-0 outline-none bg-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex items-center">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none px-12 py-2 rounded-md text-lg bg-emerald-500 text-white cursor-pointer"
            onClick={saveDetails}
          >
            Save Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
