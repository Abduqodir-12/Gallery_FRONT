import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { addPhoto, getPhotos } from "../../api/photoRequests";
import { toast } from "react-toastify";
import Photo from "../../components/Photo/Photo";
import { useInfoContext } from "../../context/Context";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const { currentUser, searchTerm, modal } = useInfoContext();
  const [createPhoto, setCreatePhoto] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getImages = async () => {
      try {
        toast.loading("Please wait...");
        const res = await getPhotos();
        toast.dismiss();
        toast.success("All photos");
        setPhotos(
          res?.data?.images.filter((image) => image.author === currentUser?._id)
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load photos.");
      }
    };

    if (currentUser) {
      getImages();
    }
  }, [currentUser]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...");
      const formData = new FormData(e.target);
      const res = await addPhoto(formData);
      toast.dismiss();
      toast.success(res?.data?.message);
      setPhotos([...photos, res?.data?.newPhoto]);
      e.target.reset();
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message || "Failed to add photo.");
      console.error(error);
    }
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function startCamera() {
      const constraints = {
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
        },
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Camera error:", error);
      }
    }

    if (!createPhoto) startCamera();
  }, [createPhoto]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 500, 350);
    const imgData = canvas.toDataURL("image/png");
    setImage(imgData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      try {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], "capture.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("title", "Captured Image");

        toast.loading("Uploading...");
        const res = await addPhoto(formData);
        toast.dismiss();
        toast.success(res?.data?.message);
        setPhotos([...photos, res?.data?.newPhoto]);
      } catch (error) {
        toast.dismiss();
        toast.error("Failed to upload captured image.");
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="Home">
      <Navbar />
      <div className="container">
        <div className="add-form">
          {createPhoto ? (
            <form className="addImgForm" onSubmit={handleCreate}>
              <input type="text" name="title" className="form-control my-2" placeholder="Title..." required />
              <input type="file" name="photo" className="form-control my-2" placeholder="New photo..." required />
              <button className="btn btn-outline-primary d-block mx-auto">Save</button>
            </form>
          ) : (
            <div>
              <div className="display">
                <video ref={videoRef} autoPlay width="500px" height="350px" />
              </div>
              <button onClick={captureImage}>Capture</button>

              <form onSubmit={handleSubmit}>
                <button type="submit">Send</button>
              </form>

              <canvas ref={canvasRef} width="500px" height="350px" style={{ display: "none"}}/>
            </div>
          )}
        </div>
        <span onClick={() => setCreatePhoto(!createPhoto)} className="auth-span my-3 text-decoration-underline d-block mx-auto">
          {createPhoto ? "rasmga olish" : "galereyadan rasm qoyish"}
        </span>
        <div className="main-title">Photos</div>
      </div>
      <div className="images">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <div key={photo._id} className="photo-item">
              <Photo photo={photo} photos={photos} setPhotos={setPhotos} />
            </div>
          ))
        ) : (
          <h3>Images not found!</h3>
        )}
      </div>
      {modal && <Modal />}
    </div>
  );
};

export default Home;