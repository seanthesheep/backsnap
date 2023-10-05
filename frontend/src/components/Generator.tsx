import { query, collection, where, getDocs, setDoc, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const Generator = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [base64IMG, setBase64IMG] = useState<string>();
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const saveImage = async (image: any) => {
    const timeStamp = Date.now();
    const storage = getStorage();
    const storageRef = ref(storage, `images/image-${timeStamp}.jpg`);
    const metadata = {
      contentType: 'image/jpeg',
    };
    uploadBytes(storageRef, image, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        addDoc(collection(db, `users/${user?.uid}/images/`), {
          image: url
        });
      })
    });
  }

  async function getImage(path: string) {
    try {
      let response = await fetch(`http://localhost:8080/${path}`, {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) throw response.statusText;
      console.log(response)
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
      saveImage(imageBlob);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return (
    <div>
      <div className="text-center">
        <p className="mt-6 text-base leading-7 text-gray-600">Click the button below to generate an image</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => getImage('generate-wrap')}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Generate Domain Warp
          </button>
          <button
            onClick={() => getImage('perlin-perls')}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Generate Perlin Perls
          </button>
          <button
            onClick={() => getImage('black-hole')}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Generate Black Hole
          </button>
        </div>
        {image !== "" &&
          <a href={image} download={true} className="mt-10 flex items-center justify-center text-lg font-semibold text-gray-900">
            <svg className="w-3.5 h-3.5 mr-2 inline text-lg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            Download
          </a>

        }

        <div className="flex items-center w-full justify-center">
          {image !== "" && <img src={image} className="max-w-2xl mt-5" alt="generated" />}
        </div>
      </div>
    </div>
  )
}

export default Generator;
