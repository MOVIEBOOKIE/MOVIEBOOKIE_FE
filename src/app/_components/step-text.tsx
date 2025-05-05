type StepTextProps = {
  stepText?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function StepText({
  stepText,
  title,
  description,
}: StepTextProps) {
  return (
    <div className="mb-8">
      {stepText && (
        <p className="body-1-semibold mt-9.25 text-gray-400">{stepText}</p>
      )}
      <h2 className="title-3-semibold mt-1.5">{title}</h2>
      {description && (
        <p className="caption-1-medium mt-1.5 text-gray-500">{description}</p>
      )}
    </div>
  );
}
