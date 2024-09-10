import { SuccessBtn} from "../components"



export default function Success(){

    return (
      <>
        <h1>Sucess!</h1>
        <p>Your post has been successful.</p>
        <SuccessBtn to="about">About Us</SuccessBtn>
      </>
    )
  }