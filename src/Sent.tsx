export default function Sent() {
  return (
    <div className="bg-dark-grey text-white max-w-[400px] mx-auto py-3 px-2 mt-4 rounded-lg">
      <div className="flex items-center gap-x-2">
        <img src="/assets/images/icon-success-check.svg" alt="success icon" />
        <p>Message sent</p>
      </div>
      <p className="text-sm">
        Thanks for completing the form, we'll be intouch soon!
      </p>
    </div>
  );
}
