"use client";

const OngoingJobsView = ({}) => {

  return (
    <div className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto flex justify-center py-5">
      <div
        className="grid gap-6 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, max-content))",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </div>
    </div>
  );
};

export default OngoingJobsView;
