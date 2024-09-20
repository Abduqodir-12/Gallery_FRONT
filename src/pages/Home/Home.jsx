import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { addPhoto, getPhotos } from "../../api/photoRequests";
import { toast } from "react-toastify";
import Photo from "../../components/Photo/Photo";
import { useInfoContext } from "../../context/Context";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const { currentUser, searchTerm } = useInfoContext();

  useEffect(() => {
    const getImages = async () => {
      try {
        toast.loading("Please wait...");
        const res = await getPhotos();
        toast.dismiss();
        toast.success("All photos");
        setPhotos(res?.data?.images.filter((image) => image.author === currentUser._id));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getImages();
  }, [currentUser._id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...");
      const formDate = new FormData(e.target);
      const res = await addPhoto(formDate);
      toast.dismiss();
      toast.success(res?.data?.message);
      setPhotos([...photos, res?.data?.newPhoto]);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
      console.log(error);
    }
  };

  const filteredUsers = photos.filter(photo =>
    `${photo.title}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="Home">
      <Navbar />
      <div className="container">
        <div className="add-form">
          <form className="addImgForm" onSubmit={handleCreate}>
            <input type="text" name="title" className="form-control my-2" placeholder="Title..." required/>
            <input type="file" name="photo" className="form-control my-2" placeholder="New photo..." required/>
            <button className="btn btn-outline-primary d-block mx-auto">Save</button>
          </form>
        </div>
        <div className="main-title ">Photos</div>
      </div>
      <div className="images">
        {photos?.length > 0 ? (
          filteredUsers.map((photo) => {
            return (
              <div key={photo._id} className="photo-item">
                <Photo photo={photo} photos={photos} setPhotos={setPhotos} />
              </div>
            );
          })
        ) : (
          <h3>Images not found!</h3>
        )}
      </div>
    </div>
  );
};

export default Home;