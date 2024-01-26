import FormError from "../form-error"
import CardWrapper from "./card-wrapper"

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel={"Oops! Something went wrong!"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/login"}
    >
      <FormError message={"An error occurred. Please try again later."} />
    </CardWrapper>
  )
}
