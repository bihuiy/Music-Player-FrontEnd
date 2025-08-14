import "./ImageUploadField.css"
import { uploadImage } from "../../services/cloudinary"

export default function ImageUploadField({image, setImage, imageUrl, setIsUploading}){

    const handleFileUpload = async (e) =>{
        setIsUploading(true)
        try {
            const file = e.target.files[0]
            const {data} = await uploadImage(file)
            setImage(data.secure_url)
        } catch (error) {
            console.log(error)
        } finally {
            setIsUploading(false)
        }
    }

    return(
        <>
        {imageUrl && <img className={`uploaded${(image)}`} src={imageUrl} />}
        <label htmlFor={image}>Upload {image}</label>
        <input type="file" name={image} id={image} onChange={handleFileUpload}/>
        </>
    )
}