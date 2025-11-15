import React, { useEffect, useState } from "react";
import { getAccessToken, getUserInfo } from "../larkAuth";
import type { User } from "../types";
import { UserRole } from "../types";

interface AuthCallbackProps {
  onLoginSuccess: (user: User) => void;
  onLoginError: (error: string) => void;
}

export const AuthCallback: React.FC<AuthCallbackProps> = ({
  onLoginSuccess,
  onLoginError,
}) => {
  const [status, setStatus] = useState<
    "processing" | "success" | "error"
  >("processing");
  const [message, setMessage] = useState("Authenticating...");

  useEffect(() => {
    let cancelled = false;

    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const code = params.get("code");
        const state = params.get("state");
        const error = params.get("error");

        if (error) {
          throw new Error(
            error === "access_denied"
              ? "User denied authorization"
              : "Authorization failed"
          );
        }

        if (!code) throw new Error("No authorization code received");

        // Verify state
        const savedState = sessionStorage.getItem("lark_oauth_state");
        if (!savedState || state !== savedState) {
          throw new Error("Invalid or missing state parameter");
        }

        // Clear state immediately to avoid replay attack
        sessionStorage.removeItem("lark_oauth_state");

        setMessage("Getting access token...");
        const tokenData = await getAccessToken(code);

        if (cancelled) return;

        setMessage("Fetching user information...");
        const userInfo = await getUserInfo(tokenData.access_token);

        if (cancelled) return;

        const user: User = {
          id: userInfo.open_id,
          name: userInfo.name,
          email: userInfo.email,
          avatar:
            userInfo.avatar_url ||
            "https://picsum.photos/seed/default/100/100",
          role: UserRole.USER,
          departmentId: userInfo.department_id || "unknown",
          teamId: userInfo.team_id || "unknown",
        };

        sessionStorage.setItem("lark_access_token", tokenData.access_token);
        if (tokenData.refresh_token)
          sessionStorage.setItem(
            "lark_refresh_token",
            tokenData.refresh_token
          );

        setStatus("success");
        setMessage("Login successful! Redirecting...");

        setTimeout(() => !cancelled && onLoginSuccess(user), 700);
      } catch (err) {
        if (cancelled) return;

        console.error("Login error:", err);
        const msg =
          err instanceof Error ? err.message : "Authentication failed";

        setStatus("error");
        setMessage(msg);
        onLoginError(msg);
      }
    };

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [onLoginSuccess, onLoginError]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
            <p className="text-gray-700">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-gray-700">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <p className="text-red-600 mb-4">{message}</p>

            <button
              onClick={() => window.location.href = "/"}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Back to Login
            </button>

            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};
