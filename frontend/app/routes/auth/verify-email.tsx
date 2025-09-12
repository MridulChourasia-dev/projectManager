import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Loader, XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false);
    } else {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            setIsSuccess(false);
            toast.error(errorMessage);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500">Verifying your Email...</p>

      <Card className="w-full max-w-md mt-6 p-6">
        <CardHeader>
          <Link to="/sign-in" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                <h3 className="text-lg font-semibold">Verifying email...</h3>
                <p className="text-sm text-gray-500">
                  please wait while we verify your email.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h1 className="text-lg font-semibold">Email verified</h1>
                <p className="text-sm text-gray-500">
                  You can now close this window and return to the app.
                </p>
                <Link to="/sign-in" className="text-sm text-blue-500 mt-5">
                  <Button variant="outline">Go to Sign In</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-semibold">Verification Failed</h3>
                <p className="text-sm text-gray-500">
                  Invalid or expired token. Please try again.
                </p>

                <Link to="/sign-in" className="text-sm text-blue-500 mt-5">
                  <Button variant="outline">Go to Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
