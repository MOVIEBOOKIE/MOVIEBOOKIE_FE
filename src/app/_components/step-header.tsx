type StepHeaderProps = {
  StepHeader?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function StepHeader({
  StepHeader,
  title,
  description,
}: StepHeaderProps) {
  return (
    <div className="mb-8">
      {StepHeader && (
        <p className="body-1-semibold mt-4.25 text-gray-400">{StepHeader}</p>
      )}
      <h2 className="title-3-semibold mt-1.5">{title}</h2>
      {description && (
        <p className="caption-1-medium mt-1.5 text-gray-500">{description}</p>
      )}
    </div>
  );
}
