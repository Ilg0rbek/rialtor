import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FormData } from "../utils/interfaces";
import { update } from "../redux/user/userSlice";

const Profile: React.FC = () => {
  const refs = React.useRef<null | any>(null);

  const [file, setFile] = useState<File>();
  const [imageProg, setImageProg] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({});
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const currentUser = useAppSelector((state) => state.user.data);
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    const selectFiles = files as FileList;
    setFile(selectFiles?.[0]);
  };

  const handleUploadFile = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProg(Math.round(progress));
      },
      (_error: any) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(update({ id: currentUser.user._id, data: formData }));
      setUpdateSuccess(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto gap-4">
      <h1 className=" text-center text-3xl font-semibold my-7"> Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col">
        <input
          type="file"
          onChange={uploadFile}
          ref={refs}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => refs.current.click()}
          src={formData.avatar || currentUser.user.avatar}
          alt="Avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className=" self-center text-sm">
          {fileUploadError ? (
            <span className="  text-red-700">
              Error image upload ( image must be less than 2 mb)
            </span>
          ) : imageProg > 0 && imageProg < 100 ? (
            <span className=" text-slate-700">{`Image uploading ${imageProg}%`}</span>
          ) : imageProg === 100 ? (
            <span className=" text-green-700">
              Image successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={currentUser.user.username}
          onChange={handleChange}
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          defaultValue={currentUser.user.email}
          onChange={handleChange}
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <button
          disabled={loading}
          className=" bg-slate-700 rounded-lg text-white p-3 mt-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          {!loading ? "Update" : "update...."}
        </button>
        <p className=" text-red-600">{error.message ? error : ""}</p>
        <p className=" text-green-600">
          {updateSuccess && "Updated successfully"}
        </p>
        <div className=" flex justify-between my-5 font-bold">
          <span className=" text-red-700 cursor-pointer">Delete account</span>
          <span className=" text-red-700 cursor-pointer">Sin out</span>
        </div>
        <div className=" text-green-700 text-center font-bold">Show lists</div>
      </form>
    </div>
  );
};

export default Profile;
