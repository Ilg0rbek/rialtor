import React from "react";

const Profile: React.FC = () => {
  const ref = React.useRef<null | any>(null);

  return (
    <div className="p-3 max-w-lg mx-auto gap-4">
      <h1 className=" text-center text-3xl font-semibold my-7"> Profile</h1>
      <form className=" flex flex-col">
        <input type="file" ref={ref} hidden accept="image/*" />
        <img
          onClick={() => ref.current.click()}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
          alt="Avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="Username"
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="Email"
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <input
          type="password"
          placeholder="Password"
          className=" border focus:outline-none p-3 rounded-lg mt-2"
        />
        <button className=" bg-slate-700 rounded-lg text-white p-3 mt-3 uppercase hover:opacity-90 disabled:opacity-80">
          Update
        </button>
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
