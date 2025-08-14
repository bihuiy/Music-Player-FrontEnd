import "./ImageUploadField.css"
import { uploadImage } from "../../services/cloudinary"

export default function ImageUploadField({image, setImage, imageUrl, setIsUploading, playlistImage, showPlaceholder = false}){
    const placeholderImage = 'https://res.cloudinary.com/dhdhyhahn/image/upload/v1755012671/5b3d5b19-045d-486b-822e-e8bc5fe8c16c.png'

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
        const displayImage = imageUrl || playlistImage || (showPlaceholder ? placeholderImage : null)
    return(
        <>
        {displayImage && <img className={`uploaded${image}`} src={displayImage} />}
        <label htmlFor={image}>Upload {image}</label>
        <input type="file" name={image} id={image} onChange={handleFileUpload}/>
        </>
    )
}