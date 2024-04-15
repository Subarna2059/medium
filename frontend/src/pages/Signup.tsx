import { Quote } from "../components/Quote"
import { SignupComponent } from "../components/Signup"
export const Signup = () => {
    return <>
    <div className="grid grid-cols-2">
        <div>
            <SignupComponent></SignupComponent>
        </div>
        <div className="invisible md:visible">
        <Quote></Quote>
        </div>
    </div>
    </>
}