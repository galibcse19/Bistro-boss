import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

//to do : add publishable key
const stripePromise =  loadStripe(import.meta.env.VITE_Payment_Gatwat_PK);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="please pat to eat"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;