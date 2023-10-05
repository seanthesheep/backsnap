import { getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Recents = () => {

  const [user, loading, error] = useAuthState(auth);
  const [images, setImages] = useState<any[]>([]);

  const fetchImages = async () => {
    let images: any[] = []
    await getDocs(collection(db, `users/${user?.uid}/images/`)).then(imageCollection => {
      imageCollection.forEach((doc) => {
        images.push(doc.data().image)
      })
    })
    console.log('images ', images)
    setImages(images)
  }

  useEffect(() => {
    fetchImages()
  }, [])


  return (
    <div>
      <div className="text-center">
        <p className="mt-6 mb-6 text-base leading-7 text-gray-600">Select an image to regenerate or download</p>
        <div className="grid grid-cols-4 gid-flow-col gap-2">
          {images.map(image => (
            <div key={image} className="h-auto max-w-full shadow-sm">
              <img src={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recents;
