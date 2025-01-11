import LoginForm from "../../../../components/update/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:gap-32 gap-10 min-h-screen bg-background p-6 w-full max-w-screen-xl mx-auto">
      {/* Left Section */}
      <div className="flex flex-col items-center">
        <img
          src="/logo-senusa.png"
          alt="Senusa Logo"
          className="w-44 md:w-52 mb-4"
        />
        <h1 className="text-4xl font-nostalgic text-primary mt-4 font-semibold">
          Senusa
        </h1>
        <p className="mt-2 text-xl text-text-primary font-nostalgic">
          Software Penilaian Gen Nusantara
        </p>
      </div>
      {/* Right Section */}
      <div className="w-full md:w-1/3 max-w-md bg-foreground shadow-xl rounded-lg p-10 border border-border">
        <h2 className="text-2xl text-start font-bold text-primary mb-8">
          Login To Senusa
        </h2>
        <LoginForm />
        <div className="mt-6 border-t border-border pt-4 text-sm text-text-secondary">
          <div className="flex justify-between">
            <p>Don't have an account?</p>
            <a href="/register" className="text-primary hover:underline">
              Request an account
            </a>
          </div>
          <div className="flex justify-end mt-2">
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
