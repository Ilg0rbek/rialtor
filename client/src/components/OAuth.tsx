import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAppDispatch } from "../redux/hooks";
import { signinSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useAppDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const body = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      dispatch(signinSuccess(body));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className=" bg-red-700 rounded-lg text-white p-3 uppercase hover:opacity-90"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
