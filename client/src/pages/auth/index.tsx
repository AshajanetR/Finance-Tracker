import {
  SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
export const Auth = () => {
  return (
    <div className="sign-in-container">
        <SignedOut>
             <SignInButton mode="modal"/>
             <SignUpButton mode="modal"/>
        </SignedOut>
        <SignedIn>
          <Navigate to ="/" />
        </SignedIn>
    </div>
  )
}
